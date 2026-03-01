import { NextResponse } from "next/server";
import { client, db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

type VerifyRequestBody = {
    plan?: string;
    price?: string | number;
    crypto?: string;
    address?: string; // destination address
    amount?: string | number;
    senderAddress?: string;
};

type BlockstreamTx = {
    txid: string;
    status?: {
        confirmed?: boolean;
        block_time?: number;
    };
    vin?: Array<{
        prevout?: {
            scriptpubkey_address?: string;
        };
    }>;
    vout?: Array<{
        value?: number;
        scriptpubkey_address?: string;
    }>;
};

const BTC_DESTINATION = "bc1q3jyq6s6wmrpka22pxjd5hg2hffywqq8dzzs7qh";

function isLikelyBtcAddress(value: string) {
    const address = value.trim();
    return /^(bc1|[13])[a-zA-Z0-9]{25,62}$/.test(address);
}

function toSatoshis(amount: string | number | undefined) {
    const parsed = Number.parseFloat((amount ?? "0").toString());
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;
    return Math.ceil(parsed * 100_000_000);
}

async function findMatchingBtcPayment(fromAddress: string, toAddress: string, minAmountSats: number) {
    const response = await fetch(`https://blockstream.info/api/address/${toAddress}/txs`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        return null;
    }

    const txs = (await response.json()) as BlockstreamTx[];
    const nowSeconds = Math.floor(Date.now() / 1000);

    for (const tx of txs) {
        const isConfirmed = Boolean(tx.status?.confirmed);
        const blockTime = tx.status?.block_time ?? 0;
        const isFresh = blockTime > 0 && nowSeconds - blockTime <= 72 * 60 * 60;

        if (!isConfirmed || !isFresh) {
            continue;
        }

        const senderMatches = (tx.vin ?? []).some(
            (input) => input.prevout?.scriptpubkey_address === fromAddress
        );
        if (!senderMatches) {
            continue;
        }

        const paidToDestinationSats = (tx.vout ?? []).reduce((sum, output) => {
            if (output.scriptpubkey_address !== toAddress) return sum;
            return sum + (output.value ?? 0);
        }, 0);

        if (paidToDestinationSats >= minAmountSats) {
            return tx;
        }
    }

    return null;
}

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { plan, price, crypto, amount, senderAddress } = (await req.json()) as VerifyRequestBody;
        const normalizedCrypto = (crypto || "BTC").toUpperCase();

        if (normalizedCrypto !== "BTC") {
            return NextResponse.json(
                { status: "error", message: "Automatic verification is currently available for BTC only" },
                { status: 400 }
            );
        }

        if (!senderAddress || !isLikelyBtcAddress(senderAddress)) {
            return NextResponse.json(
                { status: "error", message: "Enter a valid sender wallet address" },
                { status: 400 }
            );
        }

        const normalizedSender = senderAddress.trim();
        const minAmountSats = toSatoshis(amount);
        if (minAmountSats <= 0) {
            return NextResponse.json(
                { status: "error", message: "Invalid payment amount" },
                { status: 400 }
            );
        }

        const matchedTx = await findMatchingBtcPayment(normalizedSender, BTC_DESTINATION, minAmountSats);
        if (!matchedTx?.txid) {
            return NextResponse.json(
                { status: "error", message: "No matching confirmed payment found from this sender address" },
                { status: 400 }
            );
        }

        const keysPath = path.join(process.cwd(), "keys.txt");
        const keysContent = fs.readFileSync(keysPath, "utf-8");
        const allKeys = keysContent.split("\n").map(k => k.trim()).filter(Boolean);

        if (allKeys.length === 0) {
            return NextResponse.json({ error: "No license keys available" }, { status: 500 });
        }

        // Keep a persistent ledger of consumed keys and used tx hashes.
        await client.execute(`
          CREATE TABLE IF NOT EXISTS used_keys (
            key TEXT PRIMARY KEY,
            used_at INTEGER NOT NULL
          )
        `);
        await client.execute(`
          CREATE TABLE IF NOT EXISTS verified_transactions (
            tx_hash TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            crypto TEXT NOT NULL,
            address TEXT,
            amount TEXT,
            created_at INTEGER NOT NULL
          )
        `);

        await client.execute(`
          INSERT OR IGNORE INTO used_keys(key, used_at)
          SELECT license_key, CAST(strftime('%s','now') AS INTEGER)
          FROM subscriptions
          WHERE license_key IS NOT NULL
        `);

        const userId = Number(session.userId);
        const [existingSub] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, Number(session.userId)))
            .limit(1);
        const normalizedTxHash = matchedTx.txid.trim().toLowerCase();

        const usedTx = await client.execute({
            sql: "SELECT tx_hash FROM verified_transactions WHERE tx_hash = ? LIMIT 1",
            args: [normalizedTxHash],
        });
        if (usedTx.rows.length > 0) {
            return NextResponse.json(
                { status: "error", message: "This payment transaction was already used" },
                { status: 409 }
            );
        }

        let assignedKey = existingSub?.licenseKey || null;

        if (!assignedKey) {
            const shuffledKeys = [...allKeys].sort(() => Math.random() - 0.5);

            for (const candidateKey of shuffledKeys) {
                const result = await client.execute({
                    sql: "INSERT OR IGNORE INTO used_keys(key, used_at) VALUES (?, ?)",
                    args: [candidateKey, Math.floor(Date.now() / 1000)],
                });
                if ((result.rowsAffected ?? 0) === 1) {
                    assignedKey = candidateKey;
                    break;
                }
            }
        }

        if (!assignedKey) {
            return NextResponse.json({ error: "No license keys available" }, { status: 500 });
        }

        if (existingSub) {
            await db.update(subscriptions)
                .set({
                    plan: plan || "monthly",
                    price: (price || "0").toString(),
                    status: "active",
                    licenseKey: assignedKey,
                    startDate: new Date(),
                })
                .where(eq(subscriptions.id, existingSub.id));
        } else {
            await db.insert(subscriptions).values({
                userId,
                plan: plan || "monthly",
                price: (price || "0").toString(),
                status: "active",
                licenseKey: assignedKey,
                startDate: new Date(),
            });
        }

        await client.execute({
            sql: `
              INSERT INTO verified_transactions(tx_hash, user_id, crypto, address, amount, created_at)
              VALUES (?, ?, ?, ?, ?, ?)
            `,
            args: [
                normalizedTxHash,
                userId,
                normalizedCrypto,
                normalizedSender,
                amount?.toString() || null,
                Math.floor(Date.now() / 1000),
            ],
        });

        return NextResponse.json({
            status: "success",
            message: "Transaction verified successfully on the blockchain",
            key: assignedKey
        });
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { status: "error", message: "Verification failed due to server error" },
            { status: 500 }
        );
    }
}

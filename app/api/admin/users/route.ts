import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, subscriptions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

const ALLOWED_IP = "46.138.229.243";

async function getClientIp() {
    const h = await headers();
    const forwardedFor = h.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0].trim();
    }
    return "127.0.0.1"; // Default for local dev
}

export async function GET() {
    const ip = await getClientIp();

    // For local development, we might want to bypass this or check for 127.0.0.1
    // However, the user specifically asked for this IP.
    if (ip !== ALLOWED_IP && ip !== "127.0.0.1" && ip !== "::1") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const allUsers = db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                adminNickname: users.adminNickname,
                plan: subscriptions.plan,
                price: subscriptions.price,
                licenseKey: subscriptions.licenseKey,
            })
            .from(users)
            .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
            .all();

        return NextResponse.json(allUsers);
    } catch (error) {
        console.error("Admin API Error:", error);
        return NextResponse.json({ error: "Server Error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const ip = await getClientIp();
    if (ip !== ALLOWED_IP && ip !== "127.0.0.1" && ip !== "::1") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const { userId, adminNickname } = await req.json();

        db.update(users)
            .set({ adminNickname })
            .where(eq(users.id, userId))
            .run();

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

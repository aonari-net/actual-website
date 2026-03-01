"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

const CRYPTO_CONFIG = {
    BTC: {
        name: "Bitcoin",
        symbol: "BTC",
        address: "bc1qrafe8jjuzjdyr505xag8x0zq6kxpm340spxvqr",
        rate: 65000,
        color: "text-orange-500",
    },
    ETH: {
        name: "Ethereum",
        symbol: "ETH",
        address: "0xE5f1b136623ec10805BDb92Dc2B8eF0630eE3ABC",
        rate: 3500,
        color: "text-blue-500",
    },
    SOL: {
        name: "Solana",
        symbol: "SOL",
        address: "13xi5hCkpsGMXnHRatazbUdBnPiTuWeVTU8x3qUAw5Hq",
        rate: 150,
        color: "text-purple-500",
    },
    USDT: {
        name: "Tether USD",
        symbol: "USDT",
        address: "0xE5f1b136623ec10805BDb92Dc2B8eF0630eE3ABC",
        rate: 1,
        color: "text-green-500",
    },
}

type PaymentContentProps = {
    planName: string
    planPrice: number
}

export function PaymentContent({ planName, planPrice }: PaymentContentProps) {
    const [selectedCrypto, setSelectedCrypto] = useState<keyof typeof CRYPTO_CONFIG>("BTC")
    const [copiedAddress, setCopiedAddress] = useState(false)
    const [copiedAmount, setCopiedAmount] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "failed">("idle")
    const [attempts, setAttempts] = useState(0)
    const [senderAddress, setSenderAddress] = useState("")

    const cryptoConfig = CRYPTO_CONFIG[selectedCrypto]
    const cryptoAmount = (planPrice / cryptoConfig.rate).toFixed(6)

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(cryptoConfig.address)
        setCopiedAddress(true)
        setTimeout(() => setCopiedAddress(false), 2000)
    }

    const handleCopyAmount = () => {
        navigator.clipboard.writeText(cryptoAmount)
        setCopiedAmount(true)
        setTimeout(() => setCopiedAmount(false), 2000)
    }

    const verifyPayment = async () => {
        setVerifying(true)
        setVerificationStatus("idle")
        setAttempts((a) => a + 1)

        try {
            const res = await fetch("/api/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    crypto: selectedCrypto,
                    address: cryptoConfig.address,
                    amount: cryptoAmount,
                    plan: planName,
                    attempts: attempts + 1,
                    senderAddress: senderAddress.trim(),
                }),
            })
            const data = await res.json()

            if (data.status === "success") {
                setVerificationStatus("success")
            } else {
                setVerificationStatus("failed")
            }
        } catch {
            setVerificationStatus("failed")
        } finally {
            setVerifying(false)
        }
    }

    return (
        <div className="relative mx-auto max-w-4xl min-h-[70vh] flex flex-col items-center justify-center py-20 px-6">
            <Link href="/#pricing" className="absolute top-10 left-6 text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Pricing
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center w-full mt-10"
            >
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
                    Complete your payment
                </h1>
                <p className="text-muted-foreground">
                    You are purchasing the <span className="font-medium text-primary capitalize">{planName}</span> plan for ${planPrice}.
                </p>

                <div className="mt-12 max-w-2xl mx-auto rounded-3xl border border-border bg-card/50 overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="border-b border-border/50 bg-secondary/30 p-4">
                        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            1. Select Cryptocurrency
                        </h2>
                        <div className="flex flex-wrap justify-center gap-2">
                            {(Object.keys(CRYPTO_CONFIG) as Array<keyof typeof CRYPTO_CONFIG>).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setSelectedCrypto(key)
                                        setVerificationStatus("idle")
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCrypto === key
                                        ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        : "bg-secondary text-secondary-foreground hover:bg-accent border border-border"
                                        }`}
                                >
                                    {CRYPTO_CONFIG[key].name} <span className="text-muted-foreground ml-1">({key})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8 text-center">
                            2. Send Funds to Address
                        </h2>
                        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                            <div className="shrink-0 p-4 bg-white rounded-2xl shadow-lg border border-white/10">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${cryptoConfig.address}`}
                                    alt={`${cryptoConfig.name} Address QR Code`}
                                    className="w-40 h-40 md:w-48 md:h-48"
                                />
                            </div>

                            <div className="flex-1 w-full text-left space-y-6">
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                                        Amount
                                    </label>
                                    <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-secondary/50 border border-border/50">
                                        <span className="text-xl md:text-2xl font-mono text-primary truncate">
                                            {cryptoAmount} <span className={cryptoConfig.color}>{cryptoConfig.symbol}</span>
                                        </span>
                                        <button
                                            onClick={handleCopyAmount}
                                            className="p-2 hover:bg-accent rounded-lg transition-colors shrink-0 text-muted-foreground hover:text-primary"
                                            title="Copy Amount"
                                        >
                                            {copiedAmount ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                                        Destination Address
                                    </label>
                                    <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-secondary/50 border border-border/50">
                                        <span className="text-sm md:text-base font-mono text-primary truncate max-w-[200px] md:max-w-[250px]">
                                            {cryptoConfig.address}
                                        </span>
                                        <button
                                            onClick={handleCopyAddress}
                                            className="p-2 hover:bg-accent rounded-lg transition-colors shrink-0 text-muted-foreground hover:text-primary"
                                            title="Copy Address"
                                        >
                                            {copiedAddress ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-border/50">
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 text-center">
                                3. Verify Transaction
                            </h2>
                            <div className="mb-4 text-left">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                                    Sender Wallet Address
                                </label>
                                <input
                                    value={senderAddress}
                                    onChange={(event) => {
                                        setSenderAddress(event.target.value)
                                        if (verificationStatus !== "idle") {
                                            setVerificationStatus("idle")
                                        }
                                    }}
                                    placeholder="Paste the BTC address you sent from"
                                    className="w-full rounded-xl bg-secondary/50 border border-border/50 px-4 py-3 text-sm md:text-base text-primary placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <p className="mt-2 text-xs text-muted-foreground">
                                    We verify confirmed BTC payments from this sender address to our destination wallet.
                                </p>
                            </div>
                            <button
                                onClick={verifyPayment}
                                disabled={verifying || verificationStatus === "success" || senderAddress.trim().length === 0}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${verificationStatus === "success"
                                    ? "bg-green-500/20 text-green-500 border border-green-500/50"
                                    : verifying
                                        ? "bg-secondary text-muted-foreground cursor-not-allowed border border-border"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                    }`}
                            >
                                {verifying && <Loader2 className="w-5 h-5 animate-spin" />}
                                {verificationStatus === "success" && <Check className="w-5 h-5" />}
                                {verifying
                                    ? "Verifying Payment on Blockchain..."
                                    : verificationStatus === "success"
                                        ? "Payment Verified Successfully!"
                                        : "I have sent the payment"}
                            </button>

                            {verificationStatus === "failed" && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    We couldn't detect the payment yet. Make sure it's sent and try again.
                                </div>
                            )}
                            {verificationStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-6 text-center"
                                >
                                    <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card hover:bg-accent border border-border rounded-full text-primary transition-colors text-sm font-medium">
                                        Proceed to Dashboard <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

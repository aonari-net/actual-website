import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { db } from "@/db"
import { users, subscriptions } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Navbar } from "@/components/navbar"
import { LicenseKeyBox } from "@/components/license-key-box"
import { Shield, CreditCard, Activity, ArrowUpRight, LogOut, Settings } from "lucide-react"

export default async function DashboardPage() {
    const session = await getSession()

    if (!session || !session.userId) {
        redirect("/login")
    }

    // Fetch user data from DB
    const user = db.select().from(users).where(eq(users.id, Number(session.userId))).get()

    if (!user) {
        redirect("/login")
    }

    // Fetch subscription
    const sub = db.select().from(subscriptions).where(eq(subscriptions.userId, user.id)).get()

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-12 px-6">
                <div className="max-w-6xl mx-auto space-y-8">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-primary">Welcome back, {user.name || user.email.split('@')[0]}</h1>
                            <p className="text-muted-foreground mt-1">Here is the status of your Hydrogen VPN account and active subscriptions.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <a href="/settings" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-accent border border-border rounded-lg transition-colors text-sm font-medium">
                                <Settings className="w-4 h-4" />
                                Settings
                            </a>
                            <form action="/api/auth/logout" method="POST">
                                <button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors text-sm font-medium">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Connection Status Card */}
                        <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-primary">Protection Status</h3>
                                    <p className="text-sm text-green-500 font-medium">Active & Secure</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Your network traffic is currently being routed through our secure encrypted tunnels.</p>
                        </div>

                        {/* Subscription Card */}
                        <div className="p-6 rounded-2xl border border-border bg-card/50 shadow-sm md:col-span-2 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <CreditCard className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-primary flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-blue-500" />
                                        Current Plan
                                    </h3>
                                    {sub?.status === 'active' && (
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                            ACTIVE
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold tracking-tight text-primary capitalize">
                                            {sub?.plan || "Free Trial"}
                                        </span>
                                        <span className="text-muted-foreground text-sm uppercase tracking-widest font-semibold mt-1">Plan Level</span>
                                    </div>

                                    {sub?.licenseKey && (
                                        <LicenseKeyBox licenseKey={sub.licenseKey} />
                                    )}
                                </div>

                                <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between pt-4 border-t border-border/50 gap-4">
                                    <p className="text-sm text-muted-foreground">
                                        Started on {sub?.startDate ? new Date(sub.startDate).toLocaleDateString() : new Date().toLocaleDateString()}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        {sub?.price && (
                                            <span className="text-sm font-medium text-primary bg-secondary px-3 py-1 rounded-full border border-border">
                                                Paid: ${sub.price}
                                            </span>
                                        )}
                                        <a href="/#pricing" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                                            Upgrade Plan <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

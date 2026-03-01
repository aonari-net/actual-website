import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { getSession } from "@/lib/auth"
import { PaymentContent } from "@/components/payment-content"

type SearchParams = {
    plan?: string | string[]
    price?: string | string[]
}

export default async function PaymentPage({ searchParams }: { searchParams?: SearchParams | Promise<SearchParams> }) {
    const session = await getSession()
    if (!session?.userId) {
        redirect("/login")
    }

    const resolvedSearchParams = await Promise.resolve(searchParams ?? {})
    const rawPlan = Array.isArray(resolvedSearchParams.plan) ? resolvedSearchParams.plan[0] : resolvedSearchParams.plan
    const rawPrice = Array.isArray(resolvedSearchParams.price) ? resolvedSearchParams.price[0] : resolvedSearchParams.price

    const planName = rawPlan || "monthly"
    const parsedPrice = Number.parseFloat(rawPrice || "1.99")
    const planPrice = Number.isFinite(parsedPrice) ? parsedPrice : 1.99

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PaymentContent planName={planName} planPrice={planPrice} />
        </main>
    )
}

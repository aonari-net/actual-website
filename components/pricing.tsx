"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

const plans = [
  {
    name: "1 Month",
    price: "1.99",
    period: "",
    description: "Full protection, billed monthly",
    features: [
      "All server locations",
      "Unlimited bandwidth",
      "Unlimited devices",
      "Priority support",
      "Ad & tracker blocking",
      "Dedicated IP included",
    ],
    featured: false,
  },
  {
    name: "1 Year",
    price: "13.99",
    period: "",
    description: "Best value, billed annually",
    features: [
      "All server locations",
      "Unlimited bandwidth",
      "Unlimited devices",
      "Priority support",
      "Ad & tracker blocking",
      "Dedicated IP included",
    ],
    featured: true,
  },
  {
    name: "3 Months",
    price: "4.99",
    period: "",
    description: "Great value, popular choice",
    features: [
      "All server locations",
      "Unlimited bandwidth",
      "Unlimited devices",
      "Priority support",
      "Ad & tracker blocking",
      "Dedicated IP included",
    ],
    featured: false,
  },
]

export function Pricing() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(Boolean(data?.user))
      })
      .catch(() => {
        setIsAuthenticated(false)
      })
  }, [])

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(0_0%_6%)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-balance">
            Simple, transparent
            <br />
            <span className="text-muted-foreground">pricing.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const CardContent = () => {
              const { ref, isVisible } = useScrollAnimation(0.1)

              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 2.0,
                    delay: i * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative rounded-2xl p-8 transition-all duration-500 ${plan.featured
                      ? "border-2 border-primary/50 bg-card scale-[1.02]"
                      : "border border-border/50 bg-card/50 hover:border-border"
                    }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-primary">{plan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <span className="text-5xl font-semibold text-primary tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={2} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={
                      isAuthenticated
                        ? `/payment?plan=${plan.name.toLowerCase()}&price=${plan.price}`
                        : "/register"
                    }
                    className={`block w-full text-center rounded-full py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${plan.featured
                        ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        : "border border-border bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                  >
                    Get started
                  </Link>
                </motion.div>
              )
            }

            return <CardContent key={plan.name} />
          })}
        </div>
      </div>
    </section>
  )
}

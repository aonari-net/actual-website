"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    quote:
      "Hydrogen is the only VPN I've ever used that I genuinely forget is running. It's that fast.",
    author: "Sarah K.",
    role: "Software Engineer",
  },
  {
    quote:
      "Switched from a competitor and immediately noticed the speed difference. Night and day.",
    author: "Marcus T.",
    role: "Product Designer",
  },
  {
    quote:
      "The zero-logs policy isn't just marketing. They've been independently audited three times.",
    author: "Elena R.",
    role: "Security Researcher",
  },
]

export function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_0%_6%)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Trusted
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-balance">
            Loved by millions.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, i) => {
            const Card = () => {
              const { ref, isVisible } = useScrollAnimation(0.1)
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 2.0,
                    delay: i * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-2xl border border-border/50 bg-card/50 p-8"
                >
                  {/* Quote marks */}
                  <div className="mb-4 text-3xl text-muted-foreground/30 font-serif leading-none">
                    {'"'}
                  </div>
                  <p className="text-base leading-relaxed text-primary/90 mb-6">
                    {testimonial.quote}
                  </p>
                  <div>
                    <div className="text-sm font-medium text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              )
            }
            return <Card key={testimonial.author} />
          })}
        </div>
      </div>
    </section>
  )
}

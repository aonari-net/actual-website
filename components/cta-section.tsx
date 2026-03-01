"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(0_0%_10%)_0%,_transparent_60%)]" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: "60px" } : {}}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="h-px bg-primary/50 mx-auto mb-12"
          />

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-primary leading-[0.95] text-balance">
            Start protecting
            <br />
            your digital life.
          </h2>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Join over 10 million users who trust Hydrogen VPN to keep their
            online activity private and secure.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#pricing"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            >
              Get Hydrogen VPN
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <span className="text-sm text-muted-foreground">
              30-day money-back guarantee
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

function ShieldVisual() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-border/40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-8 rounded-full border border-border/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Inner ring with glow */}
      <motion.div
        className="absolute inset-16 rounded-full border border-border/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Central glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      >
        <div className="relative">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/12 animate-glow-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/80" />
          </div>
        </div>
      </motion.div>

      {/* Orbiting dots */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="animate-orbit">
          <div className="h-2 w-2 rounded-full bg-primary/60" />
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="animate-orbit-reverse">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
        </div>
      </motion.div>

      {/* Radial gradient backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(220_20%_14%)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary/80" />
            </span>
            Now available worldwide
          </span>
        </motion.div>

        {/* Shield Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <ShieldVisual />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-primary leading-[0.95] text-balance"
        >
          Invisible
          <br />
          protection.
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          The fastest, most private VPN. Built for the modern internet.
          Zero logs. Maximum speed. Pure privacy.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(15,23,42,0.15)]"
          >
            Start free trial
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-border/90 bg-card/75 px-8 py-3.5 text-base font-medium text-primary transition-all duration-300 hover:bg-secondary hover:scale-[1.02]"
          >
            Learn more
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16"
        >
          {[
            { value: "90,000+", label: "Users worldwide" },
            { value: "99.9%", label: "Uptime guarantee" },
            { value: "0", label: "Logs stored" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}

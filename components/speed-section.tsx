"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useEffect, useState, useRef } from "react"

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  start,
}: {
  target: number
  suffix?: string
  duration?: number
  start: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!start || hasAnimated.current) return
    hasAnimated.current = true

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [start, target, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

function SpeedBar({
  label,
  speed,
  maxSpeed,
  delay,
  isVisible,
  accent = false,
}: {
  label: string
  speed: number
  maxSpeed: number
  delay: number
  isVisible: boolean
  accent?: boolean
}) {
  const percentage = (speed / maxSpeed) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-sm font-medium ${
            accent ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
        <span
          className={`text-sm tabular-nums ${
            accent ? "text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          {speed} Mbps
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : {}}
          transition={{
            duration: 2.0,
            delay: delay + 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`h-full rounded-full ${
            accent ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        />
      </div>
    </motion.div>
  )
}

export function SpeedSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1)

  return (
    <section id="speed" className="relative py-32 px-6">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(0_0%_6%)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Performance
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-balance">
            Speed without
            <br />
            <span className="text-muted-foreground">compromise.</span>
          </h2>
        </motion.div>

        <div ref={contentRef} className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Speed comparison */}
          <div className="space-y-6">
            <SpeedBar
              label="Hydrogen VPN"
              speed={840}
              maxSpeed={900}
              delay={0}
              isVisible={contentVisible}
              accent
            />
            <SpeedBar
              label="Mullvad"
              speed={420}
              maxSpeed={900}
              delay={0.1}
              isVisible={contentVisible}
            />
            <SpeedBar
              label="Proton"
              speed={310}
              maxSpeed={900}
              delay={0.2}
              isVisible={contentVisible}
            />
            <SpeedBar
              label="Windscribe"
              speed={250}
              maxSpeed={900}
              delay={0.3}
              isVisible={contentVisible}
            />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 840, suffix: "<", unit: "Mbps", label: "Download speed" },
              { value: 20, suffix: "", unit: "ms", label: "Average latency" },
              { value: 100, suffix: "+", unit: "", label: "Server locations" },
              { value: 99, suffix: ".9%", unit: "", label: "Uptime SLA" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={contentVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-semibold text-primary tabular-nums">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    start={contentVisible}
                  />
                  {stat.unit && (
                    <span className="text-lg text-muted-foreground ml-1 font-normal">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

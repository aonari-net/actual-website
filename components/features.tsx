"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Shield, Zap, Globe, Lock, Eye, Server } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Military-grade encryption",
    description:
      "AES-256 encryption protects your data with the same standard used by governments and security agencies.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description:
      "Our proprietary protocol delivers speeds up to 3x faster than traditional VPN connections.",
  },
  {
    icon: Globe,
    title: "100+ server locations",
    description:
      "Connect to servers in over 100 countries. Always find the fastest, closest connection.",
  },
  {
    icon: Lock,
    title: "Zero-knowledge architecture",
    description:
      "We never see, store, or log your browsing activity. Your privacy is mathematically guaranteed.",
  },
  {
    icon: Eye,
    title: "Ad & tracker blocking",
    description:
      "Built-in protection blocks ads, trackers, and malware before they reach your device.",
  },
  {
    icon: Server,
    title: "RAM-only servers",
    description:
      "All servers run in volatile memory. Data is physically incapable of persisting after reboot.",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.5,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl border border-border/50 bg-card/50 p-8 transition-all duration-500 hover:border-border hover:bg-card"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-secondary p-3">
          <feature.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 text-lg font-medium text-primary">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Features() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Features
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-balance">
            Everything you need.
            <br />
            <span className="text-muted-foreground">Nothing you don{"'"}t.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

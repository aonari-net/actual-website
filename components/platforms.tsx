"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Monitor, Smartphone, Tablet, Tv, Globe, Wifi } from "lucide-react"

const platforms = [
  { icon: Monitor, name: "macOS", description: "Native Apple Silicon app" },
  { icon: Monitor, name: "Windows", description: "Windows 10 & 11" },
  { icon: Smartphone, name: "iOS", description: "iPhone & iPad" },
  { icon: Smartphone, name: "Android", description: "Android 8.0+" },
  { icon: Globe, name: "Browser", description: "Chrome & Firefox" },
  { icon: Tablet, name: "Linux", description: "Ubuntu, Fedora & more" },
  { icon: Tv, name: "Smart TV", description: "Android TV & Fire TV" },
  { icon: Wifi, name: "Router", description: "Protect all devices" },
]

export function Platforms() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Platforms
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-balance">
            One account.
            <br />
            <span className="text-muted-foreground">Every device.</span>
          </h2>
        </motion.div>

        {/* Scrolling platform cards */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
            className="flex gap-4"
          >
            {[...platforms, ...platforms, ...platforms].map((platform, i) => (
              <div
                key={`${platform.name}-${i}`}
                className="flex-shrink-0 w-48 rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-border hover:bg-card"
              >
                <platform.icon
                  className="h-6 w-6 text-primary mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-medium text-primary">{platform.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {platform.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Connection count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Connect up to{" "}
            <span className="text-primary font-semibold">10 devices</span>{" "}
            simultaneously
          </p>
        </motion.div>
      </div>
    </section>
  )
}

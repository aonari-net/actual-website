"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const privacyFeatures = [
  {
    title: "No logs. Ever.",
    description:
      "We operate under a strict no-logs policy. We don't track, collect, or share your browsing data. Period.",
  },
  {
    title: "Open source audited",
    description:
      "Our codebase is publicly auditable. Independent security firms verify our claims annually.",
  },
  {
    title: "Kill switch",
    description:
      "If the VPN connection drops, our kill switch instantly blocks all traffic to prevent data leaks.",
  },
  {
    title: "DNS leak protection",
    description:
      "We run our own DNS servers. Your queries never touch third-party resolvers.",
  },
]

function EncryptionVisual() {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <div ref={ref} className="relative flex items-center justify-center py-8">
      <svg
        viewBox="0 0 400 300"
        className="w-full max-w-md"
        fill="none"
      >
        {/* Connection lines */}
        <motion.line
          x1="50"
          y1="150"
          x2="350"
          y2="150"
          stroke="hsl(0 0% 20%)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={isVisible ? { pathLength: 1 } : {}}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* User device */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <rect
            x="20"
            y="120"
            width="60"
            height="60"
            rx="12"
            stroke="hsl(0 0% 30%)"
            strokeWidth="1"
            fill="hsl(0 0% 6%)"
          />
          <text
            x="50"
            y="155"
            textAnchor="middle"
            fill="hsl(0 0% 60%)"
            fontSize="10"
            fontFamily="system-ui"
          >
            You
          </text>
        </motion.g>

        {/* Encryption shield */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <circle
            cx="200"
            cy="150"
            r="40"
            stroke="hsl(0 0% 100%)"
            strokeWidth="1.5"
            fill="hsl(0 0% 6%)"
            opacity="0.8"
          />
          <circle cx="200" cy="150" r="25" stroke="hsl(0 0% 40%)" strokeWidth="0.5" fill="none" />
          <motion.circle
            cx="200"
            cy="150"
            r="8"
            fill="hsl(0 0% 100%)"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: [0, 1, 0.6, 1] } : {}}
            transition={{ duration: 2, delay: 1 }}
          />
          <text
            x="200"
            y="205"
            textAnchor="middle"
            fill="hsl(0 0% 60%)"
            fontSize="10"
            fontFamily="system-ui"
          >
            Hydrogen
          </text>
        </motion.g>

        {/* Internet */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <rect
            x="320"
            y="120"
            width="60"
            height="60"
            rx="12"
            stroke="hsl(0 0% 30%)"
            strokeWidth="1"
            fill="hsl(0 0% 6%)"
          />
          <text
            x="350"
            y="155"
            textAnchor="middle"
            fill="hsl(0 0% 60%)"
            fontSize="10"
            fontFamily="system-ui"
          >
            Web
          </text>
        </motion.g>

        {/* Animated data packets */}
        {isVisible && (
          <>
            <motion.circle
              cx="50"
              cy="150"
              r="3"
              fill="hsl(0 0% 100%)"
              animate={{
                cx: [80, 160, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="200"
              cy="150"
              r="3"
              fill="hsl(0 0% 50%)"
              animate={{
                cx: [200, 280, 350],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </svg>
    </div>
  )
}

export function PrivacySection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <section id="privacy" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Privacy
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-primary text-balance">
            Your data is
            <br />
            <span className="text-muted-foreground">your data.</span>
          </h2>
        </motion.div>

        {/* Encryption visual */}
        <EncryptionVisual />

        {/* Privacy features */}
        <div className="mt-20 grid gap-px md:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border/50 overflow-hidden">
          {privacyFeatures.map((feature, i) => {
            const Wrapper = ({ children }: { children: React.ReactNode }) => {
              const { ref, isVisible } = useScrollAnimation(0.1)
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-card/50 p-8 border-r border-b border-border/30 last:border-r-0"
                >
                  {children}
                </motion.div>
              )
            }
            return (
              <Wrapper key={feature.title}>
                <div className="mb-3 text-2xl font-semibold text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-base font-medium text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}

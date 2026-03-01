"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Speed", href: "#speed" },
  { label: "Privacy", href: "#privacy" },
  { label: "Pricing", href: "#pricing" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ name: string, email: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)

    // Check auth status
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => { });

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-background/75 backdrop-blur-2xl border-b border-border/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
                <circle cx="16" cy="16" r="14" stroke="hsl(var(--foreground) / 0.35)" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="8" stroke="hsl(var(--foreground) / 0.5)" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="3" fill="hsl(var(--foreground) / 0.95)" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-primary">
              Hydrogen
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-muted-foreground hover:text-red-500 transition-colors duration-300"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105"
                >
                  Get Started
                </a>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-background/88 backdrop-blur-2xl pt-20"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-light text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg text-primary"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="text-lg text-red-500"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg text-muted-foreground"
                    >
                      Sign in
                    </a>
                    <a
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground"
                    >
                      Get Started
                    </a>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

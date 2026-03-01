"use client"

const footerLinks = {
  Product: ["Features", "Pricing", "Downloads", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Help Center", "Documentation", "Status", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
                <circle cx="16" cy="16" r="14" stroke="hsl(0 0% 100%)" strokeWidth="1.5" opacity="0.3" />
                <circle cx="16" cy="16" r="8" stroke="hsl(0 0% 100%)" strokeWidth="1.5" opacity="0.6" />
                <circle cx="16" cy="16" r="3" fill="hsl(0 0% 100%)" />
              </svg>
              <span className="text-base font-semibold text-primary">Hydrogen</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The fastest, most private VPN for the modern internet.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-primary mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            2026 Hydrogen VPN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "GitHub", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

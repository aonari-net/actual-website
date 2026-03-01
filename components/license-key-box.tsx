"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

type LicenseKeyBoxProps = {
  licenseKey: string
}

function truncateKey(value: string, visibleChars = 20) {
  if (value.length <= visibleChars + 3) return value
  return `${value.slice(0, visibleChars)}...`
}

export function LicenseKeyBox({ licenseKey }: LicenseKeyBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = licenseKey
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex flex-col p-4 rounded-xl bg-primary/5 border border-primary/20">
      <div className="flex items-center gap-2">
        <code className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm md:text-base font-mono font-bold text-primary">
          {truncateKey(licenseKey)}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-accent transition-colors"
          aria-label="Copy full license key"
          title="Copy full license key"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <span className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mt-2">Your License Key</span>
    </div>
  )
}

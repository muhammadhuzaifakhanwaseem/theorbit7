'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  ['Home', '#top'],
  ['Services', '#services'],
  ['Solutions', '#solutions'],
  ['Work', '#work'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-4 top-[72px] rounded-2xl border border-border bg-card p-3 shadow-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">
              Start a Project
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}

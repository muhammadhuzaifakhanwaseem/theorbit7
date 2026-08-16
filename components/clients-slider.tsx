'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const clients = [
  { name: 'Northstar Health', detail: 'Healthcare technology' },
  { name: 'Morrow & Co.', detail: 'Professional services' },
  { name: 'Atlas Commerce', detail: 'Retail platform' },
  { name: 'Fieldstone', detail: 'Construction systems' },
  { name: 'Verde Finance', detail: 'Financial services' },
]

export function ClientsSlider() {
  const [active, setActive] = useState(0)
  const next = () => setActive((current) => (current + 1) % clients.length)
  const previous = () => setActive((current) => (current - 1 + clients.length) % clients.length)

  useEffect(() => {
    const timer = window.setInterval(next, 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section aria-label="Selected clients" className="border-y border-border bg-muted/45">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <p className="eyebrow">Trusted partnerships</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.03em] text-primary sm:text-4xl">Built with ambitious teams.</h2>
          </div>
          <div className="flex-1 lg:max-w-3xl">
            <div className="grid min-h-28 items-center rounded-2xl border border-border bg-background px-6 py-5 sm:px-8">
              <div key={clients[active].name} className="animate-[fade-in_400ms_ease-out]">
                <p className="font-serif text-2xl font-semibold text-primary sm:text-3xl">{clients[active].name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{clients[active].detail}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex gap-2" aria-label="Client slides">
                {clients.map((client, index) => <button key={client.name} type="button" aria-label={`Show ${client.name}`} aria-current={index === active} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-primary' : 'w-2 bg-primary/25'}`} />)}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={previous} aria-label="Previous client" className="grid size-10 place-items-center rounded-full border border-border text-primary hover:bg-primary hover:text-primary-foreground"><ArrowLeft size={16} /></button>
                <button type="button" onClick={next} aria-label="Next client" className="grid size-10 place-items-center rounded-full border border-border text-primary hover:bg-primary hover:text-primary-foreground"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Check, Heart, MessageCircle, Play, Search, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { VisualKind } from "@/data/services/types";
import { cn } from "@/lib/utils";

/**
 * Code-drawn product illustrations (no raster images): crisp at any size,
 * zero network requests, and decorative only (aria-hidden).
 */

function Bar({ w = "100%", className }: { w?: string; className?: string }) {
  return <span className={cn("block h-2 rounded-full bg-ink/8", className)} style={{ width: w }} />;
}

function Chrome({ children, className, url = "theorbit7.com" }: { children: React.ReactNode; className?: string; url?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-white shadow-lift", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-[#f2a6a0]" />
        <span className="size-2.5 rounded-full bg-[#f3d38b]" />
        <span className="size-2.5 rounded-full bg-[#9fd3b4]" />
        <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 font-mono text-[0.6rem] text-soft ring-1 ring-line">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-[44%] min-w-[150px] rounded-[2rem] border-[6px] border-ink bg-white p-2 shadow-lift", className)}>
      <div className="mx-auto mb-2 h-4 w-16 rounded-full bg-ink" />
      {children}
    </div>
  );
}

const scenes: Record<VisualKind, () => React.ReactNode> = {
  browser: () => (
    <Chrome className="w-full">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="h-3 w-16 rounded-full bg-brand" />
          <div className="flex gap-2">
            <Bar w="2.5rem" /> <Bar w="2.5rem" /> <Bar w="2.5rem" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-[1.2fr_1fr] gap-4">
          <div className="space-y-2.5">
            <span className="block h-4 w-[90%] rounded-md bg-ink/80" />
            <span className="block h-4 w-[70%] rounded-md bg-ink/80" />
            <Bar w="85%" className="mt-4" />
            <Bar w="60%" />
            <span className="mt-4 inline-block h-7 w-24 rounded-full bg-brand" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 via-brand to-brand-900">
            <div className="absolute inset-4 animate-spin-slow rounded-full border border-white/20" />
            <div className="absolute inset-10 rounded-full bg-mint/40 blur-xl" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-line p-2.5">
              <span className="mb-2 block size-5 rounded-md bg-mint-100" />
              <Bar w="80%" />
              <Bar w="50%" className="mt-1.5" />
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  ),
  phone: () => (
    <div className="relative flex w-full items-end justify-center gap-0 pt-4">
      <Phone className="z-10 -rotate-6 translate-x-6">
        <div className="space-y-2 rounded-2xl bg-brand p-3 text-white">
          <span className="block h-2 w-10 rounded-full bg-white/50" />
          <span className="block h-4 w-24 rounded-md bg-white" />
          <div className="flex gap-1.5 pt-2">
            <span className="h-14 flex-1 rounded-lg bg-white/15" />
            <span className="h-14 flex-1 rounded-lg bg-mint/40" />
          </div>
        </div>
        <div className="mt-2 space-y-2 p-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-7 rounded-lg bg-mint-100" />
              <div className="flex-1 space-y-1">
                <Bar w="80%" />
                <Bar w="45%" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-around rounded-xl bg-paper py-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("size-3 rounded-full", i === 0 ? "bg-brand" : "bg-ink/15")} />
          ))}
        </div>
      </Phone>
      <Phone className="rotate-6 -translate-x-6 translate-y-6 bg-paper">
        <div className="rounded-2xl bg-white p-3 ring-1 ring-line">
          <Bar w="50%" />
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {[40, 65, 50, 80, 60, 95].map((h, i) => (
              <span
                key={i}
                className="flex-1 origin-bottom rounded-t bg-brand-500"
                style={{ height: `${h}%`, animation: `bar 1.2s ${i * 90}ms both var(--ease-out)` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-2 space-y-2 p-1">
          <span className="block h-9 rounded-xl bg-brand" />
          <span className="block h-9 rounded-xl bg-white ring-1 ring-line" />
        </div>
      </Phone>
    </div>
  ),
  cart: () => (
    <Chrome className="w-full" url="store.example">
      <div className="grid grid-cols-[1.4fr_1fr]">
        <div className="grid grid-cols-2 gap-3 p-4">
          {["from-mint to-mint-100", "from-sand to-[#ebe2d3]", "from-brand-400 to-brand", "from-[#e7ece9] to-white"].map((g, i) => (
            <div key={i}>
              <div className={cn("aspect-[4/5] rounded-xl bg-gradient-to-br", g)} />
              <Bar w="70%" className="mt-2" />
              <span className="mt-1.5 block h-2 w-8 rounded-full bg-brand/60" />
            </div>
          ))}
        </div>
        <div className="border-l border-line bg-paper p-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-soft">Your cart</p>
          {[0, 1].map((i) => (
            <div key={i} className="mt-3 flex items-center gap-2">
              <span className={cn("size-9 rounded-lg", i ? "bg-sand" : "bg-mint")} />
              <div className="flex-1 space-y-1">
                <Bar w="90%" />
                <Bar w="40%" />
              </div>
            </div>
          ))}
          <div className="mt-5 space-y-1.5 border-t border-line pt-3">
            <Bar w="100%" />
            <Bar w="70%" />
          </div>
          <span className="mt-4 flex h-8 items-center justify-center gap-1 rounded-full bg-brand text-[0.62rem] font-medium text-white">
            <Check className="size-3" /> Checkout
          </span>
        </div>
      </div>
    </Chrome>
  ),
  dashboard: () => (
    <Chrome className="w-full" url="app.example/dashboard">
      <div className="grid grid-cols-[3.5rem_1fr]">
        <div className="space-y-3 border-r border-line bg-paper p-3">
          <span className="block size-7 rounded-lg bg-brand" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={cn("block size-7 rounded-lg", i === 1 ? "bg-mint" : "bg-ink/5")} />
          ))}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-line p-2.5">
                <Bar w="50%" />
                <span className={cn("mt-2 block h-3.5 w-12 rounded", i === 0 ? "bg-brand" : "bg-ink/70")} />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-line p-3">
            <svg viewBox="0 0 300 90" className="h-24 w-full" fill="none">
              <path d="M0 70 C40 60 60 72 90 55 S150 30 180 40 S240 12 300 8" stroke="var(--brand)" strokeWidth="2.5" strokeDasharray="420" strokeDashoffset="420" style={{ animation: "dash 2.2s 0.3s forwards var(--ease-out)" }} />
              <path d="M0 70 C40 60 60 72 90 55 S150 30 180 40 S240 12 300 8 V90 H0Z" fill="url(#dg)" opacity="0.5" />
              <defs>
                <linearGradient id="dg" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="var(--mint)" />
                  <stop offset="1" stopColor="#fff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mt-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="size-5 rounded-full bg-mint-100" />
                <Bar w="35%" />
                <Bar w="20%" />
                <span className={cn("ml-auto h-4 w-12 rounded-full", i === 1 ? "bg-gold/40" : "bg-mint")} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  ),
  code: () => (
    <div className="w-full overflow-hidden rounded-2xl bg-brand-950 font-mono text-[0.68rem] leading-6 text-white/80 shadow-lift ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-white/40">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3">workflow.service.ts</span>
      </div>
      <pre className="overflow-hidden p-4 whitespace-pre">
        <span className="text-white/30">01 </span><span className="text-[#9fd3b4]">export class</span> <span className="text-gold">OrderWorkflow</span> {"{"}{"\n"}
        <span className="text-white/30">02 </span>  <span className="text-[#9fd3b4]">async</span> <span className="text-mint">approve</span>(order: <span className="text-gold">Order</span>) {"{"}{"\n"}
        <span className="text-white/30">03 </span>    <span className="text-[#9fd3b4]">await</span> this.inventory.<span className="text-mint">reserve</span>(order){"\n"}
        <span className="text-white/30">04 </span>    <span className="text-[#9fd3b4]">await</span> this.invoices.<span className="text-mint">create</span>(order){"\n"}
        <span className="text-white/30">05 </span>    <span className="text-[#9fd3b4]">return</span> this.notify.<span className="text-mint">team</span>(<span className="text-[#f3d38b]">&quot;approved&quot;</span>){"\n"}
        <span className="text-white/30">06 </span>  {"}"}{"\n"}
        <span className="text-white/30">07 </span>{"}"}<span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-mint" style={{ animation: "blink 1s steps(1) infinite" }} />
      </pre>
      <div className="flex items-center gap-2 border-t border-white/10 bg-white/[0.03] px-4 py-2.5 text-mint">
        <Check className="size-3.5" /> tests passed · deployed to production
      </div>
    </div>
  ),
  api: () => (
    <div className="relative aspect-[4/3] w-full">
      <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" fill="none">
        {[
          "M200 150 L70 60",
          "M200 150 L330 60",
          "M200 150 L60 220",
          "M200 150 L340 230",
          "M200 150 L200 270",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 5" />
            <circle r="4" fill="var(--brand-500)" style={{ offsetPath: `path("${d}")`, animation: `travel ${2.4 + i * 0.4}s ${i * 0.3}s linear infinite` }} />
          </g>
        ))}
      </svg>
      {[
        { l: "CRM", x: "17%", y: "20%" },
        { l: "ERP", x: "83%", y: "20%" },
        { l: "Payments", x: "15%", y: "73%" },
        { l: "Mobile app", x: "85%", y: "77%" },
        { l: "Website", x: "50%", y: "90%" },
      ].map((n) => (
        <span key={n.l} className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-[0.7rem] font-medium text-ink-2" style={{ left: n.x, top: n.y }}>
          {n.l}
        </span>
      ))}
      <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-brand font-mono text-sm font-semibold text-white shadow-brand">
        <span className="absolute inset-0 animate-pulse-soft rounded-3xl ring-8 ring-brand/10" />
        API
      </div>
    </div>
  ),
  flow: () => (
    <div className="relative w-full space-y-3">
      {[
        { t: "Trigger", d: "New invoice email received", c: "bg-sand text-ink" },
        { t: "AI step", d: "Extract supplier, amount & due date", c: "bg-brand text-white", ai: true },
        { t: "Action", d: "Create bill in accounting", c: "bg-white text-ink" },
        { t: "Notify", d: "Post summary to finance channel", c: "bg-mint text-ink" },
      ].map((s, i) => (
        <div key={s.t} className="relative">
          {i > 0 && <span className="absolute -top-3 left-8 h-3 w-px bg-brand/30" />}
          <div className={cn("flex items-center gap-3 rounded-2xl p-3.5 shadow-soft ring-1 ring-line", s.c)} style={{ marginLeft: `${(i % 2) * 12}%` }}>
            <span className={cn("flex size-9 items-center justify-center rounded-xl", s.ai ? "bg-white/15" : "bg-brand/10")}>
              {s.ai ? <Sparkles className="size-4" /> : <span className="font-mono text-xs">0{i + 1}</span>}
            </span>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-60">{s.t}</p>
              <p className="text-[0.8rem] font-medium">{s.d}</p>
            </div>
            <Check className="ml-auto size-4 opacity-70" />
          </div>
        </div>
      ))}
    </div>
  ),
  ai: () => (
    <div className="w-full rounded-3xl border border-line bg-white p-4 shadow-lift">
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="flex size-8 items-center justify-center rounded-xl bg-brand text-white">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-[0.8rem] font-semibold">AI Assistant</p>
          <p className="flex items-center gap-1 text-[0.65rem] text-brand-500">
            <span className="size-1.5 rounded-full bg-brand-500" /> online
          </p>
        </div>
      </div>
      <div className="space-y-3 pt-4 text-[0.78rem]">
        <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-mint-100 px-3.5 py-2.5">
          What is your returns policy for international orders?
        </p>
        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-paper px-3.5 py-2.5 ring-1 ring-line">
          <p>International orders can be returned within the window set in your policy. Here is the step-by-step process…</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[0.6rem] text-muted ring-1 ring-line">returns-policy.pdf</span>
            <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[0.6rem] text-muted ring-1 ring-line">help-centre</span>
          </div>
        </div>
        <div className="flex w-fit gap-1 rounded-full bg-paper px-3 py-2.5 ring-1 ring-line">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-brand-400" style={{ animation: `pulse-soft 1.2s ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  ),
  design: () => (
    <div className="relative w-full rounded-3xl border border-line bg-paper p-4 shadow-lift bg-dots">
      <div className="grid grid-cols-[1.3fr_1fr] gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-soft ring-1 ring-line">
          <span className="block aspect-video rounded-xl bg-gradient-to-br from-brand-500 to-brand-900" />
          <span className="mt-3 block h-3 w-3/4 rounded bg-ink/80" />
          <Bar w="90%" className="mt-2" />
          <span className="mt-3 inline-block h-6 w-20 rounded-full bg-brand" />
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-3 ring-1 ring-line">
            <p className="font-serif text-4xl italic leading-none text-brand">Aa</p>
            <p className="mt-1 font-mono text-[0.58rem] text-soft">Display / Body</p>
          </div>
          <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-white p-3 ring-1 ring-line">
            {["bg-brand", "bg-brand-500", "bg-mint", "bg-sand"].map((c) => (
              <span key={c} className={cn("aspect-square rounded-full ring-1 ring-black/5", c)} />
            ))}
          </div>
          <div className="flex gap-1.5 rounded-2xl bg-white p-3 ring-1 ring-line">
            <span className="h-6 flex-1 rounded-full bg-brand" />
            <span className="h-6 flex-1 rounded-full ring-1 ring-line-strong" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-[48%] flex items-start gap-1 animate-float">
        <svg viewBox="0 0 16 16" className="size-4 fill-brand"><path d="M1 1l5 14 2-6 6-2z" /></svg>
        <span className="rounded-md bg-brand px-1.5 py-0.5 text-[0.6rem] font-medium text-white">Designer</span>
      </div>
    </div>
  ),
  brand: () => (
    <div className="relative grid w-full grid-cols-2 gap-3">
      <div className="relative col-span-2 flex aspect-[2/1] items-center justify-center overflow-hidden rounded-3xl bg-brand">
        <div className="absolute inset-0 opacity-30 bg-grid [background-size:24px_24px] invert" />
        <div className="absolute size-40 rounded-full border border-dashed border-white/30" />
        <div className="absolute size-24 animate-spin-slow rounded-full border border-white/40">
          <span className="absolute -top-1 left-1/2 size-2 rounded-full bg-mint" />
        </div>
        <span className="relative font-serif text-6xl italic text-white">O</span>
      </div>
      <div className="rounded-3xl bg-sand p-4">
        <p className="font-serif text-3xl italic text-brand">Brand</p>
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Typeface</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5 rounded-3xl bg-white p-3 ring-1 ring-line">
        {["bg-brand", "bg-mint", "bg-gold", "bg-ink"].map((c) => (
          <span key={c} className={cn("rounded-xl", c)} />
        ))}
      </div>
    </div>
  ),
  video: () => (
    <div className="w-full overflow-hidden rounded-3xl bg-ink shadow-lift">
      <div className="relative aspect-video bg-gradient-to-br from-brand-500 via-brand to-brand-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgb(200_169_106/0.45),transparent_45%)]" />
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 font-mono text-[0.6rem] text-white">
          <span className="size-1.5 rounded-full bg-[#e5533d]" style={{ animation: "blink 1.2s steps(1) infinite" }} /> REC
        </div>
        <span className="absolute right-4 top-4 font-mono text-[0.6rem] text-white/70">4K · 25fps</span>
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
          <Play className="ml-0.5 size-5 fill-white" />
        </span>
        <div className="absolute inset-x-6 top-6 bottom-6 border border-white/20" />
      </div>
      <div className="space-y-1.5 p-3">
        {[["w-[30%] bg-mint", "w-[22%] bg-brand-400", "w-[35%] bg-gold/70"], ["w-[50%] bg-white/20", "w-[40%] bg-white/10"]].map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((c, i) => (
              <span key={i} className={cn("h-4 rounded", c)} />
            ))}
          </div>
        ))}
        <div className="relative h-px bg-white/20">
          <span className="absolute -top-1 left-[42%] size-2 rounded-full bg-[#e5533d]" />
        </div>
      </div>
    </div>
  ),
  search: () => (
    <div className="w-full rounded-3xl border border-line bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2 rounded-full px-4 py-2.5 ring-1 ring-line-strong">
        <Search className="size-4 text-soft" />
        <span className="text-[0.8rem] text-ink-2">best digital agency for my business</span>
        <span className="ml-0.5 inline-block h-4 w-px bg-ink" style={{ animation: "blink 1s steps(1) infinite" }} />
      </div>
      <div className="mt-4 rounded-2xl bg-mint-50 p-4 ring-1 ring-brand/15">
        <p className="flex items-center gap-1.5 text-[0.65rem] text-muted">
          <span className="size-4 rounded-full bg-brand" /> yourbrand.com › services
        </p>
        <p className="mt-1.5 text-[0.95rem] font-medium text-brand">Your page, ranking for the searches that matter</p>
        <Bar w="95%" className="mt-2 bg-brand/15" />
        <Bar w="70%" className="mt-1.5 bg-brand/15" />
        <div className="mt-3 flex gap-1.5">
          {["Services", "Pricing", "FAQ"].map((s) => (
            <span key={s} className="rounded-full bg-white px-2.5 py-1 text-[0.62rem] ring-1 ring-line">{s}</span>
          ))}
        </div>
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="mt-4 px-1 opacity-60">
          <Bar w="30%" />
          <span className="mt-2 block h-2.5 w-2/3 rounded-full bg-ink/20" />
          <Bar w="90%" className="mt-2" />
        </div>
      ))}
    </div>
  ),
  map: () => (
    <div className="relative w-full overflow-hidden rounded-3xl border border-line bg-[#eef3ef] shadow-lift">
      <svg viewBox="0 0 400 280" className="w-full" fill="none">
        <path d="M-10 200 C80 180 120 230 200 190 S320 120 420 150" stroke="#fff" strokeWidth="14" />
        <path d="M120 -10 C140 80 100 160 150 300" stroke="#fff" strokeWidth="10" />
        <path d="M280 -10 L300 300" stroke="#fff" strokeWidth="8" />
        <rect x="20" y="30" width="70" height="50" rx="8" fill="#dfe9e2" />
        <rect x="190" y="40" width="60" height="70" rx="8" fill="#dfe9e2" />
        <rect x="320" y="200" width="60" height="50" rx="8" fill="#dfe9e2" />
        <circle cx="230" cy="150" r="46" fill="var(--brand)" opacity="0.08" />
      </svg>
      {[
        { x: "57%", y: "53%", main: true },
        { x: "25%", y: "38%" },
        { x: "80%", y: "30%" },
      ].map((p, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
          <svg viewBox="0 0 24 32" className={cn(p.main ? "h-10 w-8 animate-float" : "h-6 w-5 opacity-50")}>
            <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.4 12 32 12 32s12-11.6 12-20.3C24 5.2 18.6 0 12 0z" fill={p.main ? "var(--brand)" : "var(--soft)"} />
            <circle cx="12" cy="11.5" r="4.5" fill="#fff" />
          </svg>
        </span>
      ))}
      <div className="glass absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl p-3">
        <span className="size-10 rounded-xl bg-brand" />
        <div className="flex-1">
          <span className="block h-2.5 w-28 rounded-full bg-ink/70" />
          <div className="mt-1.5 flex gap-0.5 text-gold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </div>
        </div>
        <span className="rounded-full bg-brand px-3 py-1.5 text-[0.62rem] font-medium text-white">Directions</span>
      </div>
    </div>
  ),
  chart: () => (
    <div className="w-full rounded-3xl border border-line bg-white p-5 shadow-lift">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-soft">Organic visibility</p>
          <span className="mt-2 block h-4 w-20 rounded bg-ink/80" />
        </div>
        <div className="flex gap-1.5">
          {["Crawl", "Index", "Speed"].map((s) => (
            <span key={s} className="flex items-center gap-1 rounded-full bg-mint-50 px-2 py-1 text-[0.6rem] text-brand ring-1 ring-brand/15">
              <Check className="size-3" /> {s}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 320 140" className="mt-4 w-full" fill="none">
        {[30, 65, 100].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--line)" strokeDasharray="3 4" />
        ))}
        <path d="M0 120 L40 115 L80 118 L120 100 L160 92 L200 70 L240 58 L280 36 L320 18 V140 H0Z" fill="url(#cg)" />
        <path d="M0 120 L40 115 L80 118 L120 100 L160 92 L200 70 L240 58 L280 36 L320 18" stroke="var(--brand)" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="420" strokeDashoffset="420" style={{ animation: "dash 2.4s 0.3s forwards var(--ease-out)" }} />
        <circle cx="320" cy="18" r="5" fill="var(--brand)" />
        <defs>
          <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="var(--mint)" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  social: () => (
    <div className="grid w-full grid-cols-[1fr_1.1fr] items-center gap-4">
      <div className="grid grid-cols-3 gap-1.5">
        {["bg-brand", "bg-mint", "bg-sand", "bg-gold/60", "bg-brand-500", "bg-mint-100", "bg-ink", "bg-sand", "bg-brand-400"].map((c, i) => (
          <span key={i} className={cn("aspect-square rounded-lg", c)} />
        ))}
      </div>
      <div className="rounded-3xl border border-line bg-white p-3 shadow-lift">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-full bg-gradient-to-br from-gold to-brand" />
          <Bar w="45%" />
        </div>
        <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-900">
          <span className="absolute bottom-3 left-3 right-3 font-serif text-xl italic leading-tight text-white">Your story, beautifully told.</span>
        </div>
        <div className="mt-3 flex items-center gap-3 text-ink-2">
          <Heart className="size-4 fill-[#e5533d] text-[#e5533d]" />
          <MessageCircle className="size-4" />
          <Bar w="30%" className="ml-auto" />
        </div>
      </div>
    </div>
  ),
  ads: () => (
    <div className="w-full space-y-3">
      <div className="rounded-3xl border border-line bg-white p-4 shadow-lift">
        <p className="text-[0.65rem] font-semibold text-ink">Sponsored</p>
        <p className="mt-1 text-[0.65rem] text-muted">yourbrand.com</p>
        <p className="mt-1 text-[0.95rem] font-medium text-brand">Get a Free Quote Today — Fast, Expert Service</p>
        <Bar w="90%" className="mt-2" />
        <div className="mt-3 flex gap-2">
          {["Call now", "View services", "Book online"].map((s) => (
            <span key={s} className="rounded-full bg-mint-50 px-2.5 py-1 text-[0.62rem] text-brand ring-1 ring-brand/15">{s}</span>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-white p-4 shadow-soft">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-soft">Conversion funnel</p>
        {[
          ["Impressions", "100%"],
          ["Clicks", "72%"],
          ["Leads", "44%"],
          ["Sales", "24%"],
        ].map(([l, w], i) => (
          <div key={l} className="mt-2.5 flex items-center gap-3">
            <span className="w-20 text-[0.68rem] text-muted">{l}</span>
            <span className="h-3 origin-left rounded-full bg-brand" style={{ width: w, opacity: 1 - i * 0.18, animation: `rise 1s ${i * 120}ms both var(--ease-out)` }} />
          </div>
        ))}
      </div>
    </div>
  ),
  content: () => (
    <div className="relative w-full">
      <div className="rounded-3xl border border-line bg-white p-6 shadow-lift">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-brand-500">Guide · 8 min read</p>
        <span className="mt-3 block h-4 w-[85%] rounded bg-ink/85" />
        <span className="mt-2 block h-4 w-[55%] rounded bg-ink/85" />
        <div className="mt-5 space-y-1.5">
          <Bar w="100%" /> <Bar w="96%" /> <Bar w="80%" />
        </div>
        <span className="mt-5 block h-3 w-1/2 rounded bg-brand/70" />
        <div className="mt-3 space-y-1.5">
          <Bar w="94%" /> <Bar w="70%" />
        </div>
      </div>
      <div className="glass absolute -bottom-6 -right-2 w-44 rounded-2xl p-3 sm:-right-6">
        <p className="font-mono text-[0.58rem] uppercase tracking-widest text-soft">Outline</p>
        {["H1  Main topic", "H2  Key question", "H3  Direct answer", "H2  Next step"].map((h, i) => (
          <p key={h} className="mt-1.5 font-mono text-[0.62rem] text-ink-2" style={{ paddingLeft: h.startsWith("H3") ? 12 : 0, opacity: 1 - i * 0.1 }}>
            {h}
          </p>
        ))}
      </div>
    </div>
  ),
  shield: () => (
    <div className="grid w-full grid-cols-[1fr_1.4fr] items-center gap-5">
      <div className="relative flex aspect-square items-center justify-center">
        <span className="absolute inset-0 animate-pulse-soft rounded-full bg-mint/60 blur-2xl" />
        <span className="absolute inset-2 animate-spin-slow rounded-full border border-dashed border-brand/30" />
        <span className="relative flex size-24 items-center justify-center rounded-[2rem] bg-brand text-white shadow-brand">
          <ShieldCheck className="size-11" strokeWidth={1.5} />
        </span>
      </div>
      <div className="space-y-2.5">
        {["Core updates", "Daily backups", "Uptime monitor", "Malware scan", "SSL certificate"].map((s, i) => (
          <div key={s} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 text-[0.78rem] shadow-soft ring-1 ring-line" style={{ animation: `rise 0.8s ${i * 100}ms both var(--ease-out)` }}>
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative size-2 rounded-full bg-brand-500" />
            </span>
            {s}
            <Check className="ml-auto size-3.5 text-brand" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export default function ServiceVisual({
  kind,
  tags = [],
  className,
}: {
  kind: VisualKind;
  tags?: string[];
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-mint/50 blur-3xl" />
      <div className="relative">{scenes[kind]()}</div>
      {tags.map((t, i) => (
        <span
          key={t}
          className={cn(
            "glass absolute hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink-2 sm:inline-flex animate-float",
            i === 0 && "-left-6 top-6",
            i === 1 && "-right-4 top-1/3 [animation-delay:-2s]",
            i === 2 && "-bottom-4 left-1/4 [animation-delay:-4s]",
          )}
        >
          <span className="size-1.5 rounded-full bg-brand-500" />
          {t}
        </span>
      ))}
    </div>
  );
}

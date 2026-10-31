"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { Check, Sparkles } from "lucide-react";

const nodes = [
  { label: "Web", ring: 0, angle: 20 },
  { label: "Mobile", ring: 0, angle: 200 },
  { label: "AI", ring: 1, angle: 80 },
  { label: "Software", ring: 1, angle: 250 },
  { label: "SEO", ring: 2, angle: 140 },
  { label: "Ads", ring: 2, angle: 320 },
  { label: "Brand", ring: 2, angle: 30 },
];

const rings = [
  { size: 48, dur: 70 },
  { size: 72, dur: 95 },
  { size: 96, dur: 130 },
];

export default function HeroOrbit() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const x1 = useTransform(sx, (v) => v * 18);
  const y1 = useTransform(sy, (v) => v * 18);
  const x2 = useTransform(sx, (v) => v * -26);
  const y2 = useTransform(sy, (v) => v * -26);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[38rem]">
      <motion.div style={{ x: x1, y: y1 }} className="absolute inset-0">
        {/* glow */}
        <div className="absolute inset-[22%] rounded-full bg-mint blur-3xl" />
        {rings.map((r, ri) => (
          <div
            key={ri}
            className="absolute left-1/2 top-1/2 rounded-full border border-brand/15"
            style={{
              width: `${r.size}%`,
              height: `${r.size}%`,
              translate: "-50% -50%",
              animation: reduce ? undefined : `spin ${r.dur}s linear infinite${ri % 2 ? " reverse" : ""}`,
            }}
          >
            {ri === 2 && <div className="absolute inset-0 rounded-full border border-dashed border-brand/10 [transform:scale(1.04)]" />}
            {nodes
              .filter((n) => n.ring === ri)
              .map((n) => (
                <span
                  key={n.label}
                  className="glass absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap text-ink-2 sm:text-sm"
                  style={{
                    left: `${50 + 50 * Math.cos((n.angle * Math.PI) / 180)}%`,
                    top: `${50 + 50 * Math.sin((n.angle * Math.PI) / 180)}%`,
                    animation: reduce ? undefined : `spin ${r.dur}s linear infinite${ri % 2 ? "" : " reverse"}`,
                  }}
                >
                  <span className="size-1.5 rounded-full bg-brand-500" />
                  {n.label}
                </span>
              ))}
          </div>
        ))}
        {/* planet */}
        <div className="absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#3d8a72_0%,#163e33_45%,#081a15_100%)] shadow-[0_40px_80px_-20px_rgb(22_62_51/0.6),inset_-12px_-16px_40px_rgb(0_0_0/0.35),inset_10px_12px_30px_rgb(255_255_255/0.12)]" />
          <div className="absolute inset-0 flex items-center justify-center font-display text-[min(9vw,4.4rem)] font-semibold tracking-[-0.06em] text-white">
            <span className="accent text-mint">7</span>
          </div>
          <div className="absolute -inset-[18%] rounded-full border border-brand/20 [transform:rotateX(70deg)_rotateZ(-20deg)]" />
        </div>
      </motion.div>

      {/* floating glass cards */}
      <motion.div style={{ x: x2, y: y2 }} className="absolute inset-0">
        <div className="glass absolute -left-4 top-[6%] z-10 hidden w-52 !bg-white/95 rounded-2xl p-3.5 sm:block animate-float">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-soft">Sprint review</p>
          <p className="mt-1 text-sm font-medium">New release ready for demo</p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-mint-100">
            <span className="block h-full w-4/5 rounded-full bg-brand" />
          </div>
        </div>
        <div className="glass absolute -right-4 bottom-[10%] z-10 hidden !bg-white/95 items-center gap-3 rounded-2xl p-3 sm:flex animate-float [animation-delay:-3s]">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">AI assistant live</p>
            <p className="text-xs text-muted">Answering from your docs</p>
          </div>
        </div>
        <div className="glass absolute bottom-0 left-[4%] z-10 hidden !bg-white/95 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium md:flex animate-float [animation-delay:-5s]">
          <Check className="size-3.5 text-brand" /> Schema markup valid
        </div>
      </motion.div>
    </div>
  );
}

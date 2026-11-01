"use client";

import { useEffect, useState } from "react";

/** Running SMPTE-style timecode (HH:MM:SS:FF at 25fps). Static under reduced motion. */
export default function Timecode({ className }: { className?: string }) {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      setFrames(Math.floor(((t - start) / 1000) * 25));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const f = frames % 25;
  const s = Math.floor(frames / 25);
  return (
    <span className={className} aria-hidden="true">
      00:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}:{pad(f)}
    </span>
  );
}

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function renderOg({ eyebrow, title, tags = [] }: { eyebrow: string; title: string; tags?: string[] }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0c261f 0%, #163e33 55%, #1f5446 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -160, top: -160, width: 620, height: 620, borderRadius: 9999, border: "2px solid rgba(255,255,255,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", right: -40, top: -40, width: 380, height: 380, borderRadius: 9999, border: "2px solid rgba(255,255,255,0.12)", display: "flex" }} />
        <div style={{ position: "absolute", right: 150, top: 92, width: 22, height: 22, borderRadius: 9999, background: "#cfe7da", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 9999, background: "white", color: "#163e33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>7</div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>The Orbit 7</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#cfe7da" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 50 ? 62 : 74, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.slice(0, 4).map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 9999, border: "1.5px solid rgba(255,255,255,0.25)", fontSize: 22, color: "rgba(255,255,255,0.85)" }}>
              {t}
            </div>
          ))}
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 24, color: "rgba(255,255,255,0.7)" }}>theorbit7.com</div>
        </div>
      </div>
    ),
    ogSize,
  );
}

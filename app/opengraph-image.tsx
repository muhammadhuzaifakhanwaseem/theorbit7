import { renderOg, ogSize } from "@/lib/og";

export const alt = "The Orbit 7 — Digital agency & software house";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Digital agency & software house",
    title: "We build digital products that put brands in orbit.",
    tags: ["Web", "Mobile", "Software & AI", "Marketing"],
  });
}

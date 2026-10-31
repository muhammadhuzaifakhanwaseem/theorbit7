import { Fragment } from "react";

/**
 * Splits a heading into words that rise in on load with a stagger.
 * Pure CSS: the full text is always in the server-rendered HTML.
 * Wrap words in *asterisks* to render them in the serif accent face.
 */
export default function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  const accents = words.reduce<{ open: boolean; flags: boolean[] }>(
    (acc, raw) => {
      const open = acc.open || raw.startsWith("*");
      const closes = raw.replace(/[.,!?']+$/, "").endsWith("*");
      return { open: open && !closes, flags: [...acc.flags, open] };
    },
    { open: false, flags: [] },
  ).flags;
  return (
    <>
      {words.map((raw, i) => {
        const accent = accents[i];
        const clean = raw.replace(/\*/g, "");
        return (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] pr-[0.04em] align-bottom">
              <span className={`rise ${accent ? "accent text-brand" : ""}`} style={{ ["--i" as string]: i + start }}>
                {clean}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </>
  );
}

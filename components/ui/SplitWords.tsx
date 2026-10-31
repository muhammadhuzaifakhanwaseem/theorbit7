import { Fragment } from "react";

/**
 * Splits a heading into words that rise in on load with a stagger.
 * Pure CSS: the full text is always in the server-rendered HTML.
 * Wrap words in *asterisks* to render them in the serif accent face.
 */
export default function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  let inAccent = false;
  return (
    <>
      {words.map((raw, i) => {
        if (raw.startsWith("*")) inAccent = true;
        const accent = inAccent;
        if (raw.replace(/[.,!?']+$/, "").endsWith("*")) inAccent = false;
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

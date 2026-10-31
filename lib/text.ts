const proper = new Set(["Google", "Ads", "Flutter", "React", "Native", "Android", "Orbit"]);

/** Converts a Title Case service name for use mid-sentence, preserving acronyms and brand names. */
export function inlineTitle(title: string) {
  return title
    .split(" ")
    .map((w) => (proper.has(w) || /^[A-Z]{2,}|[a-z][A-Z]|\//.test(w) ? w : w.toLowerCase()))
    .join(" ");
}

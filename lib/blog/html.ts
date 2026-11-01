import sanitizeHtml from "sanitize-html";

/**
 * Sanitises editor HTML before it is stored. Only an allow-list of tags/attributes
 * survives, so stored content can be rendered safely with dangerouslySetInnerHTML.
 * The post title is the page's only <h1>, so editor "Heading 1" is stored as <h2 class="h1">.
 */
export function sanitizeContent(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "del", "a", "ul", "ol", "li",
      "blockquote", "pre", "code", "hr", "br", "figure", "figcaption", "img",
      "table", "thead", "tbody", "tr", "th", "td", "colgroup", "col", "mark", "sub", "sup",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      th: ["colspan", "rowspan", "colwidth"],
      td: ["colspan", "rowspan", "colwidth"],
      col: ["style"],
      code: ["class"],
      h2: ["class", "style"],
      "*": ["style"],
    },
    allowedClasses: { h2: ["h1"], code: [/^language-[a-z0-9-]+$/] },
    allowedStyles: {
      "*": { "text-align": [/^(left|right|center|justify)$/] },
      col: { "min-width": [/^\d+px$/], width: [/^\d+px$/] },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    transformTags: {
      h1: (_tag, attribs) => ({ tagName: "h2", attribs: { ...attribs, class: "h1" } }),
      a: (_tag, attribs) => {
        const href = attribs.href ?? "";
        const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?theorbit7\.com/i.test(href);
        const out: Record<string, string> = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
        return { tagName: "a", attribs: out };
      },
    },
    exclusiveFilter: (frame) => frame.tag === "img" && !/^(\/media\/[a-f0-9]{24}|https:\/\/)/.test(frame.attribs.src ?? ""),
  }).trim();
}

export function plainText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");

/** Adds heading ids (for the table of contents), lazy-loading to images and scroll wrappers to tables. */
export function prepareArticleHtml(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  let out = html.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g, (_m, tag: string, attrs: string, inner: string) => {
    const text = decode(inner.replace(/<[^>]+>/g, "")).trim();
    if (!text) return `<${tag}${attrs}>${inner}</${tag}>`;
    let id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || "section";
    const n = used.get(id) ?? 0;
    used.set(id, n + 1);
    if (n) id = `${id}-${n + 1}`;
    toc.push({ id, text, level: tag === "h2" ? 2 : 3 });
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
  out = out.replace(/<img /g, '<img loading="lazy" decoding="async" ');
  out = out.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, "</table></div>");
  return { html: out, toc };
}

/** Whitelist sanitizer for blog rich text. Works on the server and in the browser (no DOM needed). */

const ALLOWED_TAGS = new Set([
  "p", "br", "b", "strong", "i", "em", "u", "s", "strike", "a", "ul", "ol", "li",
  "h3", "h4", "span", "div", "blockquote", "font",
]);
const ALLOWED_STYLES = new Set([
  "color", "font-size", "text-align", "font-weight", "font-style", "text-decoration", "text-decoration-line",
]);

function cleanStyle(style: string) {
  return style
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => {
      const i = d.indexOf(":");
      if (i < 0) return "";
      const prop = d.slice(0, i).trim().toLowerCase();
      const val = d.slice(i + 1).trim();
      if (!ALLOWED_STYLES.has(prop)) return "";
      if (!/^[#a-z0-9.,%()\s-]+$/i.test(val) || /url|expression/i.test(val)) return "";
      return `${prop}: ${val}`;
    })
    .filter(Boolean)
    .join("; ");
}

function cleanHref(href: string) {
  const h = href.trim().replace(/&amp;/g, "&");
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(h)) return h.replace(/"/g, "%22");
  return "";
}

export function sanitizeRichText(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, rawTag: string, attrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";
      if (full.startsWith("</")) return `</${tag === "font" ? "span" : tag}>`;
      const out: string[] = [];
      const attrRx = /([a-z-]+)\s*=\s*("([^"]*)"|'([^']*)')/gi;
      let m: RegExpExecArray | null;
      let style = "";
      while ((m = attrRx.exec(attrs)) !== null) {
        const name = m[1]!.toLowerCase();
        const value = m[3] ?? m[4] ?? "";
        if (name === "href" && tag === "a") {
          const href = cleanHref(value);
          if (href) {
            out.push(`href="${href}"`);
            if (/^https?:/i.test(href)) out.push('target="_blank" rel="noopener noreferrer"');
          }
        } else if (name === "style") {
          style = cleanStyle(value);
        } else if (name === "color" && tag === "font" && /^#?[a-z0-9]+$/i.test(value)) {
          style = `color: ${value}`;
        }
      }
      if (style) out.push(`style="${style}"`);
      const name = tag === "font" ? "span" : tag;
      return `<${name}${out.length ? " " + out.join(" ") : ""}>`;
    });
}

/** True when the text contains rich (block-level or formatting) markup beyond simple links. */
export function isRichText(html: string) {
  return /<(p|ul|ol|h3|h4|b|strong|i|em|u|s|span|div|blockquote|br)\b/i.test(html);
}

export function plainText(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

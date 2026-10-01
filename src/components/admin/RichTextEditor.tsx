import { useEffect, useRef } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { sanitizeRichText } from "@/lib/rich-text";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  ariaLabel: string;
  invalid?: boolean;
};

const SIZES = [
  { label: "10pt", v: "1" },
  { label: "12pt", v: "2" },
  { label: "14pt", v: "3" },
  { label: "18pt", v: "4" },
  { label: "24pt", v: "5" },
];

export function RichTextEditor({ value, onChange, placeholder, ariaLabel, invalid }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  function emit() {
    const el = ref.current;
    if (!el) return;
    const html = el.innerHTML === "<br>" ? "" : el.innerHTML;
    onChange(sanitizeRichText(html));
  }

  function cmd(name: string, arg?: string) {
    ref.current?.focus();
    document.execCommand("styleWithCSS", false, name === "fontSize" ? "false" : "true");
    document.execCommand(name, false, arg);
    emit();
  }

  function addLink() {
    const url = window.prompt("Link address (e.g. /pricing or https://…)");
    if (!url) return;
    cmd("createLink", url.trim());
  }

  const btn =
    "grid size-8 place-items-center rounded-md text-stone-700 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange";
  const sep = <span aria-hidden="true" className="mx-1 h-5 w-px bg-stone-200" />;
  const keep = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white ${
        invalid ? "border-red-400 ring-2 ring-red-100" : "border-stone-900/10 focus-within:border-stone-400"
      }`}
    >
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap items-center gap-0.5 border-b border-stone-900/10 bg-stone-50/70 px-2 py-1.5"
        onMouseDown={keep}
      >
        <button type="button" className={btn} title="Bold" aria-label="Bold" onClick={() => cmd("bold")}>
          <Bold className="size-4" />
        </button>
        <button type="button" className={btn} title="Italic" aria-label="Italic" onClick={() => cmd("italic")}>
          <Italic className="size-4" />
        </button>
        <button type="button" className={btn} title="Underline" aria-label="Underline" onClick={() => cmd("underline")}>
          <Underline className="size-4" />
        </button>
        <button type="button" className={btn} title="Strikethrough" aria-label="Strikethrough" onClick={() => cmd("strikeThrough")}>
          <Strikethrough className="size-4" />
        </button>
        <label className={`${btn} relative cursor-pointer`} title="Text colour">
          <span className="text-sm font-bold underline decoration-2">A</span>
          <input
            type="color"
            aria-label="Text colour"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => cmd("foreColor", e.target.value)}
          />
        </label>
        <button type="button" className={btn} title="Clear formatting" aria-label="Clear formatting" onClick={() => cmd("removeFormat")}>
          <RemoveFormatting className="size-4" />
        </button>
        {sep}
        <button type="button" className={btn} title="Align left" aria-label="Align left" onClick={() => cmd("justifyLeft")}>
          <AlignLeft className="size-4" />
        </button>
        <button type="button" className={btn} title="Align center" aria-label="Align center" onClick={() => cmd("justifyCenter")}>
          <AlignCenter className="size-4" />
        </button>
        <button type="button" className={btn} title="Align right" aria-label="Align right" onClick={() => cmd("justifyRight")}>
          <AlignRight className="size-4" />
        </button>
        <button type="button" className={btn} title="Justify" aria-label="Justify" onClick={() => cmd("justifyFull")}>
          <AlignJustify className="size-4" />
        </button>
        {sep}
        <button type="button" className={btn} title="Insert link" aria-label="Insert link" onClick={addLink}>
          <Link2 className="size-4" />
        </button>
        <button type="button" className={btn} title="Remove link" aria-label="Remove link" onClick={() => cmd("unlink")}>
          <Link2Off className="size-4" />
        </button>
        {sep}
        <select
          aria-label="Text style"
          defaultValue="p"
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            cmd("formatBlock", `<${e.target.value}>`);
            e.target.value = "p";
          }}
          className="h-8 rounded-md border border-stone-200 bg-white px-2 text-sm"
        >
          <option value="p">Paragraph</option>
          <option value="h3">Heading</option>
          <option value="h4">Subheading</option>
          <option value="blockquote">Quote</option>
        </select>
        <select
          aria-label="Font size"
          defaultValue=""
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            if (e.target.value) cmd("fontSize", e.target.value);
            e.target.value = "";
          }}
          className="h-8 rounded-md border border-stone-200 bg-white px-2 text-sm"
        >
          <option value="">Size</option>
          {SIZES.map((s) => (
            <option key={s.v} value={s.v}>
              {s.label}
            </option>
          ))}
        </select>
        {sep}
        <button type="button" className={btn} title="Bullet list" aria-label="Bullet list" onClick={() => cmd("insertUnorderedList")}>
          <List className="size-4" />
        </button>
        <button type="button" className={btn} title="Numbered list" aria-label="Numbered list" onClick={() => cmd("insertOrderedList")}>
          <ListOrdered className="size-4" />
        </button>
        {sep}
        <button type="button" className={btn} title="Undo" aria-label="Undo" onClick={() => cmd("undo")}>
          <Undo2 className="size-4" />
        </button>
        <button type="button" className={btn} title="Redo" aria-label="Redo" onClick={() => cmd("redo")}>
          <Redo2 className="size-4" />
        </button>
      </div>
      <div
        ref={ref}
        role="textbox"
        aria-multiline="true"
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
        className="rte-body min-h-[160px] px-4 py-3 text-[0.95rem] leading-7 text-stone-800 outline-none"
      />
    </div>
  );
}

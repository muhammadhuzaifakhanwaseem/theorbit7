"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  Table as TableIcon,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  Underline,
  Undo2,
  Unlink,
} from "lucide-react";
import { Figure } from "./FigureNode";
import { uploadImage } from "@/lib/upload-client";
import { cn } from "@/lib/utils";

export interface EditorChange {
  json: unknown;
  html: string;
  words: number;
  text: string;
}

function Btn({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-ink-2 transition-colors disabled:cursor-not-allowed disabled:opacity-35",
        active ? "bg-brand text-white" : "hover:bg-mint-50 hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}

const Sep = () => <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-line-strong" />;

function LinkPopover({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const [url, setUrl] = useState<string>(editor.getAttributes("link").href ?? "");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const apply = () => {
    const v = url.trim();
    if (!v) editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else {
      const href = /^(https?:|mailto:|tel:|\/|#)/i.test(v) ? v : `https://${v}`;
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    onClose();
  };
  return (
    <div className="absolute left-1/2 top-full z-30 mt-2 flex w-[min(26rem,90vw)] -translate-x-1/2 gap-2 rounded-2xl border border-line bg-white p-2 shadow-lift">
      <input
        ref={ref}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            apply();
          }
          if (e.key === "Escape") onClose();
        }}
        placeholder="Paste a link, e.g. /services/seo-services or https://…"
        className="min-w-0 flex-1 rounded-xl border border-line-strong px-3 py-2 text-sm outline-none focus:border-brand"
        aria-label="Link URL"
      />
      <button type="button" onClick={apply} className="cursor-pointer rounded-xl bg-brand px-3 text-sm font-medium text-white">
        Apply
      </button>
    </div>
  );
}

function toolbarState(e: Editor) {
  return {
    p: e.isActive("paragraph"),
    h1: e.isActive("heading", { level: 1 }),
    h2: e.isActive("heading", { level: 2 }),
    h3: e.isActive("heading", { level: 3 }),
    bold: e.isActive("bold"),
    italic: e.isActive("italic"),
    underline: e.isActive("underline"),
    strike: e.isActive("strike"),
    code: e.isActive("code"),
    left: e.isActive({ textAlign: "left" }),
    center: e.isActive({ textAlign: "center" }),
    right: e.isActive({ textAlign: "right" }),
    justify: e.isActive({ textAlign: "justify" }),
    ul: e.isActive("bulletList"),
    ol: e.isActive("orderedList"),
    quote: e.isActive("blockquote"),
    codeBlock: e.isActive("codeBlock"),
    link: e.isActive("link"),
    table: e.isActive("table"),
    canUndo: e.can().undo(),
    canRedo: e.can().redo(),
    words: e.storage.characterCount?.words?.() ?? 0,
  };
}

export default function RichEditor({
  initialContent,
  onChange,
  onUploadError,
}: {
  initialContent: unknown;
  onChange: (c: EditorChange) => void;
  onUploadError?: (msg: string) => void;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);

  const insertFiles = useCallback(
    async (files: File[], pos?: number) => {
      const images = files.filter((f) => f.type.startsWith("image/"));
      if (!images.length || !editorRef.current) return false;
      setUploading(true);
      try {
        for (const file of images) {
          const m = await uploadImage(file);
          const attrs = { src: m.url, width: m.width, height: m.height, alt: "", caption: "" };
          const ed = editorRef.current;
          if (pos !== undefined) ed.chain().focus().insertContentAt(pos, { type: "figure", attrs }).run();
          else ed.chain().focus().setFigure(attrs).run();
        }
      } catch (e) {
        onUploadError?.((e as Error).message);
      } finally {
        setUploading(false);
      }
      return true;
    },
    [onUploadError],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https", HTMLAttributes: { rel: null, target: null } },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Figure,
      CharacterCount,
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading" ? "Heading" : "Start writing… Use the toolbar to add headings, lists, images and tables.",
      }),
    ],
    content: (initialContent as object) ?? "",
    editorProps: {
      attributes: { class: "prose-orbit editor-surface", "aria-label": "Post content", role: "textbox", "aria-multiline": "true" },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []);
        if (files.some((f) => f.type.startsWith("image/"))) {
          void insertFiles(files);
          return true;
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved) return false;
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (!files.some((f) => f.type.startsWith("image/"))) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        void insertFiles(files, pos);
        return true;
      },
      handleKeyDown: (_view, event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          setLinkOpen(true);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange({ json: editor.getJSON(), html: editor.getHTML(), words: editor.storage.characterCount.words(), text: editor.getText() });
    },
    onCreate: ({ editor }) => {
      editorRef.current = editor;
      onChange({ json: editor.getJSON(), html: editor.getHTML(), words: editor.storage.characterCount.words(), text: editor.getText() });
    },
  });

  const selected = useEditorState({ editor, selector: ({ editor: e }) => (e ? toolbarState(e) : null) });
  // useEditorState can stay bound to the initial (null) editor until the first transaction,
  // so fall back to reading the live editor directly.
  const st = selected ?? (editor ? toolbarState(editor) : null);

  if (!editor || !st) {
    return <div className="min-h-[28rem] animate-pulse rounded-3xl border border-line bg-white" aria-hidden="true" />;
  }
  const c = () => editor.chain().focus();

  return (
    <div className="rounded-3xl border border-line bg-white">
      <div className="sticky top-0 z-20 rounded-t-3xl border-b border-line bg-white/95 backdrop-blur">
        <div role="toolbar" aria-label="Formatting" className="relative flex flex-wrap items-center gap-0.5 px-3 py-2">
          <Btn label="Paragraph" active={st.p} onClick={() => c().setParagraph().run()}>
            <Pilcrow className="size-4" />
          </Btn>
          <Btn label="Heading 1 (section title)" active={st.h1} onClick={() => c().toggleHeading({ level: 1 }).run()}>
            <Heading1 className="size-4" />
          </Btn>
          <Btn label="Heading 2" active={st.h2} onClick={() => c().toggleHeading({ level: 2 }).run()}>
            <Heading2 className="size-4" />
          </Btn>
          <Btn label="Heading 3" active={st.h3} onClick={() => c().toggleHeading({ level: 3 }).run()}>
            <Heading3 className="size-4" />
          </Btn>
          <Sep />
          <Btn label="Bold (Ctrl+B)" active={st.bold} onClick={() => c().toggleBold().run()}>
            <Bold className="size-4" />
          </Btn>
          <Btn label="Italic (Ctrl+I)" active={st.italic} onClick={() => c().toggleItalic().run()}>
            <Italic className="size-4" />
          </Btn>
          <Btn label="Underline (Ctrl+U)" active={st.underline} onClick={() => c().toggleUnderline().run()}>
            <Underline className="size-4" />
          </Btn>
          <Btn label="Strikethrough" active={st.strike} onClick={() => c().toggleStrike().run()}>
            <Strikethrough className="size-4" />
          </Btn>
          <Btn label="Inline code" active={st.code} onClick={() => c().toggleCode().run()}>
            <Code className="size-4" />
          </Btn>
          <Sep />
          <Btn label="Align left" active={st.left} onClick={() => c().setTextAlign("left").run()}>
            <TextAlignStart className="size-4" />
          </Btn>
          <Btn label="Align centre" active={st.center} onClick={() => c().setTextAlign("center").run()}>
            <TextAlignCenter className="size-4" />
          </Btn>
          <Btn label="Align right" active={st.right} onClick={() => c().setTextAlign("right").run()}>
            <TextAlignEnd className="size-4" />
          </Btn>
          <Btn label="Justify" active={st.justify} onClick={() => c().setTextAlign("justify").run()}>
            <TextAlignJustify className="size-4" />
          </Btn>
          <Sep />
          <Btn label="Bullet list" active={st.ul} onClick={() => c().toggleBulletList().run()}>
            <List className="size-4" />
          </Btn>
          <Btn label="Numbered list" active={st.ol} onClick={() => c().toggleOrderedList().run()}>
            <ListOrdered className="size-4" />
          </Btn>
          <Btn label="Quote" active={st.quote} onClick={() => c().toggleBlockquote().run()}>
            <Quote className="size-4" />
          </Btn>
          <Btn label="Code block" active={st.codeBlock} onClick={() => c().toggleCodeBlock().run()}>
            <SquareCode className="size-4" />
          </Btn>
          <Sep />
          <span className="relative">
            <Btn label="Add link (Ctrl+K)" active={st.link} onClick={() => setLinkOpen((v) => !v)}>
              <LinkIcon className="size-4" />
            </Btn>
            {linkOpen && <LinkPopover editor={editor} onClose={() => setLinkOpen(false)} />}
          </span>
          <Btn label="Remove link" disabled={!st.link} onClick={() => c().extendMarkRange("link").unsetLink().run()}>
            <Unlink className="size-4" />
          </Btn>
          <Btn label="Insert image" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
          </Btn>
          <Btn label="Insert table" active={st.table} onClick={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
            <TableIcon className="size-4" />
          </Btn>
          <Btn label="Divider" onClick={() => c().setHorizontalRule().run()}>
            <Minus className="size-4" />
          </Btn>
          <Sep />
          <Btn label="Clear formatting" onClick={() => c().unsetAllMarks().clearNodes().run()}>
            <RemoveFormatting className="size-4" />
          </Btn>
          <Btn label="Undo (Ctrl+Z)" disabled={!st.canUndo} onClick={() => c().undo().run()}>
            <Undo2 className="size-4" />
          </Btn>
          <Btn label="Redo (Ctrl+Shift+Z)" disabled={!st.canRedo} onClick={() => c().redo().run()}>
            <Redo2 className="size-4" />
          </Btn>
          <span className="ml-auto pl-3 font-mono text-[0.7rem] text-soft">{st.words.toLocaleString()} words</span>
        </div>
        {st.table && (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-line bg-mint-50 px-3 py-2 text-xs">
            <span className="mr-1 font-medium text-brand">Table:</span>
            {(
              [
                ["+ Row above", () => c().addRowBefore().run()],
                ["+ Row below", () => c().addRowAfter().run()],
                ["+ Column left", () => c().addColumnBefore().run()],
                ["+ Column right", () => c().addColumnAfter().run()],
                ["Toggle header row", () => c().toggleHeaderRow().run()],
                ["Delete row", () => c().deleteRow().run()],
                ["Delete column", () => c().deleteColumn().run()],
                ["Delete table", () => c().deleteTable().run()],
              ] as const
            ).map(([l, fn]) => (
              <button
                key={l}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={fn}
                className={cn(
                  "cursor-pointer rounded-lg border bg-white px-2.5 py-1 transition-colors",
                  l.startsWith("Delete") ? "border-[#f0c9c0] text-[#a3341f] hover:bg-[#fbeae6]" : "border-line-strong text-ink-2 hover:border-brand hover:text-brand",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          void insertFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
      <EditorContent editor={editor} className="px-6 py-8 sm:px-12 sm:py-12" />
    </div>
  );
}

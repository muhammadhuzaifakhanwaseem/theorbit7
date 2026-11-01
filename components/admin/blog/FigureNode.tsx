"use client";

import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react";
import { Trash } from "lucide-react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      setFigure: (attrs: { src: string; alt?: string; caption?: string; width?: number; height?: number }) => ReturnType;
    };
  }
}

function FigureView({ node, updateAttributes, deleteNode, selected }: ReactNodeViewProps) {
  const { src, alt, caption, width, height } = node.attrs as { src: string; alt: string; caption: string; width: number; height: number };
  return (
    <NodeViewWrapper as="figure" className={`editor-figure ${selected ? "is-selected" : ""}`} data-drag-handle>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width || undefined} height={height || undefined} draggable={false} />
      <div className="editor-figure-fields" contentEditable={false}>
        <input
          value={caption ?? ""}
          onChange={(e) => updateAttributes({ caption: e.target.value })}
          placeholder="Add a caption (optional)"
          className="editor-figure-caption"
          aria-label="Image caption"
        />
        <div className="flex items-center gap-2">
          <input
            value={alt ?? ""}
            onChange={(e) => updateAttributes({ alt: e.target.value })}
            placeholder="Alt text — describe the image for SEO & accessibility"
            className={`editor-figure-alt ${alt ? "" : "is-missing"}`}
            aria-label="Image alt text"
          />
          <button type="button" onClick={deleteNode} className="editor-figure-delete" aria-label="Remove image" title="Remove image">
            <Trash className="size-4" />
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
}

/** Block image with alt text and an optional caption, serialised as <figure><img><figcaption>. */
export const Figure = Node.create({
  name: "figure",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      caption: { default: "" },
      width: { default: null },
      height: { default: null },
    };
  },
  parseHTML() {
    return [
      {
        tag: "figure",
        getAttrs: (el) => {
          const img = (el as HTMLElement).querySelector("img");
          if (!img) return false;
          return {
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt") ?? "",
            width: Number(img.getAttribute("width")) || null,
            height: Number(img.getAttribute("height")) || null,
            caption: (el as HTMLElement).querySelector("figcaption")?.textContent ?? "",
          };
        },
      },
      {
        tag: "img[src]",
        getAttrs: (el) => ({
          src: (el as HTMLElement).getAttribute("src"),
          alt: (el as HTMLElement).getAttribute("alt") ?? "",
          width: Number((el as HTMLElement).getAttribute("width")) || null,
          height: Number((el as HTMLElement).getAttribute("height")) || null,
        }),
      },
    ];
  },
  renderHTML({ node }) {
    const { src, alt, caption, width, height } = node.attrs;
    const img = ["img", mergeAttributes({ src, alt: alt || "" }, width ? { width } : {}, height ? { height } : {})];
    return caption ? ["figure", {}, img, ["figcaption", {}, caption]] : ["figure", {}, img];
  },
  addCommands() {
    return {
      setFigure:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(FigureView);
  },
});

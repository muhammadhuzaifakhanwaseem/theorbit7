"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash } from "lucide-react";
import type { MediaRef } from "@/lib/blog/shared";
import { uploadImage } from "@/lib/upload-client";
import { cn } from "@/lib/utils";

/** Upload / replace / remove a single image. Optionally mirrors the value into a hidden input for <form> actions. */
export default function ImageField({
  value,
  onChange,
  name,
  aspect = "aspect-[16/9]",
  label = "Upload image",
  hint,
}: {
  value: MediaRef | null;
  onChange?: (m: MediaRef | null) => void;
  name?: string;
  aspect?: string;
  label?: string;
  hint?: string;
}) {
  const [img, setImg] = useState<MediaRef | null>(value);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const set = (m: MediaRef | null) => {
    setImg(m);
    onChange?.(m);
  };

  async function pick(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      set(await uploadImage(file));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {name && <input type="hidden" name={name} value={img ? JSON.stringify(img) : ""} />}
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-dashed border-line-strong bg-paper transition-colors",
          aspect,
          !img && "hover:border-brand hover:bg-mint-50",
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void pick(e.dataTransfer.files?.[0]);
        }}
      >
        {img ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-2 bottom-2 flex justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              <button type="button" onClick={() => ref.current?.click()} className="cursor-pointer rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-medium text-ink shadow-soft">
                Replace
              </button>
              <button type="button" onClick={() => set(null)} className="flex cursor-pointer items-center rounded-lg bg-white/95 px-2 py-1.5 text-[#a3341f] shadow-soft" aria-label="Remove image">
                <Trash className="size-3.5" />
              </button>
            </div>
          </>
        ) : (
          <button type="button" onClick={() => ref.current?.click()} className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 text-sm text-muted">
            {busy ? <Loader2 className="size-5 animate-spin text-brand" /> : <ImagePlus className="size-5 text-brand" />}
            <span className="font-medium text-ink-2">{busy ? "Uploading…" : label}</span>
            <span className="text-xs">Drop an image or click · JPG, PNG, WebP</span>
          </button>
        )}
        {busy && img && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/60">
            <Loader2 className="size-5 animate-spin text-brand" />
          </span>
        )}
      </div>
      <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={(e) => { void pick(e.target.files?.[0]); e.target.value = ""; }} />
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && <p role="alert" className="mt-1.5 text-xs text-[#a3341f]">{error}</p>}
    </div>
  );
}

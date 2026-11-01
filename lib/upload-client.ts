import type { MediaRef } from "@/lib/blog/shared";

/** Downscale very large photos in the browser so uploads stay under the 4MB request limit. */
async function shrink(file: File): Promise<Blob> {
  if (file.type === "image/gif" || file.size < 3 * 1024 * 1024) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2400 / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b ?? file), "image/webp", 0.88));
}

export async function uploadImage(file: File): Promise<MediaRef> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") throw new Error("Please choose a JPG, PNG, WebP, AVIF or GIF image.");
  const blob = await shrink(file);
  const fd = new FormData();
  fd.append("file", blob instanceof File ? blob : new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: blob.type }));
  const res = await fetch("/api/admin/media", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Upload failed.");
  return json as MediaRef;
}

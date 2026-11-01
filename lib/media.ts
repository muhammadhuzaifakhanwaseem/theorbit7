import "server-only";
import { GridFSBucket, ObjectId } from "mongodb";
import sharp from "sharp";
import { getDb } from "./mongodb";
import type { MediaRef } from "./blog/shared";

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // Vercel request body limit is ~4.5MB
const ACCEPTED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

function bucket() {
  const db = getDb();
  if (!db) throw new Error("MONGODB_URI is not configured.");
  return new GridFSBucket(db, { bucketName: "media" });
}

/** Re-encodes an upload to WebP (max 2000px wide) and stores it in MongoDB GridFS. */
export async function storeImage(file: File, uploadedBy: string): Promise<MediaRef> {
  if (!ACCEPTED.has(file.type)) throw new Error("Unsupported image type. Use JPG, PNG, WebP, AVIF or GIF.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image is larger than 4MB.");
  const input = Buffer.from(await file.arrayBuffer());
  const { data, info } = await sharp(input, { animated: false })
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer({ resolveWithObject: true });

  const id = new ObjectId();
  await new Promise<void>((resolve, reject) => {
    const stream = bucket().openUploadStreamWithId(id, `${id}.webp`, {
      metadata: { contentType: "image/webp", width: info.width, height: info.height, originalName: file.name.slice(0, 200), uploadedBy },
    });
    stream.on("error", reject).on("finish", () => resolve());
    stream.end(data);
  });
  return { url: `/media/${id.toString()}`, width: info.width, height: info.height };
}

export async function readImage(id: string) {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  const b = bucket();
  const _id = new ObjectId(id);
  const file = await b.find({ _id }).next();
  if (!file) return null;
  const chunks: Buffer[] = [];
  for await (const chunk of b.openDownloadStream(_id)) chunks.push(chunk as Buffer);
  return { data: Buffer.concat(chunks), contentType: (file.metadata?.contentType as string) ?? "image/webp" };
}

import { readImage } from "@/lib/media";

/** Serves images uploaded through the admin CMS (stored in MongoDB GridFS). Ids are immutable. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const img = await readImage(id);
    if (!img) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(img.data), {
      headers: {
        "Content-Type": img.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  } catch (e) {
    console.error("media read failed", e);
    return new Response("Unavailable", { status: 503 });
  }
}

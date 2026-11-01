import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { storeImage } from "@/lib/media";

/** Image upload for the blog CMS. Admin session required. */
export async function POST(req: Request) {
  const user = await getCurrentUser().catch(() => null);
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file received." }, { status: 400 });
  try {
    return NextResponse.json(await storeImage(file, user.username));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || "Upload failed." }, { status: 422 });
  }
}

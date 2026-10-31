import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

/**
 * Database diagnostics for the contact form / admin panel.
 * Reports only booleans and error categories — never the connection string or credentials.
 */
export async function GET() {
  const uri = process.env.MONGODB_URI ?? "";
  const result: Record<string, unknown> = {
    mongodbUriSet: uri.length > 0,
    uriScheme: uri ? uri.split("://")[0] : null,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  };
  if (!uri) {
    result.hint = "MONGODB_URI is not set for this environment. Add it in Vercel → Settings → Environment Variables, then redeploy.";
    return NextResponse.json(result, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  try {
    const client = getMongoClient()!;
    await client.db(process.env.MONGODB_DB || "theorbit7").command({ ping: 1 });
    result.connected = true;
    result.writable = !!(await client
      .db(process.env.MONGODB_DB || "theorbit7")
      .collection("_health")
      .updateOne({ _id: "ping" as unknown as never }, { $set: { at: new Date() } }, { upsert: true })).acknowledged;
  } catch (e) {
    const err = e as Error & { code?: number; codeName?: string };
    result.connected = false;
    result.errorType = err.name;
    result.errorCode = err.codeName ?? err.code ?? null;
    const msg = (err.message || "").toLowerCase();
    result.hint = msg.includes("auth")
      ? "Authentication failed: the username/password in MONGODB_URI is wrong or the database user lacks permissions."
      : err.name === "MongoServerSelectionError" || msg.includes("timed out") || msg.includes("whitelist") || msg.includes("ip")
        ? "Cannot reach the cluster: in MongoDB Atlas → Network Access, allow 0.0.0.0/0 (Vercel uses dynamic IPs)."
        : err.name === "MongoParseError" || err.name === "MongoAPIError"
          ? "MONGODB_URI is malformed. Re-copy it from the Vercel integration or Atlas → Connect."
          : "Unexpected database error — check Vercel → Logs for /api/health.";
  }
  return NextResponse.json(result, { status: result.connected ? 200 : 500, headers: { "Cache-Control": "no-store" } });
}

import "server-only";
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number, opts: object) => Promise<Buffer>;
const SCRYPT = { N: 16384, r: 8, p: 1 };

export const SESSION_COOKIE = "o7_admin";
const SESSION_DAYS = 7;

export type Role = "admin" | "member";
export interface AdminUser {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  createdBy?: string;
}

/**
 * First admin account, created automatically the first time the users collection is empty.
 * Only a salted scrypt hash is stored here — never the plain password.
 */
const BOOTSTRAP_ADMIN = {
  username: "theorbit7",
  passwordHash: "scrypt$c0f460a21b741857e73aec17df49c5a6$3cd86470bd8fcd20560e44f604b2fbf261ee9c22645dae72a3b6f3600e4844165931247f5df1eeb3c9d6a8ead5001192573cf9fc0c1afe545f4b44a16c3ccad3",
};

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64, SCRYPT);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algo, saltHex, hashHex] = stored.split("$");
  if (algo !== "scrypt" || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length, SCRYPT);
  return timingSafeEqual(actual, expected);
}

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export function requireDb() {
  const db = getDb();
  if (!db) throw new Error("MONGODB_URI is not configured.");
  return db;
}

let indexesReady = false;
async function ensureSetup() {
  const db = requireDb();
  if (!indexesReady) {
    await Promise.all([
      db.collection("admin_users").createIndex({ username: 1 }, { unique: true }),
      db.collection("admin_sessions").createIndex({ tokenHash: 1 }, { unique: true }),
      db.collection("admin_sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      db.collection("admin_login_attempts").createIndex({ at: 1 }, { expireAfterSeconds: 60 * 60 }),
      db.collection("submissions").createIndex({ createdAt: -1 }),
    ]);
    indexesReady = true;
  }
  const users = db.collection<Omit<AdminUser, "_id">>("admin_users");
  if ((await users.estimatedDocumentCount()) === 0) {
    await users
      .insertOne({ ...BOOTSTRAP_ADMIN, role: "admin", createdAt: new Date(), createdBy: "system" })
      .catch(() => undefined); // another instance may have inserted it concurrently
  }
  return db;
}

async function clientIp() {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
}

/** Returns an error message, or null on success (session cookie set). */
export async function login(username: string, password: string): Promise<string | null> {
  const db = await ensureSetup();
  const ip = await clientIp();
  const attempts = db.collection("admin_login_attempts");
  const recentFailures = await attempts.countDocuments({ ip, at: { $gte: new Date(Date.now() - 15 * 60 * 1000) } });
  if (recentFailures >= 10) return "Too many failed attempts. Please wait 15 minutes and try again.";

  const user = await db.collection<AdminUser>("admin_users").findOne({ username: username.trim().toLowerCase() });
  const ok = user ? await verifyPassword(password, user.passwordHash) : false;
  if (!user || !ok) {
    await attempts.insertOne({ ip, username: username.slice(0, 80), at: new Date() });
    return "Incorrect username or password.";
  }

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.collection("admin_sessions").insertOne({ tokenHash: sha256(token), userId: user._id, expiresAt, createdAt: new Date(), ip });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return null;
}

export async function logout() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await getDb()?.collection("admin_sessions").deleteOne({ tokenHash: sha256(token) });
  jar.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const db = await ensureSetup();
  const session = await db.collection("admin_sessions").findOne({ tokenHash: sha256(token), expiresAt: { $gt: new Date() } });
  if (!session) return null;
  return db.collection<AdminUser>("admin_users").findOne({ _id: session.userId });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/admin");
  return user;
}

export function validateNewPassword(pw: string) {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return "Password must contain letters and numbers.";
  return null;
}

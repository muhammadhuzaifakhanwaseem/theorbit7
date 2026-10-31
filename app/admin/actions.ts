"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import {
  hashPassword,
  login,
  logout,
  requireAdmin,
  requireDb,
  requireUser,
  validateNewPassword,
  verifyPassword,
  type AdminUser,
  type Role,
} from "@/lib/auth";
import { INQUIRY_STATUSES, type InquiryStatus } from "@/lib/inquiries";

export type FormState = { error?: string; success?: string } | undefined;

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const toId = (v: string) => (ObjectId.isValid(v) ? new ObjectId(v) : null);

export async function loginAction(_: FormState, fd: FormData): Promise<FormState> {
  const username = str(fd, "username");
  const password = String(fd.get("password") ?? "");
  if (!username || !password) return { error: "Enter your username and password." };
  let error: string | null;
  try {
    error = await login(username, password);
  } catch (e) {
    console.error(e);
    return { error: "The database is not reachable. Check MONGODB_URI." };
  }
  if (error) return { error };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export async function updateInquiryStatus(fd: FormData) {
  const user = await requireUser();
  const id = toId(str(fd, "id"));
  const status = str(fd, "status") as InquiryStatus;
  if (!id || !INQUIRY_STATUSES.includes(status)) return;
  await requireDb()
    .collection("submissions")
    .updateOne({ _id: id }, { $set: { status, updatedAt: new Date(), updatedBy: user.username } });
  revalidatePath("/admin");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function saveInquiryNote(fd: FormData) {
  const user = await requireUser();
  const id = toId(str(fd, "id"));
  if (!id) return;
  await requireDb()
    .collection("submissions")
    .updateOne({ _id: id }, { $set: { note: str(fd, "note").slice(0, 5000), updatedAt: new Date(), updatedBy: user.username } });
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function deleteInquiry(fd: FormData) {
  await requireAdmin();
  const id = toId(str(fd, "id"));
  if (id) await requireDb().collection("submissions").deleteOne({ _id: id });
  revalidatePath("/admin");
  redirect("/admin");
}

export async function createUserAction(_: FormState, fd: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const username = str(fd, "username").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const role: Role = str(fd, "role") === "admin" ? "admin" : "member";
  if (!/^[a-z0-9._-]{3,32}$/.test(username))
    return { error: "Username must be 3–32 characters: letters, numbers, dot, dash or underscore." };
  const pwError = validateNewPassword(password);
  if (pwError) return { error: pwError };
  try {
    await requireDb()
      .collection("admin_users")
      .insertOne({ username, passwordHash: await hashPassword(password), role, createdAt: new Date(), createdBy: admin.username });
  } catch (e) {
    if ((e as { code?: number }).code === 11000) return { error: `The username "${username}" is already taken.` };
    throw e;
  }
  revalidatePath("/admin/users");
  return { success: `User "${username}" created as ${role}.` };
}

export async function deleteUserAction(fd: FormData) {
  const admin = await requireAdmin();
  const id = toId(str(fd, "id"));
  if (!id || id.equals(admin._id)) return;
  const db = requireDb();
  const users = db.collection<AdminUser>("admin_users");
  const target = await users.findOne({ _id: id });
  if (!target) return;
  if (target.role === "admin" && (await users.countDocuments({ role: "admin" })) <= 1) return;
  await users.deleteOne({ _id: id });
  await db.collection("admin_sessions").deleteMany({ userId: id });
  revalidatePath("/admin/users");
}

export async function changePasswordAction(_: FormState, fd: FormData): Promise<FormState> {
  const user = await requireUser();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  const confirm = String(fd.get("confirm") ?? "");
  if (!(await verifyPassword(current, user.passwordHash))) return { error: "Your current password is incorrect." };
  if (next !== confirm) return { error: "The new passwords do not match." };
  const pwError = validateNewPassword(next);
  if (pwError) return { error: pwError };
  await requireDb()
    .collection("admin_users")
    .updateOne({ _id: user._id }, { $set: { passwordHash: await hashPassword(next), passwordChangedAt: new Date() } });
  return { success: "Password updated." };
}

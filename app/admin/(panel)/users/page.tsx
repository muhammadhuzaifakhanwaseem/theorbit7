import { requireAdmin, requireDb, type AdminUser } from "@/lib/auth";
import { createUserAction, deleteUserAction } from "../../actions";
import { ActionForm, SubmitButton, inputCls, labelCls } from "@/components/admin/forms";
import { cn } from "@/lib/utils";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default async function UsersPage() {
  const me = await requireAdmin();
  const users = await requireDb().collection<AdminUser>("admin_users").find({}, { projection: { passwordHash: 0 } }).sort({ createdAt: 1 }).toArray();
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <>
      <h1 className="text-3xl font-semibold">Users</h1>
      <p className="mt-1 text-sm text-muted">Only administrators can create and remove accounts. There is no public sign-up.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-line bg-white" aria-label="Existing users">
          <ul className="divide-y divide-line">
            {users.map((u) => {
              const self = u._id.equals(me._id);
              const lastAdmin = u.role === "admin" && adminCount <= 1;
              return (
                <li key={u._id.toString()} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="font-medium">
                      {u.username} {self && <span className="text-xs font-normal text-muted">(you)</span>}
                    </p>
                    <p className="text-xs text-muted">
                      <span className={cn("mr-2 inline-flex rounded-full px-2 py-0.5 font-medium capitalize", u.role === "admin" ? "bg-brand text-white" : "bg-mint-100 text-brand")}>{u.role}</span>
                      Added {u.createdAt ? fmt.format(new Date(u.createdAt)) : "—"}
                      {u.createdBy ? ` by ${u.createdBy}` : ""}
                    </p>
                  </div>
                  {!self && !lastAdmin && (
                    <form action={deleteUserAction}>
                      <input type="hidden" name="id" value={u._id.toString()} />
                      <SubmitButton variant="ghost" className="min-h-9 text-xs">
                        Remove
                      </SubmitButton>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6" aria-labelledby="new-user">
          <h2 id="new-user" className="text-lg font-semibold">Create a user</h2>
          <p className="mt-1 mb-5 text-sm text-muted">Share the username and password with the person securely.</p>
          <ActionForm action={createUserAction} resetOnSuccess>
            <div>
              <label htmlFor="nu-username" className={labelCls}>Username</label>
              <input id="nu-username" name="username" required autoComplete="off" className={inputCls} />
            </div>
            <div>
              <label htmlFor="nu-password" className={labelCls}>Password</label>
              <input id="nu-password" name="password" type="password" required autoComplete="new-password" className={inputCls} />
              <p className="mt-1 text-xs text-muted">At least 8 characters, including letters and numbers.</p>
            </div>
            <div>
              <label htmlFor="nu-role" className={labelCls}>Role</label>
              <select id="nu-role" name="role" defaultValue="member" className={inputCls}>
                <option value="member">Member — can view and update inquiries</option>
                <option value="admin">Admin — can also delete inquiries and manage users</option>
              </select>
            </div>
            <SubmitButton>Create user</SubmitButton>
          </ActionForm>
        </section>
      </div>
    </>
  );
}

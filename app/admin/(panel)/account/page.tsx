import { requireUser } from "@/lib/auth";
import { changePasswordAction } from "../../actions";
import { ActionForm, SubmitButton, inputCls, labelCls } from "@/components/admin/forms";

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <>
      <h1 className="text-3xl font-semibold">My account</h1>
      <p className="mt-1 text-sm text-muted">
        Signed in as <strong className="text-ink">{user.username}</strong> ({user.role})
      </p>
      <section className="mt-8 max-w-md rounded-2xl border border-line bg-white p-6" aria-labelledby="pw">
        <h2 id="pw" className="text-lg font-semibold">Change password</h2>
        <ActionForm action={changePasswordAction} resetOnSuccess className="mt-5">
          <div>
            <label htmlFor="current" className={labelCls}>Current password</label>
            <input id="current" name="current" type="password" required autoComplete="current-password" className={inputCls} />
          </div>
          <div>
            <label htmlFor="next" className={labelCls}>New password</label>
            <input id="next" name="next" type="password" required autoComplete="new-password" className={inputCls} />
          </div>
          <div>
            <label htmlFor="confirm" className={labelCls}>Confirm new password</label>
            <input id="confirm" name="confirm" type="password" required autoComplete="new-password" className={inputCls} />
          </div>
          <SubmitButton>Update password</SubmitButton>
        </ActionForm>
      </section>
    </>
  );
}

import { redirect } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { ActionForm, SubmitButton, inputCls, labelCls } from "@/components/admin/forms";
import { loginAction } from "../actions";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect("/admin");

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-5 py-16">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/70 blur-[110px]" />
      </div>
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="glass mt-8 rounded-3xl p-7 sm:p-8">
          <h1 className="text-2xl font-semibold">Admin sign in</h1>
          <p className="mt-1 mb-6 text-sm text-muted">View and manage website inquiries.</p>
          <ActionForm action={loginAction}>
            <div>
              <label htmlFor="username" className={labelCls}>
                Username
              </label>
              <input id="username" name="username" autoComplete="username" required autoFocus className={inputCls} />
            </div>
            <div>
              <label htmlFor="password" className={labelCls}>
                Password
              </label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className={inputCls} />
            </div>
            <SubmitButton className="w-full">Sign in</SubmitButton>
          </ActionForm>
        </div>
        <p className="mt-6 text-center text-xs text-muted">Accounts are created by an administrator.</p>
      </div>
    </main>
  );
}

import Link from "next/link";
import { Inbox, KeyRound, LogOut, Users } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { requireUser } from "@/lib/auth";
import { logoutAction } from "../actions";
import AdminNavLink from "@/components/admin/AdminNavLink";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const nav = [
    { href: "/admin", label: "Inquiries", icon: <Inbox className="size-4" aria-hidden="true" /> },
    ...(user.role === "admin" ? [{ href: "/admin/users", label: "Users", icon: <Users className="size-4" aria-hidden="true" /> }] : []),
    { href: "/admin/account", label: "My account", icon: <KeyRound className="size-4" aria-hidden="true" /> },
  ];
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block lg:py-6">
          <Link href="/admin" aria-label="Admin home">
            <Logo />
          </Link>
          <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-500 lg:mt-2 lg:block">Admin panel</p>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 no-scrollbar lg:flex-col lg:px-3">
          {nav.map((n) => (
            <AdminNavLink key={n.href} href={n.href}>
              {n.icon}
              {n.label}
            </AdminNavLink>
          ))}
        </nav>
        <div className="hidden border-t border-line px-5 py-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs capitalize text-muted">{user.role}</p>
          <form action={logoutAction} className="mt-3">
            <button className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-brand">
              <LogOut className="size-4" aria-hidden="true" /> Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-end gap-4 border-b border-line bg-white px-5 py-3 lg:hidden">
          <span className="text-sm text-muted">{user.username}</span>
          <form action={logoutAction}>
            <button className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-brand">
              <LogOut className="size-4" aria-hidden="true" /> Sign out
            </button>
          </form>
        </div>
        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

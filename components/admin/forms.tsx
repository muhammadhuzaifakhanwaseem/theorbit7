"use client";

import { createContext, startTransition, useActionState, useContext } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { FormState } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-xl border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
export const labelCls = "mb-1.5 block text-xs font-medium text-ink-2";

const PendingContext = createContext(false);

export function SubmitButton({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "danger" | "ghost" }) {
  const { pending: nativePending } = useFormStatus();
  const pending = useContext(PendingContext) || nativePending;
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition disabled:cursor-wait disabled:opacity-60",
        variant === "primary" && "bg-brand text-white hover:bg-brand-800",
        variant === "danger" && "bg-[#a3341f] text-white hover:bg-[#8a2b19]",
        variant === "ghost" && "border border-line-strong bg-white text-ink-2 hover:border-brand hover:text-brand",
        className,
      )}
    >
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

function Message({ state }: { state: FormState }) {
  if (!state?.error && !state?.success) return null;
  return (
    <p
      role={state.error ? "alert" : "status"}
      className={cn(
        "rounded-xl px-3.5 py-2.5 text-sm",
        state.error ? "bg-[#f6d9d3] text-[#8a2b19]" : "bg-mint-100 text-brand",
      )}
    >
      {state.error ?? state.success}
    </p>
  );
}

/** Generic form bound to a server action through useActionState. */
export function ActionForm({
  action,
  children,
  className,
  resetOnSuccess = false,
}: {
  action: (s: FormState, fd: FormData) => Promise<FormState>;
  children: React.ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form
      action={formAction}
      // Submit manually so React doesn't reset the fields when the action returns an error.
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
      className={cn("space-y-4", className)}
      key={resetOnSuccess ? state?.success : undefined}
    >
      <PendingContext.Provider value={pending}>
        <Message state={state} />
        {children}
      </PendingContext.Provider>
    </form>
  );
}

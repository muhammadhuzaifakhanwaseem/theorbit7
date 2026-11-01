"use client";

import { Trash } from "lucide-react";

/** Submit button that asks for confirmation before a destructive form action. */
export default function ConfirmSubmit({ message, label = "Delete" }: { message: string; label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
      className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 text-sm text-[#a3341f] hover:bg-[#fbeae6]"
    >
      <Trash className="size-4" aria-hidden="true" /> {label}
    </button>
  );
}

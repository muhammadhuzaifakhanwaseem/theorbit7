"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2, Trash } from "lucide-react";
import { deletePost } from "@/app/admin/blog/actions";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete “${title}” permanently? This cannot be undone.`)) return;
        start(async () => {
          await deletePost(id);
          router.refresh();
        });
      }}
      className="relative z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-[#fbeae6] hover:text-[#a3341f]"
      aria-label={`Delete ${title}`}
      title="Delete"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
    </button>
  );
}

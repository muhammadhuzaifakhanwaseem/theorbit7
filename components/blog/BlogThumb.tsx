import Image from "next/image";
import type { MediaRef } from "@/lib/blog/shared";
import { cn } from "@/lib/utils";

/** Post thumbnail with an on-brand fallback when no image was uploaded. */
export default function BlogThumb({
  image,
  alt,
  label,
  sizes,
  priority,
  className,
}: {
  image: MediaRef | null;
  alt: string;
  label?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-mint-100", className)}>
      {image ? (
        <Image
          src={image.url}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2b6b58,#163e33_55%,#0c261f)]">
          <div className="absolute -right-10 -top-10 size-48 rounded-full border border-white/15" />
          <div className="absolute -right-2 -top-2 size-28 rounded-full border border-white/15" />
          <span className="absolute bottom-5 left-6 font-display text-2xl font-semibold tracking-tight text-white/90">{label}</span>
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light = false,
  as: Tag = "h2",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      data-reveal
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-4 text-[2.1rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.4rem]",
          light ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-white/70" : "text-muted",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export const INQUIRY_STATUSES = ["new", "contacted", "qualified", "closed", "spam"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const statusStyles: Record<InquiryStatus, string> = {
  new: "bg-brand text-white",
  contacted: "bg-mint text-brand",
  qualified: "bg-[#e8dcc0] text-[#6b5320]",
  closed: "bg-ink/10 text-ink-2",
  spam: "bg-[#f6d9d3] text-[#a3341f]",
};

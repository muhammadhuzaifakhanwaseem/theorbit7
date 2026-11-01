import { foundersLetter, jobs, leadership, press } from "@/data/company";

/** Company pages that are only indexable once real content has been added. */
export const companyPageReady = {
  "/leadership": leadership.length > 0,
  "/founders-letter": foundersLetter !== null,
  "/press-media": press.length > 0,
  "/life-at-the-orbit-7": true, // culture content is always present; jobs are optional
  "/partnership": true,
} as const;

export const hasJobs = jobs.length > 0;

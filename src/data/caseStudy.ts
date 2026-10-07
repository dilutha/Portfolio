/** Shared implementation-status model used by long-form project case studies. */
export type BuildStatus = 'live' | 'partial' | 'planned'

export interface StatusItem {
  label: string
  status: BuildStatus
  /** What exists today, when it differs from the target. */
  note?: string
}

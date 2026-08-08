export type SeoLengthStatus = 'bad' | 'warning' | 'good'

export interface SeoLengthThresholds {
  /** Below this length: too short, bad. */
  minGood: number
  /** Between minGood and this: a bit short, warning. */
  idealMin: number
  /** The recommended maximum — the counter target shown to the user. */
  idealMax: number
  /** Between idealMax and this: a bit long, warning. Above it: bad. */
  maxGood: number
}

/**
 * Yoast-style: never blocks the user from typing further (that's
 * handled by a generous hard maxLength on the Payload field itself,
 * set well above idealMax). This only classifies the current length
 * for the visual indicator.
 */
export function getSeoLengthStatus(length: number, t: SeoLengthThresholds): SeoLengthStatus {
  if (length === 0) return 'bad'
  if (length < t.minGood) return 'bad'
  if (length < t.idealMin) return 'warning'
  if (length <= t.idealMax) return 'good'
  if (length <= t.maxGood) return 'warning'
  return 'bad'
}

export const SEO_TITLE_THRESHOLDS: SeoLengthThresholds = {
  minGood: 20,
  idealMin: 40,
  idealMax: 60,
  maxGood: 70,
}

export const SEO_DESCRIPTION_THRESHOLDS: SeoLengthThresholds = {
  minGood: 70,
  idealMin: 120,
  idealMax: 160,
  maxGood: 175,
}

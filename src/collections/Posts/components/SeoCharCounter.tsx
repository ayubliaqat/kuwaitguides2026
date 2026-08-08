'use client'

import React from 'react'

import { getSeoLengthStatus, type SeoLengthThresholds } from '../utils/seoThresholds'

interface SeoCharCounterProps {
  label: string
  length: number
  thresholds: SeoLengthThresholds
}

const STATUS_TEXT: Record<string, string> = {
  good: 'Good length',
  warning: 'Could be better',
  bad: 'Needs attention',
}

export const SeoCharCounter: React.FC<SeoCharCounterProps> = ({ label, length, thresholds }) => {
  const status = getSeoLengthStatus(length, thresholds)
  const fillPercent = Math.min(100, (length / thresholds.idealMax) * 100)

  return (
    <div className="kg-seo-counter">
      <div className={`kg-seo-counter__row kg-seo-${status}`}>
        <span>
          {label}: <strong>{length}</strong> / {thresholds.idealMax}
        </span>
        <span>{STATUS_TEXT[status]}</span>
      </div>
      <div className="kg-seo-meter">
        <div className={`kg-seo-meter__fill ${status}`} style={{ width: `${fillPercent}%` }} />
      </div>
    </div>
  )
}

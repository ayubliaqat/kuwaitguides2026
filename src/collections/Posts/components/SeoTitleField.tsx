'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

import { SeoCharCounter } from './SeoCharCounter'
import { SEO_TITLE_THRESHOLDS } from '../utils/seoThresholds'

export const SeoTitleField: React.FC = () => {
  const value = useFormFields(([fields]) => fields?.['meta.title']?.value) as string | undefined
  const length = value?.length ?? 0

  return <SeoCharCounter label="Meta title" length={length} thresholds={SEO_TITLE_THRESHOLDS} />
}

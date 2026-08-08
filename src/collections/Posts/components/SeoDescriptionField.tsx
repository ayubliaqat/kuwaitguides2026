'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

import { SeoCharCounter } from './SeoCharCounter'
import { SEO_DESCRIPTION_THRESHOLDS } from '../utils/seoThresholds'

export const SeoDescriptionField: React.FC = () => {
  const value = useFormFields(([fields]) => fields?.['meta.description']?.value) as
    string | undefined
  const length = value?.length ?? 0

  return (
    <SeoCharCounter
      label="Meta description"
      length={length}
      thresholds={SEO_DESCRIPTION_THRESHOLDS}
    />
  )
}

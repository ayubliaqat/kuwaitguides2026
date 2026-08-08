'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { countCharacters, countWords, lexicalToPlainText } from '../utils/lexicalToPlainText'

/**
 * Renders live word/character counts for the `content` richText field.
 * Attached via admin.components.afterInput on that field, so it reads
 * the field's own value out of form state rather than receiving it as
 * a prop.
 */
export const ContentStats: React.FC = () => {
  const contentValue = useFormFields(([fields]) => fields?.content?.value) as
    SerializedEditorState | undefined

  const plainText = React.useMemo(() => lexicalToPlainText(contentValue), [contentValue])

  const words = React.useMemo(() => countWords(plainText), [plainText])
  const characters = React.useMemo(() => countCharacters(plainText), [plainText])

  return (
    <div className="kg-content-stats">
      <span className="kg-content-stats__item">
        Words: <span className="kg-content-stats__value">{words}</span>
      </span>
      <span className="kg-content-stats__item">
        Characters: <span className="kg-content-stats__value">{characters}</span>
      </span>
    </div>
  )
}

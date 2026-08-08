import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

/**
 * Thin wrapper around Payload's own convertLexicalToPlaintext so the
 * rest of the admin UI doesn't need to import from
 * @payloadcms/richtext-lexical directly, and so word/char counting
 * logic lives in one place.
 */
export function lexicalToPlainText(data: SerializedEditorState | null | undefined): string {
  if (!data) {
    return ''
  }

  return convertLexicalToPlaintext({ data }).trim()
}

export function countWords(text: string): number {
  if (!text) {
    return 0
  }
  return text.split(/\s+/).filter(Boolean).length
}

export function countCharacters(text: string): number {
  return text.length
}

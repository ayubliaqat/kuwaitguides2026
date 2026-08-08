import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Props = {
  content: DefaultTypedEditorState
}

export const RichTextRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div
      className="
        payload-richtext
        max-w-none
        text-[#1d1d1f]

        [&_p]:mb-6
        [&_p]:text-[17px]
        [&_p]:leading-8
        [&_p]:text-[#424245]

        [&_h1]:mb-6
        [&_h1]:mt-14
        [&_h1]:text-4xl
        [&_h1]:font-semibold
        [&_h1]:leading-tight
        [&_h1]:tracking-tight
        [&_h1]:text-[#1d1d1f]

        [&_h2]:mb-5
        [&_h2]:mt-14
        [&_h2]:text-3xl
        [&_h2]:font-semibold
        [&_h2]:leading-tight
        [&_h2]:tracking-tight
        [&_h2]:text-[#1d1d1f]

        [&_h3]:mb-4
        [&_h3]:mt-10
        [&_h3]:text-2xl
        [&_h3]:font-semibold
        [&_h3]:leading-tight
        [&_h3]:tracking-tight
        [&_h3]:text-[#1d1d1f]

        [&_h4]:mb-3
        [&_h4]:mt-8
        [&_h4]:text-xl
        [&_h4]:font-semibold
        [&_h4]:text-[#1d1d1f]

        [&_ul]:mb-6
        [&_ul]:list-disc
        [&_ul]:space-y-2
        [&_ul]:pl-6

        [&_ol]:mb-6
        [&_ol]:list-decimal
        [&_ol]:space-y-2
        [&_ol]:pl-6

        [&_li]:text-[17px]
        [&_li]:leading-8
        [&_li]:text-[#424245]

        [&_strong]:font-semibold
        [&_em]:italic

        [&_a]:font-medium
        [&_a]:text-[#1d1d1f]
        [&_a]:underline
        [&_a]:underline-offset-4

        [&_blockquote]:my-8
        [&_blockquote]:border-l-4
        [&_blockquote]:border-[#d2d2d7]
        [&_blockquote]:pl-6
        [&_blockquote]:text-lg
        [&_blockquote]:italic
        [&_blockquote]:leading-8
        [&_blockquote]:text-[#6e6e73]

        [&_hr]:my-10
        [&_hr]:border-[#d2d2d7]

        [&_pre]:my-8
        [&_pre]:overflow-x-auto
        [&_pre]:rounded-xl
        [&_pre]:bg-[#1d1d1f]
        [&_pre]:p-5
        [&_pre]:text-sm
        [&_pre]:leading-7
        [&_pre]:text-white

        [&_code]:rounded
        [&_code]:bg-[#f5f5f7]
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:text-[0.9em]
        [&_code]:text-[#1d1d1f]

        [&_pre_code]:bg-transparent
        [&_pre_code]:p-0
        [&_pre_code]:text-white

        [&_table]:my-8
        [&_table]:w-full
        [&_table]:border-collapse
        [&_th]:border
        [&_th]:border-[#d2d2d7]
        [&_th]:bg-[#f5f5f7]
        [&_th]:p-3
        [&_th]:text-left
        [&_th]:font-semibold
        [&_th]:text-[#1d1d1f]
        [&_td]:border
        [&_td]:border-[#d2d2d7]
        [&_td]:p-3
        [&_td]:text-[#424245]

        [&_img]:my-8
        [&_img]:h-auto
        [&_img]:max-w-full
        [&_img]:rounded-2xl

        [&_figure]:my-8
        [&_figure]:overflow-hidden
        [&_figure]:rounded-2xl
      "
    >
      <RichText data={content} />
    </div>
  )
}

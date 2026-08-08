import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'updatedAt', 'slug'],
    group: 'Content',
  },

  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
    },
    maxPerDoc: 20,
  },

  fields: [
    // =========================================================
    // MAIN COLUMN — TITLE
    // =========================================================

    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Write an article title...',
        components: {
          Cell: '@/collections/Posts/components/TitleCell#TitleCell',
        },
      },
    },

    // =========================================================
    // MAIN COLUMN — SLUG
    // (kept directly under title, WordPress-style permalink line)
    // =========================================================

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'article-url-slug',
        description: 'The URL-friendly address for this article.',
      },
    },

    // =========================================================
    // MAIN COLUMN — CONTENT
    // =========================================================

    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Write and format your article content.',
        components: {
          afterInput: ['@/collections/Posts/components/ContentStats#ContentStats'],
        },
      },
    },

    // =========================================================
    // MAIN COLUMN — EXCERPT
    // =========================================================

    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        placeholder: 'Write a short description of this article...',
        description: 'A short summary used for article previews and SEO fallbacks.',
      },
    },

    // =========================================================
    // MAIN COLUMN — FAQS
    // =========================================================

    {
      type: 'collapsible',
      label: 'FAQs',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'faqs',
          type: 'array',
          label: 'Frequently Asked Questions',
          admin: {
            description: 'Add questions and answers related to this article.',
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'Enter the question...',
              },
            },

            {
              name: 'answer',
              type: 'textarea',
              required: true,
              admin: {
                placeholder: 'Enter the answer...',
              },
            },
          ],
        },
      ],
    },

    // =========================================================
    // MAIN COLUMN — SEO
    // (custom counter/preview components attach here in step 3)
    // =========================================================

    {
      type: 'collapsible',
      label: 'SEO & Search',
      admin: {
        initCollapsed: false,
        description: 'Control how this article appears in search engines and social sharing.',
        className: 'kg-seo-collapsible',
      },
      fields: [
        {
          name: 'meta',
          type: 'group',
          label: 'Search Metadata',
          fields: [
            {
              name: 'title',
              type: 'text',
              // Hard cap set well above the 60-char recommendation so
              // typing is never blocked — the SeoTitleField counter
              // shows the red/orange/green state instead, Yoast-style.
              maxLength: 100,
              admin: {
                description: 'Aim for 50–60 characters. Leave empty to use the article title.',
                components: {
                  afterInput: ['@/collections/Posts/components/SeoTitleField#SeoTitleField'],
                },
              },
            },

            {
              name: 'description',
              type: 'textarea',
              // Hard cap set well above the 160-char recommendation for
              // the same reason — see meta.title above.
              maxLength: 320,
              admin: {
                description: 'Aim for 120–160 characters.',
                components: {
                  afterInput: [
                    '@/collections/Posts/components/SeoDescriptionField#SeoDescriptionField',
                  ],
                },
              },
            },

            {
              name: 'canonicalUrl',
              type: 'text',
              admin: {
                description: 'Optional canonical URL for syndicated or duplicate content.',
              },
            },

            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image used when the article is shared on social platforms.',
              },
            },

            {
              name: 'schemaType',
              type: 'select',
              defaultValue: 'BlogPosting',
              options: [
                {
                  label: 'Blog Posting',
                  value: 'BlogPosting',
                },
                {
                  label: 'Article',
                  value: 'Article',
                },
                {
                  label: 'News Article',
                  value: 'NewsArticle',
                },
                {
                  label: 'FAQ Page',
                  value: 'FAQPage',
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'noIndex',
                  type: 'checkbox',
                  label: 'No Index',
                  defaultValue: false,
                },

                {
                  name: 'noFollow',
                  type: 'checkbox',
                  label: 'No Follow',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SIDEBAR — native Payload sidebar via admin.position.
    // Kept flat (no collapsibles) to match a compact WordPress /
    // Yoast-style publish box rather than an accordion.
    // Payload's own "Status" control (from versions.drafts) is
    // injected automatically above these — no field needed.
    // =========================================================

    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Publication date displayed on the website.',
      },
    },

    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Main image displayed with the article.',
      },
    },

    {
      name: 'readingTime',
      type: 'number',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes.',
      },
    },
  ],
}

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@payload-config'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    notFound()
  }

  const image =
    typeof post.featuredImage === 'object' && post.featuredImage !== null
      ? post.featuredImage
      : null

  const author = typeof post.author === 'object' && post.author !== null ? post.author : null

  const firstCategory =
    Array.isArray(post.categories) && post.categories.length > 0 ? post.categories[0] : null

  const category =
    typeof firstCategory === 'object' && firstCategory !== null ? firstCategory : null

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <article className="mx-auto max-w-5xl px-6 py-16 md:px-10 lg:py-24">
        {/* Category */}
        {category && 'title' in category && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0071e3]">
            {String(category.title)}
          </p>
        )}

        {/* Title */}
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-6xl md:leading-[1.05]">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6e6e73] md:text-xl">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6e6e73]">
          <span>{author && 'name' in author ? String(author.name) : 'Kuwait Guides'}</span>

          {post.publishedAt && (
            <>
              <span>•</span>

              <time dateTime={post.publishedAt}>
                {new Intl.DateTimeFormat('en', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(post.publishedAt))}
              </time>
            </>
          )}
        </div>

        {/* Featured Image */}
        {image?.url && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[20px] bg-white">
            <Image
              src={image.url}
              alt={image.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-12 rounded-[20px] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] md:px-12 md:py-12">
          <div className="prose prose-lg max-w-none">{/* Lexical content will go here */}</div>
        </div>

        {/* FAQs will go here */}
      </article>
    </main>
  )
}

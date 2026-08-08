import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 2,
    sort: '-publishedAt',
    limit: 100,
  })

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0071e3]">
            Kuwait Guides
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
            Latest Guides
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6e6e73]">
            Helpful guides, travel information, and practical insights for exploring Kuwait.
          </p>
        </header>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="rounded-[14px] border border-[#e5e5e7] bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-[#1d1d1f]">No posts yet</h2>

            <p className="mt-2 text-sm text-[#6e6e73]">Your published guides will appear here.</p>
          </div>
        ) : (
          /* Post Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => {
              const image =
                typeof post.featuredImage === 'object' && post.featuredImage !== null
                  ? post.featuredImage
                  : null

              const author =
                typeof post.author === 'object' && post.author !== null ? post.author : null

              const firstCategory =
                Array.isArray(post.categories) && post.categories.length > 0
                  ? post.categories[0]
                  : null

              const category =
                typeof firstCategory === 'object' && firstCategory !== null ? firstCategory : null

              return (
                <article
                  key={post.id}
                  className="group flex min-h-[420px] flex-col overflow-hidden rounded-[14px] border border-[#e5e5e7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Featured Image */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-[#f5f5f7]"
                  >
                    {image?.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#86868b]">
                        Kuwait Guides
                      </div>
                    )}
                  </Link>

                  {/* Card */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Category */}
                    {category && 'title' in category && (
                      <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#0071e3]">
                        {String(category.title)}
                      </span>
                    )}

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-[#1d1d1f] transition-colors group-hover:text-[#0071e3]">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6e6e73]">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="mt-auto pt-5">
                      <div className="border-t border-[#e5e5e7] pt-4">
                        <div className="flex items-center justify-between gap-3 text-xs text-[#86868b]">
                          <span>
                            {author && 'name' in author ? String(author.name) : 'Kuwait Guides'}
                          </span>

                          {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                              {new Intl.DateTimeFormat('en', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }).format(new Date(post.publishedAt))}
                            </time>
                          )}
                        </div>

                        {/* Read Link */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center text-sm font-medium text-[#0071e3] transition-colors hover:text-[#0077ed]"
                        >
                          Read guide
                          <span className="ml-1 transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

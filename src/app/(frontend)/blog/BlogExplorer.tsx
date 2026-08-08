'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Post } from '@/payload-types'

interface BlogExplorerProps {
  posts: Post[]
}

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [query, setQuery] = useState('')

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) {
      return posts
    }
    return posts.filter((post) => post.title?.toLowerCase().includes(term))
  }, [posts, query])

  return (
    <>
      {/* Compact header row */}
      <section className="border-b border-kg-border-soft bg-kg-surface">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10 lg:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-kg-blue">
                Kuwait Guides
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-kg-text md:text-4xl">
                All Blogs
              </h1>

              <p className="mt-1 max-w-md text-sm text-kg-text-secondary">
                Explore all our travel guides and practical tips for Kuwait.
              </p>
            </div>

            {/* Search — compact, right-aligned, fixed width on desktop */}
            <div className="relative w-full md:w-72">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-kg-text-muted"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6 0 7.5 7.5 0 0 0 10.6 0Z"
                />
              </svg>

              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search guides..."
                className="w-full rounded-full border border-kg-border bg-kg-surface py-2.5 pl-10 pr-4 text-sm text-kg-text shadow-kg outline-none transition placeholder:text-kg-text-muted focus:border-kg-blue focus:ring-4 focus:ring-kg-blue/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12 lg:px-12">
        {query && (
          <p className="mb-6 text-sm text-kg-text-secondary">
            {filteredPosts.length} guide{filteredPosts.length === 1 ? '' : 's'} found for &quot;
            {query}&quot;
          </p>
        )}

        {filteredPosts.length === 0 ? (
          <div className="rounded-kg border border-kg-border-soft bg-kg-surface p-10 text-center">
            <h2 className="text-xl font-semibold text-kg-text">
              {query ? 'No guides match your search' : 'No posts yet'}
            </h2>

            <p className="mt-2 text-sm text-kg-text-secondary">
              {query ? 'Try a different keyword.' : 'Your published guides will appear here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map((post) => {
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
                  className="group flex min-h-[420px] flex-col overflow-hidden rounded-kg border border-kg-border-soft bg-kg-surface shadow-kg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-kg-bg"
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
                      <div className="flex h-full items-center justify-center text-sm text-kg-text-muted">
                        Kuwait Guides
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    {category && 'title' in category && (
                      <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-kg-blue">
                        {String(category.title)}
                      </span>
                    )}

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-kg-text transition-colors group-hover:text-kg-blue">
                        {post.title}
                      </h2>
                    </Link>

                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-kg-text-secondary">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-5">
                      <div className="border-t border-kg-border-soft pt-4">
                        <div className="flex items-center justify-between gap-3 text-xs text-kg-text-muted">
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

                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center text-sm font-medium text-kg-blue transition-colors hover:text-kg-blue-hover"
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
    </>
  )
}

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
    <main className="min-h-screen bg-kg-surface">
      {/* 1. HERO SECTION - Blue background with border and adjusted text colors */}
      <section className="border-b border-kg-border-soft bg-kg-blue py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              Kuwait Guides
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Explore Blogs
            </h1>

            <p className="mt-3 text-base text-white/90 md:text-lg">
              Explore all our travel guides and practical tips for Kuwait.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SEARCH SECTION */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="flex flex-col items-start gap-4">
            <div className="relative w-full sm:w-80">
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

            {query && (
              <p className="text-sm text-kg-text-secondary">
                {filteredPosts.length} guide{filteredPosts.length === 1 ? '' : 's'} found for &quot;
                {query}&quot;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. BLOG CARDS SECTION */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

                const formattedDate = post.publishedAt
                  ? new Intl.DateTimeFormat('en', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(post.publishedAt))
                  : null

                const authorName =
                  author && 'name' in author ? String(author.name) : 'Kuwait Guides'

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-kg border border-kg-border-soft bg-kg-surface shadow-kg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div>
                      {/* CARD IMAGE */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative block aspect-[16/9] w-full overflow-hidden bg-kg-bg"
                      >
                        {image?.url ? (
                          <Image
                            src={image.url}
                            alt={image.alt || post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-kg-text-muted">
                            Kuwait Guides
                          </div>
                        )}
                      </Link>

                      {/* CARD CONTENT */}
                      <div className="p-5">
                        {category && 'title' in category && (
                          <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.1em] text-kg-blue">
                            {String(category.title)}
                          </span>
                        )}

                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="line-clamp-2 text-base font-semibold leading-snug text-kg-text transition-colors group-hover:text-kg-blue">
                            {post.title}
                          </h2>
                        </Link>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <div className="border-t border-kg-border-soft pt-4">
                        <div className="mb-4 text-xs text-kg-text-muted">
                          <span>{authorName}</span>
                          {formattedDate && (
                            <>
                              <span className="mx-1.5">·</span>
                              <time dateTime={post.publishedAt!}>{formattedDate}</time>
                            </>
                          )}
                        </div>

                        {/* BLUE CTA BUTTON */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex w-full items-center justify-center rounded-md bg-kg-blue px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-kg-blue-hover"
                        >
                          Read Article <span className="ml-1.5">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

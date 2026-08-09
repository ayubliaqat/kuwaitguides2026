import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch latest published posts for the homepage
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="min-h-screen bg-kg-surface text-kg-text">
      {/* 1. HERO SECTION (Centered with no right image) */}
      <section className="border-b border-kg-border-soft bg-kg-surface py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-kg-blue sm:text-5xl md:text-6xl lg:text-7xl">
            Your Guide to Exploring Kuwait
          </h1>

          <p className="mt-6 text-base text-kg-text-secondary sm:text-lg md:text-xl">
            Discover the best destinations, rich cultural heritage, vibrant food culture, and
            practical travel tips for your journey across Kuwait.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-kg-blue px-8 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-kg-blue-hover hover:shadow-lg"
            >
              Explore Guides <span className="ml-2">→</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-kg-border bg-kg-surface px-8 py-3.5 text-sm font-medium text-kg-text transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-kg-blue hover:text-kg-blue hover:shadow-sm"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED GUIDES */}
      <section className="border-b border-kg-border-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-kg-blue">
              Handpicked
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-kg-text md:text-3xl">
              Featured Guides
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => {
              const image =
                typeof post.featuredImage === 'object' && post.featuredImage !== null
                  ? post.featuredImage
                  : null

              const firstCategory =
                Array.isArray(post.categories) && post.categories.length > 0
                  ? post.categories[0]
                  : null

              const category =
                typeof firstCategory === 'object' && firstCategory !== null ? firstCategory : null

              return (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-kg-border-soft bg-kg-surface shadow-kg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div>
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
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-kg-text-muted">
                          Kuwait Guides
                        </div>
                      )}
                    </Link>

                    <div className="p-5 text-center">
                      {category && 'title' in category && (
                        <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.1em] text-kg-blue">
                          {String(category.title)}
                        </span>
                      )}

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-kg-text transition-colors group-hover:text-kg-blue">
                          {post.title}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-kg-border-soft pt-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-kg-blue px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-kg-blue-hover hover:shadow-md"
                      >
                        Read Article <span className="ml-1.5">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-kg-blue transition-colors hover:text-kg-blue-hover"
            >
              View all guides <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. EXPLORE KUWAIT */}
      <section className="border-b border-kg-border-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-kg-blue">
              Destinations
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-kg-text md:text-3xl">
              Explore Kuwait Highlights
            </h2>
            <p className="mt-2 text-sm text-kg-text-secondary md:text-base">
              From the scenic Arabian Gulf coastline to historic souks and modern architectural
              marvels.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-kg-border-soft bg-kg-bg p-6 shadow-kg transition-all duration-300 hover:-translate-y-1 hover:border-kg-blue hover:shadow-lg">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-kg-blue">
                  Landmarks
                </span>
                <h3 className="mt-2 text-lg font-semibold text-kg-text">
                  Kuwait City & Architecture
                </h3>
                <p className="mt-2 text-sm text-kg-text-secondary">
                  Explore iconic landmarks like the towering Kuwait Towers, Grand Mosque, and
                  contemporary design museums.
                </p>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-kg-border-soft bg-kg-bg p-6 shadow-kg transition-all duration-300 hover:-translate-y-1 hover:border-kg-blue hover:shadow-lg">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-kg-blue">
                  Heritage
                </span>
                <h3 className="mt-2 text-lg font-semibold text-kg-text">
                  Traditional Souks & History
                </h3>
                <p className="mt-2 text-sm text-kg-text-secondary">
                  Wander through the bustling alleyways of Souk Mubarakiya for authentic spices,
                  local crafts, and heritage.
                </p>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-kg-border-soft bg-kg-bg p-6 shadow-kg transition-all duration-300 hover:-translate-y-1 hover:border-kg-blue hover:shadow-lg">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-kg-blue">
                  Gastronomy
                </span>
                <h3 className="mt-2 text-lg font-semibold text-kg-text">Food & Dining Culture</h3>
                <p className="mt-2 text-sm text-kg-text-secondary">
                  Savor authentic Kuwaiti cuisine, fresh Gulf seafood, and a thriving specialty cafe
                  culture across the city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRAVEL GUIDES / PRACTICAL INFORMATION */}
      <section className="border-b border-kg-border-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-kg-blue">
              Essential Advice
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-kg-text md:text-3xl">
              Practical Information
            </h2>
            <p className="mt-2 text-sm text-kg-text-secondary md:text-base">
              Essential tips to help you plan a smooth, well-prepared, and comfortable visit to
              Kuwait.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-kg-border-soft bg-kg-surface p-6 shadow-kg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-kg-blue">
                Getting Around
              </h3>
              <p className="mt-2 text-sm text-kg-text-secondary">
                Navigate the city efficiently using trusted ride-hailing applications and reliable
                public transport options.
              </p>
            </div>

            <div className="rounded-2xl border border-kg-border-soft bg-kg-surface p-6 shadow-kg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-kg-blue">
                Best Time to Visit
              </h3>
              <p className="mt-2 text-sm text-kg-text-secondary">
                Plan your trip during the cooler winter months from November through March for ideal
                outdoor exploration.
              </p>
            </div>

            <div className="rounded-2xl border border-kg-border-soft bg-kg-surface p-6 shadow-kg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-kg-blue">
                Local Customs
              </h3>
              <p className="mt-2 text-sm text-kg-text-secondary">
                Understand local etiquette, traditional hospitality, and modest dress standards for
                a respectful visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST ARTICLES */}
      {posts.length > 0 && (
        <section className="border-b border-kg-border-soft py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-kg-blue">
                Journal
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-kg-text md:text-3xl">
                Latest from Kuwait Guides
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-kg-border-soft bg-kg-surface shadow-kg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div>
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
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-kg-text-muted">
                            Kuwait Guides
                          </div>
                        )}
                      </Link>

                      <div className="p-5 text-center">
                        {category && 'title' in category && (
                          <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.1em] text-kg-blue">
                            {String(category.title)}
                          </span>
                        )}

                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-kg-text transition-colors group-hover:text-kg-blue">
                            {post.title}
                          </h3>
                        </Link>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <div className="border-t border-kg-border-soft pt-4">
                        <div className="mb-4 text-center text-xs text-kg-text-muted">
                          <span>{authorName}</span>
                          {formattedDate && (
                            <>
                              <span className="mx-1.5">·</span>
                              <time dateTime={post.publishedAt!}>{formattedDate}</time>
                            </>
                          )}
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex w-full items-center justify-center rounded-full bg-kg-blue px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-kg-blue-hover hover:shadow-md"
                        >
                          Read Article <span className="ml-1.5">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-kg-blue transition-colors hover:text-kg-blue-hover"
              >
                View All Guides <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 6. FINAL CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-kg-blue">
            Get Started
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-kg-text md:text-3xl">
            Ready to explore Kuwait?
          </h2>
          <p className="mt-2 text-sm text-kg-text-secondary md:text-base">
            Discover our full collection of travel tips, destination breakdowns, and cultural
            guides.
          </p>
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-kg-blue px-8 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-kg-blue-hover hover:shadow-lg"
            >
              Explore Kuwait Guides <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  const posts = [
    {
      title: 'Discover Kuwait City',
      description:
        'A simple guide to the places, streets, and experiences that define Kuwait City.',
      category: 'Places',
    },
    {
      title: 'The Best Places to Visit in Kuwait',
      description: 'Explore some of Kuwait’s most interesting landmarks and destinations.',
      category: 'Travel',
    },
    {
      title: 'A Guide to Kuwait for First-Time Visitors',
      description: 'Everything you need to know before exploring Kuwait for the first time.',
      category: 'Guides',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-100">
        <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium tracking-wide text-blue-600">KUWAIT GUIDES</p>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] text-neutral-950 sm:text-6xl lg:text-7xl">
              Kuwait,
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                worth discovering.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-7 text-neutral-500">
              Explore Kuwait through thoughtful guides, local places, stories, and practical travel
              tips.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/blog"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                Explore our Blog
              </a>

              <a
                href="/about"
                className="rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
              >
                About Kuwait Guides
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">LATEST</p>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-4xl">
              Recent guides
            </h2>
          </div>

          <a
            href="/blog"
            className="hidden text-sm font-medium text-blue-600 transition hover:text-blue-700 sm:block"
          >
            View all →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/40"
            >
              {/* Image placeholder */}
              <div className="aspect-[16/10] bg-neutral-100">
                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                  Kuwait Guides
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                  {post.category}
                </p>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-950">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">{post.description}</p>

                <div className="mt-5 text-sm font-medium text-neutral-900">
                  Read guide
                  <span className="ml-1 text-blue-600 transition group-hover:ml-2">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <a href="/blog" className="text-sm font-medium text-blue-600">
            View all guides →
          </a>
        </div>
      </section>
    </main>
  )
}

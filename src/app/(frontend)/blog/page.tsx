import { getPayload } from 'payload'

import config from '@payload-config'

import { BlogExplorer } from './BlogExplorer'

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
    <main className="min-h-screen bg-kg-bg">
      <BlogExplorer posts={posts} />
    </main>
  )
}

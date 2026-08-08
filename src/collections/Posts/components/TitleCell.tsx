'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TitleCellProps {
  cellData: string
  rowData: {
    id: string | number
    slug?: string
  }
}

// TODO: replace with your actual frontend site origin, or wire up
// via an env var like process.env.NEXT_PUBLIC_SITE_URL.
const SITE_URL = 'https://your-site.com'

// TODO: update this if a post's live URL isn't /blog/{slug}.
const getViewHref = (slug?: string) => (slug ? `${SITE_URL}/blog/${slug}` : undefined)

export const TitleCell: React.FC<TitleCellProps> = ({ cellData, rowData }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = React.useState(false)

  const editHref = `/admin/collections/posts/${rowData.id}`
  const viewHref = getViewHref(rowData.slug)

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const confirmed = window.confirm(`Delete "${cellData}"? This cannot be undone.`)
    if (!confirmed) {
      return
    }

    setIsDeleting(true)

    try {
      const res = await fetch(`/api/posts/${rowData.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Delete request failed')
      }

      router.refresh()
    } catch {
      window.alert('Failed to delete this post. Please try again.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="kg-row-title">
      <Link href={editHref} className="kg-row-title__link">
        {cellData}
      </Link>

      <div className="kg-row-actions">
        <Link href={editHref} className="kg-row-actions__item">
          Edit
        </Link>

        {viewHref && (
          <a
            href={viewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="kg-row-actions__item"
          >
            View
          </a>
        )}

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="kg-row-actions__item kg-row-actions__item--danger"
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

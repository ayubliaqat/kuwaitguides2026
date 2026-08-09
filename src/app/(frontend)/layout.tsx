import React from 'react'
import './styles.css'

export const metadata = {
  description:
    'Your complete guide to exploring Kuwait destinations, culture, food, and travel tips.',
  title: 'Kuwait Guides | Explore Kuwait',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark">
      <body className="bg-kg-surface text-kg-text antialiased min-h-screen selection:bg-kg-blue selection:text-white">
        <main>{children}</main>
      </body>
    </html>
  )
}

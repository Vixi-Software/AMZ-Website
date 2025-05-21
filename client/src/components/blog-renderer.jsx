import DOMPurify from 'dompurify'
import React from 'react'

export default function BlogRenderer({ html }) {
  const cleanHTML = DOMPurify.sanitize(html)

  return (
    <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: cleanHTML }} />
  )
}

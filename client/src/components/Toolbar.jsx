import React from 'react'

export default function Toolbar({ editor }) {
  if (!editor) return null

  const insertImage = () => {
    const url = prompt('URL ảnh:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-2 border-b pb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">List</button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="btn">Quote</button>
      <button onClick={() => insertImage()} className="btn">Ảnh</button>
    </div>
  )
}
import React, { useRef } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link,
  Image,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  Eraser,
  Code2,
  Code
} from "lucide-react"

export default function Toolbar({ editor }) {
  const fileInputRef = useRef(null)

  if (!editor) return null

  const insertImage = () => {
    const url = prompt('URL ảnh:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target.result }).run()
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const setLink = () => {
    const url = prompt('URL liên kết:')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-2 border-b pb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn" title="Bold"><Bold size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn" title="Italic"><Italic size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn" title="Underline"><Underline size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn" title="H1"><Heading1 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn" title="H2"><Heading2 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="btn" title="H3"><Heading3 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn" title="Bullet List"><List size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn" title="Numbered List"><ListOrdered size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="btn" title="Quote"><Quote size={18} /></button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn" title="HR"><Minus size={18} /></button>
      <button onClick={setLink} className="btn" title="Link"><Link size={18} /></button>
      <button onClick={insertImage} className="btn" title="Ảnh URL"><Image size={18} /></button>
      <button
        onClick={() => fileInputRef.current.click()}
        className="btn"
        type="button"
        title="Ảnh từ máy"
      >
        <Upload size={18} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="btn" title="Left"><AlignLeft size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="btn" title="Center"><AlignCenter size={18} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="btn" title="Right"><AlignRight size={18} /></button>
      <button onClick={() => editor.chain().focus().undo().run()} className="btn" title="Undo"><Undo2 size={18} /></button>
      <button onClick={() => editor.chain().focus().redo().run()} className="btn" title="Redo"><Redo2 size={18} /></button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="btn" title="Clear"><Eraser size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="btn" title="Code Block"><Code2 size={18} /></button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className="btn" title="Inline Code"><Code size={18} /></button>
    </div>
  )
}
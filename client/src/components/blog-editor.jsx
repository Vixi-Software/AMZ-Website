import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
import ResizableImage from "@tiptap/extension-image";

import Toolbar from './Toolbar'

export default function BlogEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, ResizableImage],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="bg-white border rounded shadow p-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[300px] mt-2 prose prose-sm focus:outline-none" />
    </div>
  )
}
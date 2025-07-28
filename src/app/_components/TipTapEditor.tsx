'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { uploadImage } from '~/lib/supabase'
import { useCallback, useEffect } from 'react'

interface TipTapEditorProps {
  initialContent?: any
  onChange?: (content: any) => void
  placeholder?: string
  className?: string
}

export default function TipTapEditor({
  initialContent,
  onChange,
  placeholder = "Start writing your post...",
  className = ""
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent,
    immediatelyRender: false, // Fix SSR hydration issues
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4'
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0]
          if (file && file.type.startsWith('image/')) {
            event.preventDefault()
            handleImageUpload(file)
            return true
          }
        }
        return false
      },
      handlePaste: (view, event, slice) => {
        const items = event.clipboardData?.items
        if (items) {
          for (const item of items) {
            if (item.type.startsWith('image/')) {
              event.preventDefault()
              const file = item.getAsFile()
              if (file) {
                handleImageUpload(file)
              }
              return true
            }
          }
        }
        return false
      }
    }
  })

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return

    try {
      // Upload to Supabase
      const url = await uploadImage(file)
      
      // Insert image at current position
      editor.chain().focus().setImage({ src: url, alt: file.name }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      // You might want to show a toast notification here
    }
  }, [editor])

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent)
    }
  }, [editor, initialContent])

  if (!editor) {
    return <div>Loading editor...</div>
  }

  return (
    <div className={`border border-gray-600 rounded-lg bg-gray-900 ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-600 p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('bold') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('italic') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('heading', { level: 2 }) 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('heading', { level: 3 }) 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('bulletList') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('orderedList') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Ordered List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('codeBlock') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Code Block
        </button>
        <label className="px-2 py-1 rounded text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 cursor-pointer">
          Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                handleImageUpload(file)
              }
            }}
          />
        </label>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
} 
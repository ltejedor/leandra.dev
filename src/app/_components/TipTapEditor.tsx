'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { uploadImage } from '~/lib/supabase'
import { useCallback, useEffect, useRef } from 'react'

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
  const isInitialized = useRef(false)
  const lastInitialContent = useRef<any>(null)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      LinkExtension.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
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

  // Only set content when editor is first created or when loading a different post
  useEffect(() => {
    if (!editor || !initialContent) return
    
    // Check if this is a different post (content has changed externally, not from typing)
    const contentChanged = JSON.stringify(lastInitialContent.current) !== JSON.stringify(initialContent)
    
    if (!isInitialized.current || contentChanged) {
      // Only update if the editor's current content is different (avoids cursor jump while typing)
      const currentContent = editor.getJSON()
      const editorContentMatches = JSON.stringify(currentContent) === JSON.stringify(initialContent)
      
      if (!editorContentMatches) {
        editor.commands.setContent(initialContent)
        lastInitialContent.current = initialContent
      }
      isInitialized.current = true
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
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('paragraph') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Paragraph
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
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
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('heading', { level: 3 }) 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          H3
        </button>
        <div className="w-px bg-gray-600 mx-1"></div>
        <button
          onMouseDown={(e) => e.preventDefault()}
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
          onMouseDown={(e) => e.preventDefault()}
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
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            const url = window.prompt('Enter URL:', editor.getAttributes('link').href || 'https://')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('link') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🔗 Link
        </button>
        {editor.isActive('link') && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="px-2 py-1 rounded text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Remove Link
          </button>
        )}
        <div className="w-px bg-gray-600 mx-1"></div>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleBulletList().run()
          }}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('bulletList') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          • Bullet List
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run()
          }}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            editor.isActive('orderedList') 
              ? 'bg-[var(--color-accent)] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          1. Ordered List
        </button>
        <div className="w-px bg-gray-600 mx-1"></div>
        <button
          onMouseDown={(e) => e.preventDefault()}
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
          📷 Image
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
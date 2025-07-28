import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Upload image via API route (secure server-side upload)
export async function uploadImage(file: File): Promise<string> {
  try {
    // Validate file
    if (!file) {
      throw new Error('No file provided')
    }

    // Client-side validation
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit')
    }

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} not supported. Please upload a valid image file.`)
    }

    console.log('Client: Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type)
    
    // Create FormData for API request
    const formData = new FormData()
    formData.append('file', file)

    // Call server-side API route
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Upload failed with status ${response.status}`)
    }

    const result = await response.json()
    
    if (!result.url) {
      throw new Error('No URL returned from upload')
    }

    console.log('Client: Upload successful, URL:', result.url)
    return result.url
    
  } catch (error) {
    console.error('Upload error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      error
    })
    
    // Re-throw with a user-friendly message
    const errorMessage = error instanceof Error ? error.message : 'Unknown upload error occurred'
    throw new Error(errorMessage)
  }
} 
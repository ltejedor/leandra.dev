import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side admin client with service key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: NextRequest) {
  // Only allow in development environment
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ 
      error: 'Upload API is only available in development mode' 
    }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 })
    }

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `File type ${file.type} not supported. Please upload a valid image file.` 
      }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    
    console.log('Server: Uploading file:', fileName, 'Size:', file.size, 'Type:', file.type)
    
    // Upload to Supabase using service key
    const { data, error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(`public/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ 
        error: `Upload failed: ${error.message}` 
      }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(`public/${fileName}`)

    if (!urlData?.publicUrl) {
      return NextResponse.json({ 
        error: 'Failed to get public URL for uploaded file' 
      }, { status: 500 })
    }

    console.log('Server: Upload successful, URL:', urlData.publicUrl)
    
    return NextResponse.json({ 
      url: urlData.publicUrl,
      fileName: fileName 
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
} 
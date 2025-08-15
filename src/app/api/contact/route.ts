import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare the form data for Web3Forms
    const formData = new FormData()
    formData.append('access_key', process.env.WEB3FORMS_ACCESS_KEY!)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('subject', `Portfolio Contact: ${subject}`)
    formData.append('message', message)
    formData.append('from_name', 'Portfolio Website')
    formData.append('to_email', 'nana.moriyama.amsterdam@gmail.com')

    // Send to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.ok && result.success) {
      return NextResponse.json(
        { message: 'Message sent successfully!' },
        { status: 200 }
      )
    } else {
      throw new Error(result.message || 'Failed to send message')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
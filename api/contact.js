// /api/contact.js — Vercel Serverless Function
// Receives POST from the contact form and emails it via Resend.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, message } = req.body || {}

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Simple email format check
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nex Wave <onboarding@resend.dev>',   // swap for your domain later
        to: ['nexwave.lk@gmail.com'],               // where you receive inquiries
        reply_to: email,                             // hit Reply → replies to the sender
        subject: `New inquiry from ${name}${company ? ` (${company})` : ''}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="margin: 0 0 16px; color: #1B4DFF;">New contact form submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: 600; width: 100px;">Name</td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              ${company ? `<tr><td style="padding: 8px 0; font-weight: 600;">Company</td><td>${company}</td></tr>` : ''}
            </table>
            <hr style="margin: 24px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-weight: 600; margin: 0 0 8px;">Message</p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
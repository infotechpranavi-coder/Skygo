export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { to, subject, text, enquiryId } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Sky Go <noreply@allorashopee.com>',
        to: [to],
        subject: subject,
        text: text, // Plain text alternative
        html: `<p style="white-space: pre-wrap; font-family: sans-serif; color: #111827;">${text}</p>`
      })
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(data.message || 'Error occurred while sending email via Resend');
    }

    // Optional: Update the enquiry status in the database to 'resolved' or 'read'
    // if (enquiryId) { ... }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email API error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

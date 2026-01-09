import { H3Event, readBody } from 'h3'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const { nodemailerConfig } = useRuntimeConfig();

const ContactSchema = z.object({
  title: z.string().optional(),
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
  phone: z.string().min(1).max(30),
  email: z.string().email(),
  files: z.any(),
  startdate: z.string(),
  
})


// Simple in-memory rate limiting (for demo use, not cluster-ready)
const ipHits = new Map()
function rateLimit(ip, max = 5, windowMs = 60 * 1000) {
  const now = Date.now()
  let entry = ipHits.get(ip) || { count: 0, time: now }
  if (now - entry.time > windowMs) entry = { count: 0, time: now }
  entry.count++
  ipHits.set(ip, entry)
  return entry.count > max
}

export default async function (event: H3Event) {
  let body
  try {
    body = await readBody(event)
    ContactSchema.parse(body)
  } catch (err) {
    return { success: false, error: "Ungültige Eingaben" }
  }

  const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress
  if (rateLimit(ip)) {
    return { success: false, error: "Zu viele Anfragen. Bitte später versuchen." }
  }

  try {
    const transporter = nodemailer.createTransport(nodemailerConfig)

    const escape = str =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")

    const mailOptions = {
      from: `"Gleisplan Bewerbung" <${nodemailerConfig.auth.user}>`,
      to: nodemailerConfig.emailTo,
      subject: `'Bewerbung als ${body.jobTitle}'`,
      attachments: body.files?.map(file => ({
        filename: file.name,
        content: Buffer.from(file.content, 'base64'),
        contentType: 'application/pdf',
      })),
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Bewerbung als ${escape(body.jobTitle)}</h2>
          <p><strong>Titel:</strong> ${escape(body.title || '')}</p>
          <p><strong>Name:</strong> ${escape(body.firstname)} ${escape(body.lastname)}</p>
          <p><strong>Telefon:</strong> ${escape(body.phone || '')}</p>
          <p><strong>E-Mail:</strong> ${escape(body.email)}</p>
          <p><strong>Verfügbar ab:</strong> ${escape(body.startdate)}</p>
          <hr>
          <small style="color:#888;">
            Diese E-Mail wurde über das Bewerbungsformular der Seite 
            <a href="https://www.gleisplan-leipzig.de">gleisplan-leipzig.de</a> gesendet.
          </small>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('E-Mail-Versand fehlgeschlagen:', {
      message: error?.message || String(error),
      stack: error?.stack || String(error),
    })
    return { success: false, error: 'Fehler beim Versand. Bitte erneut versuchen.' }
  }
}
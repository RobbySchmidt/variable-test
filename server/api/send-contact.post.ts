import { H3Event, readBody } from 'h3'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const { nodemailerConfig } = useRuntimeConfig();

const ContactSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().max(30).optional(),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  honeypot: z.string().max(0).optional(),
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
      from: `"Gleisplan Website Kontaktformular" <${nodemailerConfig.auth.user}>`,
      to: nodemailerConfig.emailTo,
      subject: 'Neue Kontaktanfrage über gleisplan-leipzig.de',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Neue Nachricht über das Kontaktformular</h2>
          <p><strong>Name:</strong> ${escape(body.firstName)} ${escape(body.lastName)}</p>
          <p><strong>Telefon:</strong> ${escape(body.phone || '')}</p>
          <p><strong>E-Mail:</strong> ${escape(body.email)}</p>
          <p><strong>Nachricht:</strong><br>${escape(body.message).replace(/\n/g, '<br>')}</p>
          <hr>
          <small style="color:#888;">
            Diese E-Mail wurde von einem Kontaktformular der Seite 
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
    return { success: false, error }
  }
}
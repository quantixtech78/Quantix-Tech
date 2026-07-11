import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This route runs on the Node.js server (not the edge) because Nodemailer
// opens an SMTP socket, which the edge runtime doesn't support.
export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string; // the selected service
  message?: string;
  // Honeypot: a hidden field real users never fill. Bots do.
  company?: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  // Honeypot: if filled, pretend success so bots don't retry.
  if ((body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  // SMTP config comes from environment variables — never hard-code credentials.
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP env vars are not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    // true for port 465 (implicit TLS), false for 587/25 (STARTTLS).
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = CONTACT_TO || "sales@quantix-tech.com";
  // Many SMTP providers require the From to be a mailbox you own.
  const from = CONTACT_FROM || SMTP_USER;

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "—"),
    subject: escapeHtml(subject || "General enquiry"),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };

  try {
    await transporter.sendMail({
      from: `"Quantix Website" <${from}>`,
      to,
      // Reply goes straight to the person who filled the form.
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry: ${subject || "General"} — from ${name}`,
      text:
        `New contact form submission\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || "—"}\n` +
        `Service: ${subject || "General enquiry"}\n\n` +
        `Message:\n${message}\n`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px">
          <h2 style="margin:0 0 16px;color:#0f172a">New contact form submission</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:6px 0;color:#64748b;width:110px">Name</td><td style="padding:6px 0;color:#0f172a"><strong>${safe.name}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${safe.email}" style="color:#0ea5e9">${safe.email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Phone</td><td style="padding:6px 0;color:#0f172a">${safe.phone}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Service</td><td style="padding:6px 0;color:#0f172a">${safe.subject}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f1f5f9;border-radius:8px;color:#0f172a">${safe.message}</div>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }
}

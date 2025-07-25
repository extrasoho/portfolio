import { NextRequest, NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if Mailgun environment variables are set
    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN;
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!mailgunApiKey || !mailgunDomain || !recipientEmail) {
      console.error("Missing Mailgun configuration");
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Initialize Mailgun client
    const mg = mailgun.client({
      username: "api",
      key: mailgunApiKey,
    });

    // Send email
    const messageData = {
      from: `Contact Form <noreply@${mailgunDomain}>`,
      to: recipientEmail,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      "h:Reply-To": email,
    };

    await mg.messages.create(mailgunDomain, messageData);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

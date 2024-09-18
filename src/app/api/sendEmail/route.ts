import nodemailer from "nodemailer";

export async function POST(request: any) {
	const { name, email, message } = await request.json();

	if (!name || !email || !message) {
		return new Response("Please fill out all fields.", { status: 400 });
	}

	// Set up the Nodemailer transport using SMTP (Gmail or other service)
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465, // or 587 for TLS
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: email, // Sender's email
			to: process.env.EMAIL_USER, // Your email to receive the message
			subject: `New message from ${name}`,
			text: message,
			html: `<p>You have a new message from <b>${name}</b> (${email}):</p><p>${message}</p>`,
		});

		return new Response("Email sent successfully!", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Error sending email.", { status: 500 });
	}
}

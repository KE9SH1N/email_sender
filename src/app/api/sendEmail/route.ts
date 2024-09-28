import nodemailer from "nodemailer";

export async function POST(request: Request) {
	const { name, message } = await request.json();

	if (!name || !message) {
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
			from: process.env.EMAIL_USER,
			to: "mishelgb42@gmail.com",
			subject: `${name} Moving Estimate Request 3`,
			text: message,
			html: `<div>
						<p>Name: <span><b>${name}</b></span></p>
						<p>Phone Number: <span><b>${message}</b></span></p>
					</div>`,
		});

		return new Response("Email sent successfully!", { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Error sending email.", { status: 500 });
	}
}

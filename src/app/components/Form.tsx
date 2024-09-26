"use client";
import { useState } from "react";

const Form = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("Sending...");

		const response = await fetch("/api/sendEmail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (response) {
			setStatus("Email sent successfully!");
		} else {
			setStatus("Failed to send email.");
		}
	};

	return (
		<div className="w-full bg-purple-200">
			<div className="min-h-screen w-1/5 mx-auto flex flex-col items-center justify-center">
				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 w-full mx-auto rounded-lg shadow-md"
				>
					<h1 className="text-2xl mb-4">Contact Us</h1>
					<div className="mb-4">
						<label className="block mb-2">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="border p-2 w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="border p-2 w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2">Message</label>
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							className="border p-2 w-full"
							required
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-500 w-full text-white p-2 rounded"
					>
						Send
					</button>
				</form>
				<p className="mt-4">{status}</p>
			</div>
		</div>
	);
};

export default Form;

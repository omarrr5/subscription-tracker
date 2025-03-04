import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USER } from "../config/env.js";



export const accountEmail = EMAIL_USER;
export const accountPassword = EMAIL_PASSWORD;

// Check if credentials are loaded correctly
if (!accountEmail || !accountPassword) {
    console.error("❌ Missing email credentials. Check your .env file.");
    process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: accountEmail,
        pass: accountPassword,
    },
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP Connection Error:", error);
    } else {
        console.log("✅ SMTP is ready to send emails!");
    }
});

export default transporter;

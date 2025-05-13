import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host:"smtp-relay.brevo.com",
    port:587,
    auth: {
        user: process.env.SMPT_USER,// ✅ Use correct variable name
        pass: process.env.SMPI_PASSWORD,  // ✅ Use App Password
    },
});

export default transporter;

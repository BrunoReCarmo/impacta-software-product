import * as dotenv from 'dotenv';
import nodemailer from "nodemailer";
import smtpTransport from 'nodemailer-smtp-transport';
dotenv.config();

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    name: "smtp.gmail.com",
    host: 'smtp.gmail.com',
    port: 587,
    sendEmail: true,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.KEY_GOOGLE_APP as string,
    },
}));

export = transporter;
import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link, subject, message, imageUrl) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: subject || "Activation link",
      text: `${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #007BFF;">Welcome!</h1>
          <p>${message}</p>
          <p>Click the link below to activate your account:</p>
          <a href="${link}" style="padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Activate Now</a>
          <p>If the button doesn't work, copy and paste this link into your browser: <a href="${link}">${link}</a></p>
          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="Activation Image" style="max-width: 100%; margin-top: 20px;" />`
              : ""
          }
          <footer style="margin-top: 20px; color: #888;">
            <p>Thank you for joining us!</p>
            <p>&copy; 2024 Your Company Name</p>
          </footer>
        </div>
      `,
    });
  }
}

export default new MailService();

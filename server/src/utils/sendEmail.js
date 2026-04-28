const nodemailer = require('nodemailer');

const sendNotificationEmail = async ({ to, senderName, senderEmail, adminUrl }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Notifications" <${process.env.EMAIL_USER}>`,
    to,
    subject: `📬 New message from ${senderName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #131313; color: #e5e2e1; padding: 40px; border-radius: 12px;">
        <h2 style="color: #6366f1; margin-bottom: 8px;">New Contact Message</h2>
        <p style="color: #9e9a97;">You received a new message on your portfolio.</p>
        <hr style="border-color: #2d2d2d; margin: 24px 0;" />
        <p><strong>From:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <hr style="border-color: #2d2d2d; margin: 24px 0;" />
        <a href="${adminUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          View Message in Admin
        </a>
        <p style="margin-top: 32px; font-size: 12px; color: #555;">This is an automated notification from your portfolio site.</p>
      </div>
    `,
  });
};

module.exports = sendNotificationEmail;

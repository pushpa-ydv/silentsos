const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_EMAIL_PASS,
  },
});

async function sendAlertEmail(location, videoBuffer, toEmail) {
  const mailOptions = {
    from: `"SilentSOS" <${process.env.ALERT_EMAIL}>`,
    to: toEmail,
    subject: "🚨 SOS Alert Received!",
    text: `📍 Location: ${location.latitude}, ${location.longitude}`,
    attachments: [
      {
        filename: "sos-video.webm",
        content: videoBuffer,
        contentType: "video/webm",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Email alert sent");
}

module.exports = sendAlertEmail;

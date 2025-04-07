const nodemailer = require("nodemailer");

const sendInvoiceEmail = async (
  invoiceNumber,
  companyEmail,
  companyName,
  recepientEmail,
  subject,
  createdDate,
  recepientName,
  pdfBuffer
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const formattedDate = new Date(createdDate).toLocaleString();
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h1 style="color: #007BFF; font-size: 24px;">Invoice Ready for ${recepientEmail}</h1>
      <p style="font-size: 18px;">Hello ${recepientName},</p>
      <p style="font-size: 16px;">
        Please find your invoice for <b>${formattedDate}</b> attached.
      </p>
      <img src="https://yourcompany.com/logo.png" alt="Company Logo" width="200" style="margin-top: 20px;">
      <p style="font-size: 14px; color: #777;">Thank you for your business!</p>
    </div>
  `;
  const mailOptions = {
    from: `"From ${companyName}- ${companyEmail}" incorporation with <${process.env.EMAIL}>`,
    to: `${recepientEmail}`,
    subject: `${subject} - ${invoiceNumber}`,
    html: htmlBody,
    attachments: [
      {
        filename: `Invoice-${invoiceNumber}.pdf`,
        content: pdfBuffer,
      },
    ],
  };
  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully.");
};

module.exports = { sendInvoiceEmail };

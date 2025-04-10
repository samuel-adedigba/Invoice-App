const generateInvoicePdf = require("../helper/generateInvoicePdf");
const { sendInvoiceEmail } = require("../helper/sendInvoiceEmail");

const sendInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const pdfBuffer = await generateInvoicePdf(invoiceData);
    await sendInvoiceEmail(
      invoiceData.invoiceNumber,
      invoiceData.companyEmail,
      invoiceData.companyName,
      invoiceData.recepientEmail,
      invoiceData.subject,
      invoiceData.createdDate,
      invoiceData.recepientName,
      pdfBuffer
    );

    res.status(200).json({ message: "Invoice sent successfully!" });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to send invoice",
        error: error.toString(),
      });
    }
  }
};

module.exports = sendInvoice;

const express = require('express');
const { getInvoiceByEmail, getInvoiceById } = require('../helper/googleSheetHelper');

const app = express();
app.use(express.json());

const invoiceLabels = [
  "invoiceId", "companyName", "companyEmail", "companyNumber", "companyWebsite", "companyAddress",
  "streetAddress", "recepientNumber", "recepientName", "recepientEmail", "recepientAddress",
   "subject", "invoiceNumber", "reference", "invoiceDate", "dueDate",
   "items", "compliment", "terms", "createdDate", "total","subTotal", "discount"
];

const transformInvoiceData = (invoiceData) => {
  return invoiceData.map((invoice) => {
    let invoiceObj = {};

    invoice.forEach((item, index) => {
      invoiceObj[invoiceLabels[index]] = item;
    });
    if (invoiceObj.items) {
      try {
        invoiceObj.items = JSON.parse(invoiceObj.items);
      } catch (e) {
        console.error("Error parsing items:", e);
        invoiceObj.items = [];
      }
    }

    return invoiceObj;
  });
};

app.get('/get-invoices', async (req, res) => {
  const { companyEmail } = req.query;
  if (!companyEmail) {
    return res.status(400).json({
      message: "Make sure you are logged in with your company's email address",
    });
  }

  try {
    const invoices = await getInvoiceByEmail(companyEmail);
    const transformedInvoices = transformInvoiceData(invoices);
    res.status(200).json({
      message: "Here is the data of your company's invoices",
      invoices: transformedInvoices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch invoices",
      error: error.message,
    });
  }
});

app.get('/get-invoice/:invoiceId', async (req, res) => {
  const { invoiceId } = req.params;
  if (!invoiceId) {
    return res.status(400).json({
      message: "Invoice ID is required",
    });
  }

  try {
    const invoice = await getInvoiceById(invoiceId);
    if (!invoice || invoice.length === 0) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    const transformedInvoice = transformInvoiceData(invoice)[0]; 
    res.status(200).json({
      message: "Here are the details of your invoice",
      invoice: transformedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch invoice",
      error: error.message,
    });
  }
});

module.exports = app;

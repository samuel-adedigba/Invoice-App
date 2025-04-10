const express = require('express');
const { getInvoiceByEmail, getInvoiceById } = require('../helper/googleSheetHelper');
const { format } = require('date-fns');

const app = express();
app.use(express.json());


const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), 'd MMMM yyyy'); // 2 June 2025
  } catch {
    return dateString;
  }
};


const invoiceLabels = [
  "invoiceId", "companyName", "companyEmail", "companyNumber", "companyWebsite", "companyAddress",
  "streetAddress", "recepientNumber", "recepientName", "recepientEmail", "recepientAddress",
   "subject", "invoiceNumber", "reference", "invoiceDate", "dueDate",
   "items", "compliment", "terms", "createdDate", "total","subTotal", "discount","currency"
];

const transformInvoiceData = (invoiceData) => {
  return invoiceData.map((invoice) => {
    let invoiceObj = {};

    invoice.forEach((item, index) => {
      invoiceObj[invoiceLabels[index]] = item;
    });

    ['createdDate', 'invoiceDate', 'dueDate'].forEach((dateField) => {
      if (invoiceObj[dateField]) {
        invoiceObj[dateField] = formatDate(invoiceObj[dateField]);
      }
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
  const { companyEmail, offset = 0, limit = 10 } = req.query;

  if (!companyEmail) {
    return res.status(400).json({
      message: "Make sure you are logged in with your company's email address",
    });
  }

  try {
    const invoices = await getInvoiceByEmail(companyEmail);
    
    invoices.sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      if (dateA - dateB !== 0) return dateA - dateB; 
      return b.invoiceNumber - a.invoiceNumber; 
    });

    const paginatedInvoices = invoices.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    const transformedInvoices = transformInvoiceData(paginatedInvoices);

    const totalInvoice = invoices.length;

    res.status(200).json({
      message: "Here is the data of your company's invoices",
      total_invoice: totalInvoice,
      offset: parseInt(offset),
      limit: parseInt(limit),
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

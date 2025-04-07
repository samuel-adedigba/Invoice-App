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

// app.get('/get-invoices', async (req, res) => {
//   const { companyEmail } = req.query;
//   if (!companyEmail) {
//     return res.status(400).json({
//       message: "Make sure you are logged in with your company's email address",
//     });
//   }

//   try {
//     const invoices = await getInvoiceByEmail(companyEmail);
//     const transformedInvoices = transformInvoiceData(invoices);
//     const totalInvoice = await transformInvoiceData(invoices).length
//     res.status(200).json({
//       message: "Here is the data of your company's invoices",
//        total: totalInvoice,
//       invoices: transformedInvoices,     
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch invoices",
//       error: error.message,
//     });
//   }
// });

app.get('/get-invoices', async (req, res) => {
  const { companyEmail, page = 1, limit = 10, search } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

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
      if (dateA !== dateB) return dateA - dateB; 
      return b.invoiceNumber - a.invoiceNumber; 
    });

    const paginatedInvoices = invoices.slice(offset, offset + parseInt(limit));

    const transformedInvoices = transformInvoiceData(paginatedInvoices);

    const totalInvoice = invoices.length;
    const totalPage = Math.ceil(totalInvoice / parseInt(limit));

    res.status(200).json({
     message: "Here is the data of your company's invoices",
      total_invoice: totalInvoice,
      current_page: parseInt(page),
      limit: parseInt(limit),
      total_page: totalPage,
      invoices: transformedInvoices,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch invoices",
      error: error.message,
    });
  }
});

// app.get('/get-invoices', async (req, res) => {
//   const { companyEmail, page = 1, limit = 10, search } = req.query;
//   const offset = (parseInt(page) - 1) * parseInt(limit);

//   if (!companyEmail) {
//     return res.status(400).json({
//       message: "Make sure you are logged in with your company's email address",
//     });
//   }

//   try {
//     const searchTerm = search ? search.toString() : '';
//     const invoices = await getInvoiceByEmail(companyEmail);

//     const filteredInvoice = invoices.filter((invoice) => 
//       invoice.companyEmail === companyEmail &&
//       (!searchTerm || invoice.invoiceNumber.toString().includes(searchTerm))
//    );
   
//     console.log("Search Term:", searchTerm);
//     //console.log("Invoice:", invoices);
//     const sortedInvoice = filteredInvoice
//     .sort((a, b) => {
//       const dateA = new Date(a.createdDate);
//       const dateB = new Date(b.createdDate);
//       if (dateA !== dateB) return dateA - dateB; 
//       return b.invoiceNumber - a.invoiceNumber; 
//     });

//     const paginatedInvoices = sortedInvoice.slice(offset, offset + parseInt(limit));

//     const transformedInvoices = transformInvoiceData(paginatedInvoices);

//     const totalInvoice = sortedInvoice.length;
//     const totalPage = Math.ceil(totalInvoice / parseInt(limit));

//     res.status(200).json({
//       message: "Here is the data of your company's invoices",
//       total_invoice: totalInvoice,
//       current_page: parseInt(page),
//       limit: parseInt(limit),
//       total_page: totalPage,
//       invoices: transformedInvoices,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to fetch invoices",
//       error: error.message,
//     });
//   }
// });


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

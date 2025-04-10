const express = require("express");
const fs = require("fs");
const path = require("path");
const generateInvoicePdf = require("../helper/generateInvoicePdf");
const handlebars = require("handlebars");


const downloadInvoice= async (req, res) => {
  try {
    const invoiceData = req.body; 
    const pdfBuffer = await generateInvoicePdf(invoiceData); 

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoiceData.invoiceNumber}.pdf`
    });

    return res.send(pdfBuffer);
  
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    if (!res.headersSent) {
       res.status(500).json({
        message: "Failed to generate invoice PDF",
        error: error.toString(),
      });
    }
  }
};

const previewInvoiceHtml = async (req, res) => {
  try {
    const invoiceData = req.body;
    const templatePath = path.join(__dirname, "../doc/invoice.html");
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const template = handlebars.compile(htmlTemplate);
    const html = template(invoiceData);

    res.set({
      "Content-Type": "text/html",
    });

    return res.send(html);
  } catch (error) {
    console.error("Error generating invoice HTML preview:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Failed to generate invoice HTML preview",
        error: error.toString(),
      });
    }
  }
};

module.exports = {downloadInvoice, previewInvoiceHtml};

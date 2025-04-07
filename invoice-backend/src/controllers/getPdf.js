const express = require("express");
const fs = require("fs");
const path = require("path");
const generateInvoicePdf = require("../helper/generateInvoicePdf");

const router = express.Router();

const getPDF= async (req, res) => {
  try {
    const invoiceData = req.body; 
    const pdfBuffer = await generateInvoicePdf(invoiceData); 

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoiceData.invoiceNumber}.pdf`,
    });

    res.send(pdfBuffer);
    res.status(200).json({ message: "Invoice PDF generated successfully!" });
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    res.status(500).json({ message: "Failed to generate invoice PDF", error: error.toString() });
  }
};

module.exports = getPDF;

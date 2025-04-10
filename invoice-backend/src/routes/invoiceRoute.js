const express = require('express');
const {createInvoice,getInvoice } = require('../controllers/invoice');
const sendInvoice = require("../controllers/sendInvoice");
const {downloadInvoice, previewInvoiceHtml} = require("../controllers/downloadInvoice")
const router = express.Router()

router.post( "/create", createInvoice  )
router.get('/:invoiceNumber', getInvoice);
router.post("/send-invoice", sendInvoice);
router.post("/generate-pdf", downloadInvoice);
router.post("/preview-html", previewInvoiceHtml);
module.exports = router
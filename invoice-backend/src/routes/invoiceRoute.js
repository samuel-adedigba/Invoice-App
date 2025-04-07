const express = require('express');
const {createInvoice,getInvoice } = require('../controllers/invoice');
const sendInvoice = require("../controllers/sendInvoice");
const getPDF = require("../controllers/getPdf")
const router = express.Router()

router.post( "/create", createInvoice  )
router.get('/:invoiceNumber', getInvoice);
router.post("/send-invoice", sendInvoice);
router.post("/generate-pdf", getPDF);
module.exports = router
const express = require('express')
const {createInvoice,getInvoice } = require('../controllers/invoice')
const router = express.Router()

router.post( "/create", createInvoice  )
router.get('/:invoiceNumber', getInvoice);

module.exports = router
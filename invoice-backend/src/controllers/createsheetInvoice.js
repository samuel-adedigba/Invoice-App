const express = require('express')
const { appendInvoice } = require('../helper/googleSheetHelper')
const app = express()

app.use(express.json())

app.post('/create-invoice',  async(req, res)=>{
    const { 
        companyName, companyEmail, companyNumber , companyWebsite , companyAddress,
        streetAddress, recepientNumber, recepientName, recepientEmail, recepientAddress,
        subject, invoiceNumber, reference, invoiceDate, dueDate, 
        items, compliment, terms, total ,subTotal, discount, currency
    }  = req.body;
    if (
        !companyName || !companyEmail || !companyNumber || !companyAddress 
        || !recepientName || !recepientEmail || !recepientAddress ||
        !subject || !invoiceNumber 
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      

    try {
        await appendInvoice({
            companyName, companyEmail, companyNumber , companyWebsite , companyAddress,
            streetAddress, recepientNumber, recepientName, recepientEmail, recepientAddress,
            subject, invoiceNumber, reference, invoiceDate, dueDate, 
            items, compliment, terms, total ,subTotal, discount, currency
    })
    res.status(201).json({
        message: 'Invoice created successfully'
    })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add Invoice',
            error: error.message,
          });          
    }
} )

module.exports = app;
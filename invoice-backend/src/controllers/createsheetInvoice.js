const express = require('express')
const { appendInvoice } = require('../helper/googleSheetHelper')
const app = express()

app.use(express.json())

app.post('/create-invoice',  async(req, res)=>{
    const { 
        companyName, companyEmail, companyNumber , companyWebsite , companyAddress,
        streetAddress, recipientNumber, recepientName, recepientEmail, recepientAddress, recepientStreetAddress,
        subject, invoiceNumber, reference, invoiceDate, dueDate, invoiceValue, 
        items, compliment, terms
    }  = req.body;
    if (
        !companyName || !companyEmail || !companyNumber || !companyAddress ||
        !recipientNumber || !recepientName || !recepientEmail || !recepientAddress ||
        !subject || !invoiceNumber || !invoiceDate || !invoiceValue || !items
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      

    try {
        await appendInvoice({
            companyName, companyEmail, companyNumber , companyWebsite , companyAddress,
            streetAddress, recipientNumber, recepientName, recepientEmail, recepientAddress, recepientStreetAddress,
            subject, invoiceNumber, reference, invoiceDate, dueDate, invoiceValue, 
            items, compliment, terms
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
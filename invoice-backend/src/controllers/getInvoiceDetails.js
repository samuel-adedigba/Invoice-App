const express = require('express')
const  {getInvoiceByEmail}  = require('../helper/googleSheetHelper')

const app = express()
app.use(express.json())


const invoiceLabels = [
  "invoiceId",
  "companyName",
  "companyEmail",
  "companyNumber",
  "companyWebsite",
  "companyAddress",
  "streetAddress",
  "recipientNumber",
  "recipientName",
  "recipientEmail",
  "recipientAddress",
  "recipientStreetAddress",
  "subject",
  "invoiceNumber",
  "reference",
  "invoiceDate",
  "dueDate",
  "invoiceValue",
  "items",
  "compliment",
  "terms",
  "createdDate",
];



const transformInvoiceData = (invoiceData) => {
  return invoiceData.map((invoice) => {
    let invoiceObj = {};
    
    invoice.forEach((item, index) => {
      // Use the index to map the value to the correct label
      invoiceObj[invoiceLabels[index]] = item;
    });
    
    // Parse items as an array if it's in stringified JSON format
    if (invoiceObj.items) {
      invoiceObj.items = JSON.parse(invoiceObj.items);
    }

    return invoiceObj;
  });
};


app.get( '/get-invoice/:companyEmail', async(req, res)=>{
      const { companyEmail  } = req.params
      if(!companyEmail){
        return res.status(400).json({
            message: "Make sure you are logged in with your company's email address"
        })
      }

      try {
         const invoice =await  getInvoiceByEmail( companyEmail)
         const transformInvoice = transformInvoiceData(invoice);
      res.status(201).json({
        message: "Here is the data of your Comapny's account",
        invoices: transformInvoice
      })
      } catch (error) {
        res.status(500).json({
            message: "Failed to fetch invoices",
            error: error.message
        })
      }

} )
module.exports = app;
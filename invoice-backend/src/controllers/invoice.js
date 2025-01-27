const Invoice = require('../models/invoiceModel')


const createInvoice = async (req, res ) =>{
    try {
        const { invoiceNumber, ...otherData } = req.body;
        const exsitingInvoiceNumber = await Invoice.findOne({invoiceNumber})
        if(exsitingInvoiceNumber){
           return  res.status(400).json( { message: `Generate another Invoice number. This invoice number: ${invoiceNumber} already exist` } )
        }

        const newInvoice = new Invoice({ invoiceNumber, ...otherData });
        await newInvoice.save()
        res.status(201).json( { message: " Invoice created successfully",
            invoice: {
                id: newInvoice._id,
                invoiceNumber: newInvoice.invoiceNumber,
                createdAt: newInvoice.createdAt,
              }, 
        }   )
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
              message: "Duplicate key error. Please ensure unique fields like invoiceNumber.",
              error: error.message,
            });
          }
          res.status(500).json({ message: error.message });
    }
}

const getInvoice = async (req, res) =>{
    try {
        const { invoiceNumber } = req.params
        const invoice = await Invoice.findOne({invoiceNumber})
        if (!invoice) {
            return res.status(404).json({ message: `Invoice with number ${invoiceNumber} not found.` });
          }
        res.status(200).json( {   
            message: "Invoice details",
            invoice,            
          } )
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the invoice.",
            error: error.message,
          });
    }
}


module.exports = { createInvoice, getInvoice };
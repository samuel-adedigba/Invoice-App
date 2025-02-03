const mongoose = require("mongoose");

const InvoiceModel = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  companyEmail: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true, 
    match: [/.+@.+\..+/, "Please enter a valid email address"] 
  },
  companyNumber: { type: String, required: true, trim: true },
  companyWebsite: { type: String, trim: true },
  companyAddress: { type: String, required: true, trim: true },
  streetAddress: { type: String, trim: true },
  recipientNumber: { type: String, required: true, trim: true },
  recipientName: { type: String, required: true, trim: true },
  recipientEmail: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true, 
    match: [/.+@.+\..+/, "Please enter a valid email address"] 
  },
  recipientAddress: { type: String, required: true, trim: true },
  recipientStreetAddress: { type: String, trim: true },
  subject: { type: String, required: true, trim: true },
  invoiceNumber: { type: String, required: true, unique: true, trim: true }, 
  reference: { type: String, trim: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  invoiceValue: { type: Number, required: true },
  items: [
    {
      itemName: { type: String, required: true, trim: true },
      itemDescription: { type: String, trim: true },
      quantity: { type: Number, required: true, min: 0 }, 
      price: { type: Number, required: true, min: 0 }, 
      amount: { type: Number, required: true, min: 0 }, 
    },
  ],
  compliment: { type: String, trim: true, default: "Thank you for your business!" },
  terms: { type: String, trim: true, required: true },
  createdDate: { type: Date, default: Date.now },
});



const Invoice = mongoose.model("Invoice", InvoiceModel);

module.exports = Invoice;

const {google }= require('googleapis')
const { v4:uuidv4 } = require('uuid')
const fs = require('fs');
const Invoice = require("../models/invoiceModel")
require('dotenv').config();

const spreadsheetId = process.env.GOOGLE_SHEET_ID
const keyFile = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets( { version: 'v4', auth  } )
const id = uuidv4()

async function appendInvoice(data) {
    data.id = uuidv4();
    const createdDate = new Date().toISOString(); 
    data.createdDate = createdDate;
    const values = [
        [
            data.id,
            data.companyName, data.companyEmail, data.companyNumber, data.companyWebsite, data.companyAddress,
            data.streetAddress, data.recipientNumber, data.recepientName, data.recepientEmail, data.recepientAddress, data.recepientStreetAddress,
            data.subject, data.invoiceNumber, data.reference,
            new Date(data.invoiceDate).toISOString(),
            new Date(data.dueDate).toISOString(),
            data.invoiceValue,
            JSON.stringify(data.items), 
            data.compliment, data.terms,
           createdDate,
          ],
    ]
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:Z',
        valueInputOption: 'USER_ENTERED',
        resource: { values  },
    })
    console.log("Spreadsheet ID:", process.env.GOOGLE_SHEET_ID);
}

async function getInvoiceByEmail(email) {
    const results = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A2:Z',
    })

    const rows = results.data.values || [] ;
    const filtered = rows.filter( (row) => row[2]  === email );
    return filtered;
}

module.exports = { appendInvoice, getInvoiceByEmail }
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CREDENTIALS_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
const id = uuidv4();

async function appendInvoice(data) {
  data.id = uuidv4();
  const createdDate = new Date().toISOString();
  data.createdDate = createdDate;
  const values = [
    [
      data.id,
      data.companyName,
      data.companyEmail,
      data.companyNumber,
      data.companyWebsite,
      data.companyAddress,
      data.streetAddress,
      data.recipientNumber,
      data.recepientName,
      data.recepientEmail,
      data.recepientAddress,
      data.subject,
      data.invoiceNumber,
      data.reference,
      new Date(data.invoiceDate).toISOString(),
      new Date(data.dueDate).toISOString(),
      JSON.stringify(data.items),
      data.compliment,
      data.terms,
      data.createdDate,
      data.total,
      data.subTotal,
      data.discount,
      data.currency,
    ],
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:Z",
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
}

async function getInvoiceByEmail(email) {
  const results = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A2:Z",
  });

  const rows = results.data.values || [];
  const filtered = rows.filter((row) => row[2] === email);
  return filtered;
}
async function getInvoiceById(invoiceId) {
  const results = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A2:Z",
  });

  const rows = results.data.values || [];
  const filtered = rows.filter((row) => row[0] === invoiceId);
  return filtered;
}

module.exports = { appendInvoice, getInvoiceByEmail, getInvoiceById };

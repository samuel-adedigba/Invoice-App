const fs = require("fs"); 
const path = require("path"); 
const puppeteer = require("puppeteer"); 
const handlebars = require("handlebars"); 

const generateInvoicePdf = async (invoiceData) => {
  try {
    const templatePath = path.join(__dirname, "../doc/invoice.html");
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const template = handlebars.compile(htmlTemplate);
    const html = template(invoiceData);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    throw new Error("PDF generation error: " + error.message);
  }
};

module.exports = generateInvoicePdf;
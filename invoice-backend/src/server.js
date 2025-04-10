const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("../src/db");
const Users = require( "./routes/loginRoute");
const Invoice = require("./routes/invoiceRoute");
const createInvoiceRoute = require("./controllers/createsheetInvoice");
const getInvoice = require("./controllers/getInvoiceDetails");
const path = require("path");


// require('dotenv').config();
// Determine environment from NODE_ENV; default to development if not set
const env = process.env.NODE_ENV || "development";
const envFilePath = path.resolve(__dirname, `../.env.${env}`);

// Load environment variables from the correct file
require("dotenv").config({ path: envFilePath });
console.log(`Environment: ${env}`);
console.log(`Loaded environment file: ${envFilePath}`);

app.use(express.json());
app.use(cors())
connectDB()
.then(() => {
    console.log("Database connection initialized");
})
.catch((err) => {
    console.error("Failed to initialize database connection:", err.message);
   // process.exit(1); 
});

app.get("/ast", (req,res)=>{
    res.send("Welcome to Samuel T. Adedigba's Invoice App")
})

app.use("/ast/user", Users)
app.use("/invoice", Invoice)
app.use("/google", createInvoiceRoute)
app.use("/google", getInvoice)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})

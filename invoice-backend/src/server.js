const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("../src/db");
const Users = require( "./routes/loginRoute")

require('dotenv').config();
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

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})

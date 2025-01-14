const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);        ;
    console.log("Connected to Database ...")
    return connection
    } catch (error) {
        console.log(" Unable to connect to Database ...", error.message)
        throw error;
    }
}

module.exports = connectDB
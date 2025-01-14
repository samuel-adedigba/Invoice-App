const mongoose = require('mongoose');


const UserModel = new mongoose.Schema({
 email: { type: String, required : true, unique : true , trim:true , lowercase: true}, 
 password: { type: String, required: true },
})

const User = mongoose.model( "User", UserModel )

module.exports = User;
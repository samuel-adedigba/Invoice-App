const User = require("../models/loginModel");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');


const UserSignUp = async (req, res) =>{
    try {
         const { email, password } = req.body;
         const id = uuidv4();
         const existingUser = await User.findOne({ email})
         if(existingUser){
            return res.status(400).json( {message: "User already exist" } )
         }

         const new_user = new User({ email, password, id } );
         await new_user.save();

         res.status(200).json( {message: "User Created successfully", new_user })
    } catch (error) {
        res.status(500).json( {message: error.message })
    }   
};


const UserLogin = async (req, res) =>{
    try {
        const { id,email , password } = req.body
        const checkEmail = await User.findOne( {email})
        if(!checkEmail){
            return res.status(400).json( {message: "Invalid email" })
        }
        if(checkEmail.password !== password ){
            return res.status(500).json( {message: "Invalid password"})
        }
        const token = jwt.sign( { id: checkEmail.id, email: checkEmail.email},  process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        if(token){
             res.status(200).json({ message: "User login succesful" ,  
                user:{
                id: checkEmail.id,
                email: checkEmail.email
             },
            token  
        }) }
    } catch (error) {
        res.status(500).json({error: error.message})        
    }
};

module.exports = { UserLogin, UserSignUp };
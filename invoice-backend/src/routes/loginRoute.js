const express = require('express');
const { UserSignUp,  UserLogin } = require("../controllers/login")
const router = express.Router()

router.get("/login", UserLogin);
router.post("/signup", UserSignUp);

module.exports = router;
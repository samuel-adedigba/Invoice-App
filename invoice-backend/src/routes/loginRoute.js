const express = require('express');
const { UserSignUp,  UserLogin } = require("../controllers/login")
const router = express.Router()

router.post("/login", UserLogin);
router.post("/signup", UserSignUp);

module.exports = router;
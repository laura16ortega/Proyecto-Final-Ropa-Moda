const router = require("express").Router();
const { registerCtrl, loginCtrl } = require("../controllers/authController");
const User = require("../models/userModels");

//Register User
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);


module.exports = router;
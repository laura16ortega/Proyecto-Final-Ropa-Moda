"use strict";

var router = require("express").Router();

var _require = require("../controllers/authController"),
    registerCtrl = _require.registerCtrl,
    loginCtrl = _require.loginCtrl,
    logoutCtrl = _require.logoutCtrl,
    callbackCtrl = _require.callbackCtrl; //Register User


router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", logoutCtrl); //hacer forgot password

router.get("/callback", callbackCtrl); //router.get('/google', googleCtrl)

module.exports = router;
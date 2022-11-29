const router = require("express").Router();
const { registerCtrl, loginCtrl,logoutCtrl, callbackCtrl } = require("../controllers/authController");


//Register User
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", logoutCtrl);
//hacer forgot password

router.get("/callback", callbackCtrl)
//router.get('/google', googleCtrl)


module.exports = router;
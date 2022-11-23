const router = require("express").Router();
const { registerCtrl, loginCtrl,googleCtrl, callbackCtrl } = require("../controllers/authController");


//Register User
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
//hacer logout
//hacer forgot password

router.get("/callback", callbackCtrl)
//router.get('/google', googleCtrl)


module.exports = router;
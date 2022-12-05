const router = require("express").Router()
const { stripeCheckout } = require("../controllers/stripeController")
const { verifyToken } = require("../services/JwtServices")

router.post("/stripe", verifyToken, stripeCheckout);

module.exports = router;
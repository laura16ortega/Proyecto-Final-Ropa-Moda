const router = require("express").Router()
const { stripeCheckout, stripeGetData } = require("../controllers/stripeController")
const { verifyToken } = require("../services/JwtServices")

router.post("/stripe", verifyToken, stripeCheckout);
router.get("/stripe", stripeGetData) // Admin

module.exports = router;
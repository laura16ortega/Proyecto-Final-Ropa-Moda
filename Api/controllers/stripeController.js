const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
// const Product = require ("../models/productModels")

exports.stripeCheckout = async(req, res) => {
    try {
        const cart = req.body
        // console.log("req cart body: ", req.body)
        if (!cart) return res.status(500).json({ message: "Por favor agrega items al carro"})
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: await cart.map((product) => {
                // const productFromCart = Product.findById(product._id).lean()
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name
                        },
                        unit_amount: product.price
                    },
                    quantity: product.quantity
                }
            }), 
            success_url:`http://127.0.0.1:5173/`, // Redireccionar a home(front)
            cancel_url:`http://127.0.0.1:5173/cart` // Redireccionar a cart
        })
        res.json({ url: session.url })
    } catch (error) {
        console.log("stripe error: ", error)
        res.status(500).json(error)
    }
}

// https://stripe.com/docs/api/charges/list
// Fecha de transaccion: new Date(created * 1000)
exports.stripeGetData = async(req, res) => {
    try {
        const charges = await stripe.charges.list({
            limit: 3,
          });
        res.status(200).json(charges)
    } catch (e) {
        console.log("stripe get error: ", e)
    }
}
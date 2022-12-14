const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
// const Product = require ("../models/productModels")
const orderController = require("./orderController");

const toCent = amount => {
   const str = amount.toString()
   const [int] = str.split('.')

   return Number(amount.toFixed(2).replace('.', '').padEnd(int.length === 1 ? 3 : 4, '0'))
}

exports.stripeCheckout = async (req, res) => {
   try {
      const cart = req.body
      // console.log("req cart body: ", req.body)
      if (!cart) return res.status(500).json({ message: "Por favor agrega items al carro" })
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
                  unit_amount: toCent(product.price)
               },
               quantity: product.quantity
            }
         }),
         success_url: `http://127.0.0.1:5173/cart/success`, // Redireccionar a home(front)
         cancel_url: `http://127.0.0.1:5173/cart` // Redireccionar a cart
      })
      res.json({ url: session.url })
   } catch (error) {
      console.log("stripe error: ", error)
      res.status(500).json(error)
   }
}

/*
no cart data
exports.stripeWebhook = async (req, res) => {
   try {
      //console.log("Req.body.type: ", req.body.type)
      const event = req.body
      const orderData = {
         orderItems, 
         shippingAddress, 
         paymentMethod: "stripe", 
         totalPrice,
      }

      switch (event.type) {
         case 'product.created':
            const productCreated = event.data.object
            console.log("product.created object: ", productCreated)
            // orderData.orderItems.push({name: productCreated.name, qty: ???, image: productCreated.images[0], productId: ???})
            break;
         case 'price.created':
            const priceCreated = event.data.object
            // orderData.orderItems({price: priceCreated.unitAmount}) // where priceCreated.product === orderItem.id
            console.log("price.created object: ", priceCreated)
            break;
         case 'charge.succeeded':
            const chargeSucceeded = event.data.object
            // orderData.totalPrice = chargeSucceeded.amount // address: null, null, null

            console.log("charge.succeeded object: ", chargeSucceeded)
            break;
         case 'payment_intent.succeeded':
            const payment_intentSucceeded = event.data.object
            console.log("payment_intent.succeeded object: ", payment_intentSucceeded)
            break;
         case 'payment_intent.created': // Enviar los datos guardados en la orden
            const payment_intentCREATED = event.data.object
            console.log("payment_intent.created object: ", payment_intentCREATED)
            break;
         case 'checkout.session.completed':
            const sessionCompleted = event.data.object;
            console.log("sessioncompleted")
            // Order body: orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice,
            //orderController({
            //   orderItems: ,
            //})
            //console.log("Checkout session completed type: ", sessionCompleted)
            break;
         default:
            console.log(`Unhandled event type ${event.type}`);
      }


      // Return a 200 response to acknowledge receipt of the event
      res.status(200).end()
   } catch (e) {
      console.log("webhook error: ", e)
      res.status(400).json(e)
   }
}
*/

// https://stripe.com/docs/api/charges/list
// Fecha de transaccion: new Date(created * 1000)
exports.stripeGetData = async (req, res) => {
   try {
      const charges = await stripe.charges.list({
         limit: 3,
      });
      res.status(200).json(charges)
   } catch (e) {
      console.log("stripe get error: ", e)
   }
}
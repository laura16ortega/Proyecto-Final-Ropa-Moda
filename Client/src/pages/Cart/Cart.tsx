import { Container, Box, Button, Grid, Typography, Link, Alert, Collapse } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import s from "./Cart.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paypalImg from "../../assets/images/paypal.png";

import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeCartItem,
  clearCart
} from "../../redux/slices/cartSlice";

import { useNotification } from '../../components/UseNotification/UseNotification';
import type { mappedDbProductsType } from "../../redux/types/productTypes"
import { getAllProducts } from "../../redux/thunk-actions/testActions";
import CartSlider from "../../components/CartSlider/CartSlider";
import { stripeCheckout } from "../../redux/thunk-actions/cartActions";
import { unwrapResult } from '@reduxjs/toolkit'
import { createOrder } from "../../redux/thunk-actions/orderActions";

const Cart = () => {
  const { displayNotification } = useNotification();
  const [openPaypal, setOpenPaypal] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false)
  const dispatch = useAppDispatch();
  const { cart, cartLoading, cartError, checkoutLoad } = useAppSelector((state) => state.cart);
  const { allData, loading } = useAppSelector((state) => state.data);
  const { user } = useAppSelector(state => state.auth)

  const userToken: string = localStorage.getItem("jwt") || ""

  // console.log("Cart state:", cart) --- []
  // console.log("Cart localstorage: ", cartProd) --- [{...}]

  const subTotalPrice = cart?.reduce((total, item) => total + item.price * item.quantity,0);
  const itemRes = cart?.reduce((total, item) => total + item.quantity, 0);

  const priceData = [
    { title: "Subtotal", price: subTotalPrice },
    { title: "Envio", price: 0 },
    { title: "Impuestos", price: 0 },
  ];

  const handleIncreaseCart = (productId: string) => {
    dispatch(increaseCartQuantity(productId));
  };

  const handleDecreaseCart = (productId: string) => {
    dispatch(decreaseCartQuantity(productId));
  };

  const handleDelete = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  const handleStripeCheckout = async (cartData: mappedDbProductsType[]) => {
    try {
      if (!userToken) {
        displayNotification({ message: "Debes estar registrado para poder comprar", type: "info", timeout: 10000 });
      } else {
        const checkoutData = {
          token: userToken,
          cartData
        }
        const dispatchCheckout = await dispatch(stripeCheckout(checkoutData))
        const payloadUrl = unwrapResult(dispatchCheckout)
        window.localStorage.setItem("paymentMethod", "Credit Card")
        window.location.href = payloadUrl
      }
    } catch (e) {
      setCheckoutError(true)
    }
  }

  const handlePaypalButton = () => {
    if (!userToken) {
      displayNotification({ message: "Debes estar registrado para poder comprar", type: "info", timeout: 10000 });
    } else {
      window.localStorage.setItem("paymentMethod", "Paypal")
      setOpenPaypal(!openPaypal);
    }
  }

  const orderItems = cart?.map((e) => {
    return {
        name: e.name,
        qty: e.quantity,
        image: e.images.public_id,
        price: e.price,
        product: e._id
    }
})

console.log(orderItems)

  const onPaypalApprove = async (data: any, actions: any) => {
    const details = await actions.order?.capture()

    const name = details?.payer.name?.given_name

    const orderData = {
      orderItems, 
      paymentMethod: "Paypal",
      itemsPrice: subTotalPrice,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: subTotalPrice,
      userId: user.userId
    }

    dispatch(createOrder(orderData))
    setOpenPaypal(!openPaypal)
    dispatch(clearCart())
    window.localStorage.removeItem("paymentMethod")
    displayNotification({ message: "Transaccion realizada con exito! Muchas gracias", type: "success" })
  }

  useEffect(() => {
    if (!allData?.length) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  return (
    <div>
      {cartLoading ? (
        <Box sx={{ height: "66vh", display: "flex", justifyContent: "center" }}>
          <Box sx={{ marginTop: "5rem" }} className={s.loader} />
        </Box>
      ) : cartError ? (
        <Box>
          <h1>CartError: {cartError}</h1>
        </Box>
      ) : !cart?.length ? (
        <Box sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          <Box sx={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
            <Typography variant="h4" sx={{ fontWeight: "700" }}>
              TU CARRO ESTA VACIO
            </Typography>
            <Typography variant="subtitle1">
              ¿Necesitas ayuda escogiendo? Prueba nuestros productos
              recomendados abajo
            </Typography>
          </Box>
          {loading ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
              <Box sx={{ margin: "2rem" }} className={s.loader} />
            </Box>
            : allData &&
            <Box sx={{userSelect: "none"}}>
              <Typography variant="h3" sx={{ textAlign: "left", fontFamily: "poppins", fontWeight: "600", margin: "1.6rem .4rem" }}>
                RECOMENDAMOS
              </Typography>
              <CartSlider allData={allData} />
            </Box>
          }
        </Box>
      ) : (
        <Container maxWidth={"lg"}>
          <Box sx={{ paddingY: "5rem" }}>
            <Box
              sx={{
                padding: "1rem",
                marginBottom: "2rem",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "72rem",
                fontSize: ".875rem",
                backgroundColor: "rgb(245,245,245)",
                textAlign: "left",
              }}
            >
              <Typography variant="subtitle2">
                Los pedidos se realizan dentro de las 48 horas, de lunes a
                viernes. El minimo orden de pedido es $algo.
              </Typography>
            </Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{ textTransform: "uppercase" }}
                    >
                      Carro
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginLeft: "1rem", color: "gray" }}
                    >
                      {`${itemRes} ${itemRes === 1 ? "item" : "items"}`}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "2.5rem" }}>
                    {cart?.map((e, i) => (
                      <Box key={i + 1} className={s.productsContainer}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ width: "8rem" /* mobile: 6rem */ }}>
                            <img
                              src={e.images.public_id}
                              alt=""
                              className={s.productImage}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "1rem",
                                textAlign: "left",
                              }}
                            >

                              <Link href={`/products/${e._id}`}>
                                <Typography
                                  variant="h6"
                                  className={s.productName}
                                >
                                  {e.name}
                                </Typography>
                              </Link>
                              <Typography variant="subtitle1">
                                {`$${e.price}`}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  disableElevation
                                  className={s.counterButton}
                                  onClick={() => handleDecreaseCart(e._id)}
                                >
                                  <RemoveIcon
                                    sx={{
                                      color: "rgb(17, 17, 17)",
                                      height: "100%",
                                      width: "100%",
                                      padding: "2px",
                                    }}
                                  />
                                </Button>
                                <h2
                                  style={{
                                    marginRight: "1rem",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  {e.quantity}
                                </h2>
                                <Button
                                  disableElevation
                                  className={s.counterButton}
                                  onClick={() => handleIncreaseCart(e._id)}
                                >
                                  <AddIcon
                                    sx={{
                                      color: "rgb(17, 17, 17)",
                                      height: "100%",
                                      width: "100%",
                                      padding: "2px",
                                    }}
                                  />
                                </Button>
                              </Box>
                              <Button
                                onClick={() => handleDelete(e._id)}
                                className={s.deleteIcon}
                              >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    sx={{
                      padding: "2.5rem",
                      backgroundColor: "rgb(245, 245, 245, 245)",
                      textAlign: "left",
                    }}
                  >
                    <Box sx={{ marginBottom: "2rem" }}>
                      <Typography variant="h4" className={s.orderSummary}>
                        Resumen de compra
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ marginBottom: "1.25rem" }}>
                        {priceData.map((e, i) => (
                          <Box key={i + 1} className={s.pricesContainer}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                letterSpacing: "0.1em",
                                lineHeight: 1.6,
                                color: "black",
                              }}
                            >
                              {e.title}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                letterSpacing: "0.1em",
                                lineHeight: 1.6,
                                color: "#333333",
                              }}
                            >
                              {e.price && e.price <= 0 ? "-" : `$${e.price}`}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            letterSpacing: "0.1em",
                            lineHeight: 1.6,
                            color: "black",
                          }}
                        >
                          Total
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            letterSpacing: "0.1em",
                            lineHeight: 1.6,
                            color: "#333333",
                          }}
                        >
                          {`$${priceData.reduce(
                            (total, item) =>
                              total + (item.price ? item.price : 0),
                            0
                          )}`}
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: "1.5rem", marginBottom: "2.5rem" }}>
                        <Collapse in={checkoutError}>
                          <Alert severity='error' sx={{ mb: 2, textAlign: "center" }}>
                            Hubo un error al procesar el pago
                          </Alert>
                        </Collapse>
                        <Button
                          variant="contained"
                          disableElevation
                          className={s.addButton}
                          onClick={() => handleStripeCheckout(cart)}
                          disabled={checkoutLoad}
                        >
                          Checkout
                        </Button>
                        <Button
                          variant="contained"
                          disableElevation
                          className={s.paypalButton}
                          disabled={checkoutLoad}
                          onClick={() => {
                            handlePaypalButton();
                          }}
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>Checkout con</span>
                            <img
                              src={paypalImg}
                              alt=""
                              style={{
                                height: "1.25rem",
                                marginLeft: "0.5rem",
                              }}
                            />
                          </span>
                        </Button>

                        {openPaypal ? <PayPalScriptProvider options={{ "client-id": "Af_2kGfokFGu8n5l3n7OC64eb-BSX4kRvnCZu65B4_48mFGOC6R5f937BMhEM5b-GvfLE-wulIotXk6S" }}>
                          <PayPalButtons createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: `${subTotalPrice}`,
                                  },
                                },
                              ],
                            });
                          }}
                            onApprove={(data, actions) => onPaypalApprove(data, actions)}
                          />
                        </PayPalScriptProvider> : <div></div>}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ display: "flex" }}
                        >
                          ¿Necesitas ayuda? <Link href="/contact" sx={{ marginLeft: "5px" }}>Contáctanos</Link>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Cart;

import { Container, Box, Button, Grid, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../assets/hooks'
import s from "./Cart.module.css"
import paypalImg from "../../assets/images/paypal.png"
import { increaseCartQuantity, decreaseCartQuantity, removeCartItem } from '../../redux/slices/cartSlice'
import { increaseGeneralQuantity, decreaseGeneralQuantity, clearGeneralQuantity } from '../../redux/slices/testSlice';

const Cart = () => {

    const dispatch = useAppDispatch()
    const { cart, cartLoading, cartError } = useAppSelector(state => state.cart)

    console.log(cart, cartLoading, cartError)

    const subTotalPrice = cart?.reduce((total, item)=> total + (item.price*item.quantity), 0)
    const itemRes = cart?.reduce((total, item)=> total + (item.quantity), 0)

    const priceData = [
        { title: "Subtotal", price: subTotalPrice },
        { title: "Envio", price: 0 },
        { title: "Impuestos", price: 0 }
    ]

    //TODO: Bunch of junk code, maybe using localStorage should fix this

    const handleIncreaseCart = (productId: number) => {
        dispatch(increaseCartQuantity(productId))
        dispatch(increaseGeneralQuantity(productId))
    }

    const handleDecreaseCart = (productId: number) => {
        dispatch(decreaseCartQuantity(productId))
        dispatch(decreaseGeneralQuantity(productId))
    }

    const handleDelete = (productId: number) => {
        dispatch(removeCartItem(productId))
        dispatch(clearGeneralQuantity(productId))
    }

    return (
        <div>
            {cartLoading ? <h1>CartLoading</h1>
                : cartError ? <h1>CartError: {cartError}</h1>
                    : !cart?.length ?
                        <Box sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}> {/* Container MUI */}
                            <Box sx={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
                                <Typography variant="h4" sx={{ fontWeight: "700" }}>
                                    TU CARRO ESTA VACIO
                                </Typography>
                                <Typography variant="subtitle1">
                                    ¿Necesitas ayuda escogiendo? Prueba nuestros productos recomendados abajo
                                </Typography>
                            </Box>
                            <Box sx={{ marginBottom: "1rem" }}>
                                {/*<div>
                                    <h1 style={{ fontSize: "3.5rem", textAlign: "left" }}>RECOMENDAMOS</h1>
                                    <div>Swipper de productos recomendados</div>
                                </div>*/}
                            </Box>
                        </Box>
                        :
                        <Container maxWidth={'lg'}>
                            <Box sx={{ paddingY: "5rem" }}>
                                <Box sx={{ padding: "1rem", marginBottom: "2rem", marginLeft: "auto", marginRight: "auto", maxWidth: "72rem", fontSize: ".875rem", backgroundColor: "rgb(245,245,245)", textAlign: "left" }}>
                                    <Typography variant='subtitle2'>
                                        Los pedidos se realizan dentro de las 48 horas, de lunes a viernes. El minimo orden de pedido es $algo.
                                    </Typography>
                                </Box>
                                <Box>
                                    <Grid container spacing={3}>
                                        <Grid item md={8} xs={12}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
                                                    Carro
                                                </Typography>
                                                <Typography variant='subtitle1' sx={{ marginLeft: "1rem", color: "gray" }}>
                                                    {`${itemRes} ${itemRes === 1 ? "item" : "items"}`}
                                                    {/* cart?.reduce((total, item)=>total+(item.quantity + cart.length),0) */}
                                                </Typography>
                                                {/*<h2>Carro</h2>
                                                <p style={{ marginLeft: "1rem" }}>{`${cart.length} items`}</p>*/}
                                            </Box>
                                            <Box sx={{ marginTop: "2.5rem" }}>
                                                {cart?.map((e, i) =>
                                                    <Box key={i + 1} className={s.productsContainer}>
                                                        <Box sx={{ display: "flex", /*justifyContent: "space-between",*/ alignItems: "center" }}>
                                                            <Box sx={{ width: "8rem" /* mobile: 6rem */ }}>
                                                                <img src={e.image} alt="" className={s.productImage} />
                                                            </Box>
                                                            <Box sx={{ flex: 1 }}>
                                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", textAlign: "left" }}>
                                                                    <Typography variant="h6" className={s.productName}>
                                                                        {e.title} {/*<h2>{e.title}</h2>*/}
                                                                    </Typography>
                                                                    <Typography variant="subtitle1">
                                                                        {`$${e.price}`} {/*<span>{`$${e.price}`}</span>*/}
                                                                    </Typography>
                                                                </Box>
                                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                        <Button disableElevation className={s.counterButton} onClick={() => handleDecreaseCart(e.id)}>
                                                                            <RemoveIcon sx={{ color: "rgb(17, 17, 17)", height: "100%", width: "100%", padding: "2px" }} />
                                                                        </Button>
                                                                        <h2 style={{ marginRight: "1rem", marginLeft: "1rem" }}>{e.quantity}</h2>
                                                                        <Button disableElevation className={s.counterButton} onClick={() => handleIncreaseCart(e.id)}>
                                                                            <AddIcon sx={{ color: "rgb(17, 17, 17)", height: "100%", width: "100%", padding: "2px" }} />
                                                                        </Button>
                                                                    </Box>
                                                                    <Button onClick={() => handleDelete(e.id)} className={s.deleteIcon}>
                                                                        <DeleteIcon />
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <Box sx={{ padding: "2.5rem", backgroundColor: "rgb(245, 245, 245, 245)", textAlign: "left" }}>
                                                <Box sx={{ marginBottom: "2rem" }}>
                                                    <Typography variant='h4' className={s.orderSummary}>
                                                        resumen de compra
                                                    </Typography>
                                                    {/*<h2 style={{ letterSpacing: "0.2em", lineHeight: "1.2", marginBottom: "2rem" }}>ORDER SUMMARY</h2>*/}
                                                </Box>
                                                <Box>
                                                    <Box sx={{ marginBottom: "1.25rem" }}>
                                                        {priceData.map((e, i) =>
                                                            <Box key={i + 1} className={s.pricesContainer}>
                                                                <Typography variant='subtitle1' sx={{ letterSpacing: "0.1em", lineHeight: 1.6, color: "black" }}>
                                                                    {e.title}
                                                                </Typography>
                                                                <Typography variant='subtitle1' sx={{ letterSpacing: "0.1em", lineHeight: 1.6, color: "#333333" }}>
                                                                    {e.price && e.price <= 0 ? "-" : `$${e.price}`}
                                                                </Typography>
                                                                {/*<p style={{ letterSpacing: "0.2em", lineHeight: 1.6 }}>{e.title}</p>
                                                                <p style={{ letterSpacing: "0.2em", lineHeight: 1.6 }}>{e.price <= 0 ? "-" : e.price}</p>*/}
                                                            </Box>
                                                        )}
                                                    </Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                                                        <Typography variant='subtitle1' sx={{ letterSpacing: "0.1em", lineHeight: 1.6, color: "black" }}>
                                                            Total
                                                        </Typography>
                                                        <Typography variant='subtitle1' sx={{ letterSpacing: "0.1em", lineHeight: 1.6, color: "#333333" }}>
                                                            {`$${priceData.reduce((total, item)=>total+(item.price ? item.price : 0),0)}`}
                                                        </Typography>
                                                        {/*<p style={{ letterSpacing: "0.1em", lineHeight: 1.6 }}>Total</p>
                                                        <p style={{ letterSpacing: "0.1em", lineHeight: 1.6 }}>125.45</p>*/}
                                                    </Box>
                                                    <Box sx={{ marginTop: "1.5rem", marginBottom: "2.5rem" }}>
                                                        <Button variant="contained" disableElevation className={s.addButton}>
                                                            Checkout
                                                        </Button>
                                                        <Button variant='contained' disableElevation className={s.paypalButton}>
                                                            <span style={{ display: "flex", alignItems: "center" }}>
                                                                <span>Checkout with</span>
                                                                <img src={paypalImg} alt="" style={{ height: "1.25rem", marginLeft: "0.5rem" }} />
                                                            </span>
                                                        </Button>
                                                    </Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <Typography variant='subtitle1' sx={{display: "flex"}}>
                                                            ¿Necesitas ayuda? Contáctanos
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {/*<div>
                                                Accepted cards
                                            </div>*/}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
            }
        </div>
    )
}

export default Cart
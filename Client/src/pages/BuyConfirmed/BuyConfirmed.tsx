import React, { useEffect } from 'react';
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../assets/hooks"
import axios from "axios"
import { createOrder } from '../../redux/thunk-actions/orderActions';
import { clearCart } from '../../redux/slices/cartSlice';

function BuyConfirmed(props: any) {
    const dispatch = useAppDispatch()

    const { cart } = useAppSelector(state => state.cart) 
    const { user } = useAppSelector(state => state.auth)
    console.log("user: ", user)
    const paymethod = window.localStorage.getItem("paymentMethod") // Si se recarga deja de existir

    const orderItems = cart?.map((e) => {
        return {
            name: e.name,
            qty: e.quantity,
            image: e.images[0],
            price: e.price,
            product: e._id
        }
    })
    const totalPrice = cart?.reduce((total, item) => total + item.price * item.quantity,0);

    // localstorage.setitem("paymethod", visa o paypal -- dependiendo de que boton se toque), limpiar en el return, limpiar en useEffect general
    //const paymentMethod = 

    const orderData = {
        orderItems,
        paymentMethod: paymethod,
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice,
        userId: user.userId
    }

    // orderItems,
    // shippingAddress, // no se de donde se saca esto :s
    // paymentMethod, 
    // itemsPrice, 
    // taxPrice, 
    // shippingPrice, 
    // totalPrice, 
    // user -----> req.user._id

    useEffect(() => {
        dispatch(createOrder(orderData))
        dispatch(clearCart())
        return () => {
            window.localStorage.removeItem("paymentMethod")
        }
    }, [dispatch])
    
    
    return (
        <>
        <Box sx={{ paddingTop: "8rem", paddingBottom: "35rem" }}>
            <Typography variant="h4" sx={{ fontWeight: "700" }}>Muchas gracias por tu compra!</Typography>
            <Link to="/">
            <Typography variant="h6"  sx={{ fontWeight: "200",marginTop:"3rem" }}>Haz click aqui para volver al Home</Typography>
            </Link>
        </Box>
        </>
    );
}

export default BuyConfirmed;
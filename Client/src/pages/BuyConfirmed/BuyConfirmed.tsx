import React, { useEffect, useRef } from 'react';
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../../assets/hooks"
import axios from "axios"
import { createOrder } from '../../redux/thunk-actions/orderActions';
import { clearCart } from '../../redux/slices/cartSlice';

function BuyConfirmed(props: any) {
    const dispatch = useAppDispatch()
    const alreadySent = useRef(false) // Para que useEffect corra una sola vez en react 18.2.0

    const { cart } = useAppSelector(state => state.cart)
    const { user } = useAppSelector(state => state.auth)
    const paymethod = window.localStorage.getItem("paymentMethod") // Si se recarga deja de existir

    const orderItems = cart?.map((e) => {
        return {
            name: e.name,
            qty: e.quantity,
            image: e.images.public_id,
            price: e.price,
            product: e._id
        }
    })
    const totalPrice = cart?.reduce((total, item) => total + item.price * item.quantity, 0);

    const orderData = {
        orderItems,
        paymentMethod: paymethod,
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice,
        userId: user.userId,
        userEmail: user.email
    }

    useEffect(() => {
        if (alreadySent.current === false) {
            console.log("Below me already sent")
            dispatch(createOrder(orderData))
            dispatch(clearCart())

            return () => { 
                window.localStorage.removeItem("paymentMethod")
                alreadySent.current = true
            }
        }
    }, [])


    return (
        <>
            <Box sx={{ paddingTop: "8rem", paddingBottom: "35rem" }}>
                <Typography variant="h4" sx={{ fontWeight: "700" }}>Muchas gracias por tu compra!</Typography>
                <Link to="/">
                    <Typography variant="h6" sx={{ fontWeight: "200", marginTop: "3rem" }}>Haz click aqui para volver al Home</Typography>
                </Link>
            </Box>
        </>
    );
}

export default BuyConfirmed;
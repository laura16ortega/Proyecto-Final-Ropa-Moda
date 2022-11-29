import React from 'react';
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

function BuyConfirmed(props: any) {
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
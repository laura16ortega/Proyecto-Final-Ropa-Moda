
import { Box, Button, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from "react";
// import Footer from '../../components/Footer/Footer';
//import Navbar from '../../components/Navbar';
// import CustomButton from '../../pages/LandingPage/CustomButton';


const LandingPage = () => {
    
    const CustomBox = styled(Box)(({theme}) => ({
        display:"flex",
        justifyContent:"center",
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        alignItems: "center",
        textAlign: "center",
        // [theme.breakpoints.down{"sm"}]: {
        //     alignItems: "center",
        //     textAlign: "center",
        // };
    }));

    const Title = styled(Typography)(({theme}) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight:"bold",
        margin: theme.spacing(4, 0, 4, 0),
        // [theme.breakpoints.down{"sm"}]: {
        //     fontSize: "40px",
        // },
    }));

    return <Box sx={{backgroundColor:"E6F0FF", minHeight: "80vh"}}>
        <Container>
            {/* <Navbar /> */}
            <CustomBox>
                <Box sx={{flex: "1"}}>
                    <Typography variant="body2" sx={{fontSize: "18px", color:"#687600", fontWeight: "500", mt:10, ab:4
                }}>
                    Cambiá tu estilo, Cambiá tu vida
                    </Typography>
                    <Title variant="h1">
                    ROPA DE MODA
                    </Title>
                    <Typography
                    variant="body2"
                    sx={{ fontSize: "18px", color: "#5A6473", my: 4}}
                    >
                        No podés comprar la felicidad, pero podés comprar ropa y es casi lo mismo
                    </Typography>
                    {/* <CustomButton 
                     backgroundColor="#0F184C"
                     color="#fff"
                     buttonText="Ver Nuestras Prendas"
                     landingBtn={true}
                    /> */}
                </Box>
                <Box sx={{flex: "1.25"}}>
                    <img src={"https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGllbmRhJTIwZGUlMjByb3BhfGVufDB8fDB8fA%3D%3D&w=1000&q=80"}alt="dan" style={{width:"100%", marginBottom: "2rem"}} />
                </Box>
            </CustomBox>
            <Button type='submit' variant='contained' color='primary'>Ver Prendas</Button>
        </Container>
        {/* <Footer /> */}
    </Box>
} 


export default LandingPage;


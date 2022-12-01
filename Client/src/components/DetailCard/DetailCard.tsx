import React, { useEffect, useState } from "react"
import { Box, Typography, Rating, Stack, Chip, Grid, Container, Button, Collapse } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../assets/hooks";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { clearState } from "../../redux/slices/productDetailsSlice";
import { getProductDetail } from "../../redux/thunk-actions/productDetailsActions";
import type { mappedDbProductsType } from "../../redux/types/productTypes";
import IncreaseCartButton from "../IncreaseCartButton/IncreaseCartButton";
import s from "./DetailCard.module.css"
import { addProductToCart } from "../../redux/thunk-actions/cartActions";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
   increaseCartQuantity,
   decreaseCartQuantity,
} from "../../redux/slices/cartSlice";
import ReviewForm from "../ReviewForm/ReviewForm";
import Review from "../Review/Review";
import { toast } from 'react-toastify';

type ParamTypes = {
   id: string
}

export default function DetailCard() {
   const { cartLoading, cart } = useAppSelector((state) => state.cart);
   const { productDetails, detailsError, detailsLoading } = useAppSelector((state) => state.productDetails);
   const { id } = useParams<keyof ParamTypes>() as ParamTypes; 
   const dispatch = useAppDispatch()
   // console.log("ID: ", id)
   const [openReviewForm, setOpenReviewForm] = useState<boolean>(false)

   //TODO: Pasarlo en assets, presente tambien en card
   const handleCart = (productId: string) => {
      dispatch(addProductToCart(productId));
   }

   //TODO: Pasarlo en assets, presente tambien en IncreaseCartButton
   const handleIncreaseCart = (productId: string) => {
      // ! if quantity > stock === error
      dispatch(increaseCartQuantity(productId));
   };

   const handleDecreaseCart = (productId: string) => {
      dispatch(decreaseCartQuantity(productId));
   };

   const cartProd: mappedDbProductsType[] = JSON.parse(
      localStorage.getItem("cart") || ""
   );

   const foundOnCart = cartProd.find((e) => e._id === productDetails?._id);

   useEffect(() => {
      dispatch(getProductDetail(id))
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return () => {
         clearState()
      }
   }, [])

   const reviewPlaceholder = [
      {
         username: "CurtisAlfeld",
         image: "https://yt3.ggpht.com/5BV78-tDZi0Oki9Z_VMriNoDbidVUa7ik1dltGKXa47IHhucJgI4m8t6j0b2JCRSAiuhrWZQJ7M=s48-c-k-c0x00ffffff-no-rj",
         comment: "This truly is a bygone era in gaming. You never hear crazy urban legends about games, anymore, just because as soon as someone suggests something, data miners are there to debunk it. And then there's the hundreds of let's plays that would have found it in a day.",
         rating: 3
      },
      {
         username: "JLjl1910",
         image: "https://yt3.ggpht.com/WA0tNSmI_cB8La35wJOaVx0sVeeYK7XWkuc8lXMIU6wJ0tJ7_0CFM3Q0TTR42UTTG7iHfsJN=s48-c-k-c0x00ffffff-no-rj",
         comment: "The guy who made the Bigfoot and aliens mod for San Andreas is an Italian youtuber, and when you installed the mod, it contained a virus that basically disables Adblock for his channel. True story.",
         rating: 4
      },
      {
         username: "GhostSilk",
         image: "https://yt3.ggpht.com/ytc/AMLnZu-pH2XQrWBQSHWK9C_JOscoGqa4t2k-JulBb62LEw=s48-c-k-c0x00ffffff-no-rj",
         comment: "Honestly, Joel should do more of these video game easter egg/urban legend hunting streams. This one was an absolute blast.",
         rating: 5
      },
      {
         username: "vanacutt1110",
         image: "https://yt3.ggpht.com/ytc/AMLnZu99fZxiQl4eB8JMyvX-MXBrYFvh1b9AYdi0f6CqrA=s48-c-k-c0x00ffffff-no-rj",
         comment: `The only almost "spooky" thing that happened to me while playing San Andreas on PS2, was when I was spending some time on the southeast side of Flint County near RS Haul, I find this pedestrian photographer taking pictures of the ocean, and then suddenly he just started walking towards the water and died.`,
         rating: 2.5
      },
   ]
   return (
      <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center" }}>
         <Container maxWidth="xl">
            {/* La ruta, example: Home > ProductTitle ((en caso de hacerlo igual a dollarshaveclub, sino un goback)) */}
            <Typography variant="h6" sx={{ textAlign: "left", marginTop: "2rem" }}>
               {`Home/${productDetails?.name}`}
            </Typography>
            {detailsLoading && !detailsError ? <h1>Load</h1>
               : detailsError ? <h1>Error: {detailsError}</h1>
                  : Object.keys(productDetails).length &&
                  <Box sx={{ marginTop: "3rem" }}>
                     <Grid container spacing={6} >
                        <Grid item md={6} sm={12}>
                           <Box>
                              <Box>
                                 <img src={productDetails?.images[0] ? productDetails.images[0] : ""} alt={`${productDetails?.name} not found`} style={{ width: "100%" }} />
                              </Box>
                           </Box>
                        </Grid>
                        <Grid item md={6} sm={12} sx={{ textAlign: "left" }}>
                           <Box sx={{ marginBottom: ".5rem" }}>
                              <Box>
                                 <Typography variant="subtitle1">
                                    <CircleIcon sx={{ fontSize: 18, color: "green" }}></CircleIcon> Disponible
                                 </Typography>
                              </Box>
                              <Typography variant="h1" sx={{ fontFamily: "poppins", fontWeight: "800", width: "100%", }}>
                                 {productDetails?.name}
                              </Typography>
                              <Typography variant="h5">
                                 {`${productDetails?.stock} en stock`}
                              </Typography>
                           </Box>
                           <Box sx={{ marginBottom: "1.4rem" }}>
                              <Box sx={{ paddingTop: "1rem", display: "flex", alignItems: "center" }}>
                                 <Typography variant="h4" sx={{ fontFamily: "poppins", fontWeight: "800" }}>
                                    {`$${productDetails?.price}`}
                                 </Typography>

                              </Box>
                           </Box>
                           <Box>
                              {!foundOnCart ? (
                                 <Button
                                    variant="contained"
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    className={s.addButton}
                                    onClick={() => handleCart(productDetails._id)}
                                    disabled={cartLoading}
                                 >
                                    {cartLoading ? "Agregando..." : "Agregar al carro"}
                                 </Button>
                              ) : (
                                 <Box sx={{ border: "2px solid rgb(0, 18, 51)", paddingX: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "4rem" }}>
                                    <Button disableElevation className={s.counterButton} onClick={() => handleDecreaseCart(productDetails._id)}>
                                       <RemoveIcon sx={{ color: "rgb(17, 17, 17)", height: "100%", width: "100%", padding: "2px", }} />
                                    </Button>
                                    <Typography variant="h4" sx={{ fontFamily: "poppins", fontWeight: "700" }}>
                                       {foundOnCart.quantity}
                                    </Typography>
                                    <Button disableElevation className={s.counterButton} onClick={() => handleIncreaseCart(productDetails._id)}>
                                       <AddIcon sx={{ color: "rgb(17, 17, 17)", height: "100%", width: "100%", padding: "2px", }} />
                                    </Button>
                                 </Box>
                              )}
                           </Box>
                           <Box sx={{ paddingY: "3rem" }}>
                              <Box sx={{ paddingBottom: "1rem" }}>
                                 <Typography variant="h5" sx={{ fontFamily: "poppins", fontWeight: "700" }}>
                                    Detalles
                                 </Typography>
                              </Box>
                              <Box>
                                 <Box sx={{ marginBottom: ".6rem" }}>
                                    <Typography variant="subtitle1" sx={{ fontFamily: "poppins" }}>
                                       {productDetails?.summary ? productDetails?.summary : "Sin descripcion"}
                                    </Typography>
                                 </Box>
                                 <Box>
                                    <Box sx={{ fontFamily: "poppins" }}>
                                       <Typography variant="subtitle1">
                                          {`Categoria: ${productDetails?.category}`}
                                       </Typography>
                                       <Typography variant="subtitle1" >
                                          {`Marca: ${productDetails?.marca ? productDetails.marca : "No definida"}`}
                                       </Typography>
                                    </Box>
                                 </Box>
                              </Box>
                           </Box>
                        </Grid>
                     </Grid>
                     <Box sx={{ paddingTop: "64px", borderTop: "dotted 3px #e1e2e2" }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                           <Box>
                              <Typography variant="h4" sx={{ fontFamily: "poppins", fontWeight: "600" }}>
                                 reviews
                              </Typography>
                           </Box>
                           <Box sx={{ paddingX: "1rem", display: "flex", alignItems: "center" }}>
                              <Rating value={productDetails?.ratingsAverage} readOnly precision={0.5} />
                              <Typography variant="subtitle2" sx={{ marginLeft: "5px" }}>
                                 {`(${productDetails?.ratingsQuantity})`}
                              </Typography>
                           </Box>
                        </Box>
                        <Box>
                           <Box sx={{ paddingTop: "2rem", paddingBottom: "3rem", alignItems: "center", justifyContent: "center" }}>
                              <Typography variant="h5">
                                 Cuentanos que opinas sobre el producto
                              </Typography>
                              <Button variant="contained" disableElevation onClick={() => setOpenReviewForm(!openReviewForm)} sx={{marginTop: "1.5rem", padding: "15px 22px"}}>
                                 Escribir una review
                              </Button>
                           </Box>
                           <Collapse in={openReviewForm}>
                              <ReviewForm />
                           </Collapse>
                           <Box sx={{ marginY: "1rem" }}>
                              <Container maxWidth="lg">
                                 {/* PASAR LOS ID QUE ESTAN EN EL ARRAY REVIEWS DE PRODUCTS AL COMPONENTE Review */}
                                 {productDetails.reviews.length>0 ? productDetails.reviews.map(e =>
                                    <Box key={e} sx={{ borderBottom: "2px solid #DFDFDF" }} >
                                       <Review id={e} />
                                    </Box>)
                                    : 
                                    <Box sx={{marginY: "7rem"}}>
                                       <Typography variant="h3" sx={{fontFamily: "poppins", fontWeight: "700"}}>Sin reviews</Typography>
                                    </Box>
                                 }
                              </Container>
                           </Box>
                        </Box>
                     </Box>
                  </Box>
            }
         </Container>
      </Box>
   );
}

/*

<Grid container p={6} sx={{ alignItems: "center" }}>
   <Grid item xs={12} sm={6}>
      <Box display="flex" justifyContent="center">
         <img
            src={productDetails?.images[0] ? productDetails.images[0] : ""}
            alt={`${productDetails?.name} not found`}
            style={{
               height: "300px",
               width: "250px",
               minWidth: "200px",
            }}
         />
      </Box>
   </Grid>
   <Grid item xs={12} sm={6} sx={{ marginTop: "20px" }}>
      <Typography variant="h4" component="p">
         {productDetails?.name}
      </Typography>
      <Rating
         name="half-rating-read"
         defaultValue={productDetails?.ratingsAverage}
         precision={0.5}
         readOnly
      />
      <Typography component="p">{productDetails?.description}</Typography>
      <Chip
         label={productDetails?.category}
         color="error"
         sx={{
            margin: "5px",
            padding: "4px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
         }}
      />
      <Typography variant="h6" component="p">
         Stock: <CircleIcon sx={{ fontSize: 18, color: "green" }}></CircleIcon>{" "}
         Disponible
      </Typography>
   </Grid>
</Grid>

*/
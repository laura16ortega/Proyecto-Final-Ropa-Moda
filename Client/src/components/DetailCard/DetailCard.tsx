import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Stack,
  Chip,
  Grid,
  Container,
  Button,
  Collapse,
  Link,
  Skeleton,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  ButtonGroup
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../assets/hooks";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { clearState } from "../../redux/slices/productDetailsSlice";
import { getProductDetail } from "../../redux/thunk-actions/productDetailsActions";
import type { mappedDbProductsType } from "../../redux/types/productTypes";
import IncreaseCartButton from "../IncreaseCartButton/IncreaseCartButton";
import s from "./DetailCard.module.css";
import { addProductToCart } from "../../redux/thunk-actions/cartActions";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../../redux/slices/cartSlice";
import ReviewForm from "../ReviewForm/ReviewForm";
import Review from "../Review/Review";
import { toast } from "react-toastify";

type ParamTypes = {
  id: string;
};

export default function DetailCard() {
  const { cartLoading, cart } = useAppSelector((state) => state.cart);
  const { productDetails, detailsError, detailsLoading } = useAppSelector(
    (state) => state.productDetails
  );
  const {
    postReviewLoading,
    postReviewError,
    postReviewSuccess,
    getReviewLoading,
    reviewsArr,
  } = useAppSelector((state) => state.review);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams<keyof ParamTypes>() as ParamTypes;
  const dispatch = useAppDispatch();
  // console.log("ID: ", productDetails)
  const [openReviewForm, setOpenReviewForm] = useState<boolean>(false);

  const handleCart = (productId: string) => {
    dispatch(addProductToCart(productId));
  };

  const handleIncreaseCart = (productId: string) => {
    // ! if quantity > stock === error
    dispatch(increaseCartQuantity(productId));
  };

  const handleDecreaseCart = (productId: string) => {
    dispatch(decreaseCartQuantity(productId));
  };

  const foundOnCart = cart?.find((e) => e._id === productDetails?._id);

  useEffect(() => {
    dispatch(getProductDetail(id));
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      clearState();
    };
  }, [reducerValue]);

  console.log(productDetails);
  return (
    <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center" }}>
      <Container maxWidth="xl">
        {/* La ruta, example: Home > ProductTitle ((en caso de hacerlo igual a dollarshaveclub, sino un goback)) */}

        {detailsLoading && !detailsError ? (
          <Grid
            container
            spacing={6}
            sx={{ marginTop: ".9rem", marginBottom: "64px" }}
          >
            <Grid item md={6} sm={12}>
              <Skeleton
                variant="rectangular"
                height={690}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Typography variant="subtitle1">
                <Skeleton sx={{ width: "20%" }} />
              </Typography>
              <Typography variant="h1">
                <Skeleton />
              </Typography>
              <Typography variant="h5">
                <Skeleton variant="rounded" sx={{ width: "30%" }} />
              </Typography>
              <Box sx={{ marginY: 3 }}>
                <Typography variant="h3">
                  <Skeleton sx={{ width: "15%" }} />
                </Typography>
                <Typography variant="h1">
                  <Skeleton />
                </Typography>
              </Box>
              <Typography variant="h5">
                <Skeleton sx={{ width: "17%" }} />
              </Typography>
              <Typography variant="subtitle1">
                <Skeleton variant="rounded" height={200} />
              </Typography>
              <Typography variant="subtitle1">
                <Skeleton sx={{ width: "24%" }} />
              </Typography>
              <Typography variant="subtitle1">
                <Skeleton sx={{ width: "24%" }} />
              </Typography>
            </Grid>
          </Grid>
        ) : detailsError ? (
          <Box sx={{ marginTop: "8rem" }}>
            <Typography variant="h2">Error: {detailsError}</Typography>
          </Box>
        ) : (
          Object.keys(productDetails).length && (
            <Box sx={{ marginTop: "3rem" }}>
              <Grid container spacing={6}>
                <Grid item md={6} sm={12}>
                  <Box>
                    <Box>
                      <img
                        src={productDetails?.images.public_id}
                        alt={`${productDetails?.name} not found`}
                        style={{ width: "100%" }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={6} sm={12} sx={{ textAlign: "left" }}>
                  <Box sx={{ marginBottom: ".5rem" }}>
                    <Box>
                      {productDetails?.stock > 0 ? (
                        <Typography variant="subtitle1">
                          <CircleIcon
                            sx={{ fontSize: 15, color: "green" }}
                          ></CircleIcon>{" "}
                          Disponible
                        </Typography>
                      ) : (
                        <Typography variant="subtitle1">
                          <CircleIcon
                            sx={{ fontSize: 18, color: "red" }}
                          ></CircleIcon>{" "}
                          No disponible
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant="h1"
                      sx={{
                        fontFamily: "poppins",
                        fontWeight: "800",
                        width: "100%",
                        fontSize: "5rem",
                      }}
                    >
                      {productDetails?.name}
                    </Typography>
                    <Typography variant="h5">
                      {`${productDetails?.stock} en stock`}
                    </Typography>
                  </Box>
                  <Box sx={{ marginBottom: "1.4rem" }}>
                    <Box
                      sx={{
                        paddingTop: "1rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontFamily: "poppins", fontWeight: "800" }}
                      >
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
                      <Box
                        sx={{
                          border: "2px solid rgb(0, 18, 51)",
                          paddingX: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "4rem",
                        }}
                      >
                        <Button
                          disableElevation
                          className={s.counterButton}
                          onClick={() => handleDecreaseCart(productDetails._id)}
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
                        <Typography
                          variant="h4"
                          sx={{ fontFamily: "poppins", fontWeight: "700" }}
                        >
                          {foundOnCart.quantity}
                        </Typography>
                        <Button
                          disableElevation
                          className={s.counterButton}
                          onClick={() => handleIncreaseCart(productDetails._id)}
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
                    )}
                  </Box>
                  <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "3rem"}}>
                    <Box sx={{textAlign: "center"}}>
                      <Typography variant="subtitle1" sx={{ fontFamily: "poppins", fontWeight: "700", marginY: ".5rem" }}>Talles disponibles</Typography>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                    <ButtonGroup fullWidth sx={{width: "50%"}} disableRipple disableFocusRipple>
                    {productDetails?.tallaCamiseta.length > 0
                              ? productDetails?.tallaCamiseta.map((e,i) => {
                                return <Button key={i} value={e}>{e}</Button>;
                              })
                              : productDetails?.tallaPantalón.map((e, i) => {
                                return <Button key={i} value={e}>{e}</Button>;
                              })}
                    </ButtonGroup>
                    </Box>
                  </Box>
                  <Box sx={{ paddingY: "3rem" }}>
                    <Box sx={{ paddingBottom: "1rem" }}>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: "poppins", fontWeight: "700" }}
                      >
                        Detalles
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ marginBottom: ".6rem" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontFamily: "poppins" }}
                        >
                          {productDetails?.summary
                            ? productDetails?.summary
                            : "Sin descripcion"}
                        </Typography>
                      </Box>
                      <Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                          <Typography
                            variant="h5"
                            sx={{ fontFamily: "poppins", fontWeight: "700" }}
                          >
                            Categoria
                          </Typography>
                        </Box>
                        <Box sx={{ marginBottom: ".6rem" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "poppins" }}
                          >
                            {productDetails?.category}
                          </Typography>
                        </Box>
                        <Box sx={{ paddingBottom: "10px" }}>
                          <Typography
                            variant="h5"
                            sx={{ fontFamily: "poppins", fontWeight: "700" }}
                          >
                            Marca
                          </Typography>
                        </Box>
                        <Box sx={{ marginBottom: ".6rem" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: "poppins" }}
                          >
                            {productDetails?.marca
                              ? productDetails?.marca
                              : "Sin marca"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ paddingTop: "64px", borderTop: "dotted 3px #e1e2e2" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontFamily: "poppins", fontWeight: "600" }}
                    >
                      Reviews
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      paddingX: "1rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      value={productDetails?.ratingsAverage}
                      readOnly
                      precision={0.5}
                    />
                    <Typography variant="subtitle2" sx={{ marginLeft: "5px" }}>
                      {`(${productDetails?.reviews.length})`}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Box
                    sx={{
                      paddingTop: "2rem",
                      paddingBottom: "3rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5">
                      Cuentanos que opinas sobre el producto
                    </Typography>
                    <Box sx={{ marginTop: "1.5rem" }}>
                      {Object.keys(user).length ? (
                        <Box>
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() => setOpenReviewForm(!openReviewForm)}
                            sx={{ padding: "15px 22px" }}
                          >
                            Escribir una review
                          </Button>
                          <Collapse in={openReviewForm}>
                            <ReviewForm
                              productId={id}
                              setOpenReviewForm={setOpenReviewForm}
                              forceUpdate={forceUpdate}
                            />
                          </Collapse>
                        </Box>
                      ) : (
                        <Link href="/login">
                          <Typography variant="h6">
                            Debes tener una cuenta para poder comentar
                          </Typography>
                        </Link>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ marginY: "1rem" }}>
                    <Container maxWidth="lg">
                      {/* PASAR LOS ID QUE ESTAN EN EL ARRAY REVIEWS DE PRODUCTS AL COMPONENTE Review */}
                      {productDetails.reviews.length > 0 ? (
                        productDetails.reviews.map((e) => (
                          <Box
                            key={e}
                            sx={{ borderBottom: "2px solid #DFDFDF" }}
                          >
                            <Review id={e} />
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ marginY: "7rem" }}>
                          <Typography
                            variant="h3"
                            sx={{ fontFamily: "poppins", fontWeight: "700" }}
                          >
                            Sin reviews
                          </Typography>
                        </Box>
                      )}
                    </Container>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        )}
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

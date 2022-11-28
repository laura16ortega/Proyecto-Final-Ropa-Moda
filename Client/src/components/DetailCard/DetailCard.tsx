import React, { useEffect } from "react"
import { Box, Typography, Rating, Stack, Chip, Grid } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../assets/hooks";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { clearState } from "../../redux/slices/productDetailsSlice";
import { getProductDetail } from "../../redux/thunk-actions/productDetailsActions";

export default function DetailCard() {
  const { allData, error, loading } = useAppSelector((state) => state.data);
  const { productDetails, detailsError, detailsLoading } = useAppSelector((state) => state.productDetails);
  const { id } = useParams();
  const dispatch = useAppDispatch()
  console.log("ID: ", id)



  useEffect(() => {
    dispatch(getProductDetail(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => {
      clearState()
    }
  }, [])




  return (
    <Box sx={{minHeight: "80vh", display: "flex", justifyContent: "center"}}>
      {detailsLoading && !detailsError ? <h1>Load</h1>
        : detailsError ? <h1>Error: {detailsError}</h1>
          : Object.keys(productDetails).length &&
          <Grid container p={6} sx={{alignItems: "center"}}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <img
                  src={productDetails?.images[0]? productDetails.images[0]: ""}
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
      }
    </Box>
  );
}

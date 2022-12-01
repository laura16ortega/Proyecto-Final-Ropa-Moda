import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Link,
  Rating,
} from "@mui/material";
import s from "./Card.module.css";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { addProductToCart } from "../../redux/thunk-actions/cartActions";
import type { mappedDbProductsType } from "../../redux/types/productTypes";
import IncreaseCartButton from "../IncreaseCartButton/IncreaseCartButton"

type productProps = {
  product: mappedDbProductsType;
  margin?: string; // Slider
};

const Card = ({ product, margin }: productProps) => {
  const dispatch = useAppDispatch();
  const { cartLoading, cart } = useAppSelector((state) => state.cart);

  const cartProd: mappedDbProductsType[] = JSON.parse(
    localStorage.getItem("cart") || ""
  );
  const foundOnCart = cartProd.find((e) => e.name === product.name);

  const handleCart = (productId: string) => {
    dispatch(addProductToCart(productId));
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{ margin: margin ? margin : "0px" }}
    >
      <Paper elevation={3} sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Special tags: limited edition, best seller, low calories, etc */}
          <Link href={`/products/${product._id}`}>
            <Box>
              <img
                src={!product.images? "" : product.images.url? product.images.url : product.images[0]}
                alt={`${product.name} not found`}
                className={s.image}
                style={{ marginBottom: ".7rem" }}
              />
              <Typography variant="h3" component="p" className={s.title}>
                {product.name}
              </Typography>
            </Box>
          </Link>
            <Box
              sx={{
                flex: "1 1 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginY: ".25rem",
              }}
            >
              <Rating value={product.ratingsAverage} readOnly precision={0.5} />
              <Typography
                variant="subtitle2"
                sx={{ color: "gray", userSelect: "none", marginLeft: "3px" }}
              >
                {product.ratingsQuantity} review/s
              </Typography>
            </Box>
            <Box>
              <Box>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{ fontWeight: 500, fontFamily: "system-ui" }}
                >
                  {`$${product.price}`}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: "0.5rem", marginTop: "1rem" }}>
                {!foundOnCart ? (
                  <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    className={s.addButton}
                    onClick={() => handleCart(product._id)}
                    disabled={cartLoading}
                  >
                    {cartLoading ? "Agregando..." : "Agregar al carro"}
                  </Button>
                ) : (
                  <IncreaseCartButton id={product._id} quantity={foundOnCart.quantity}/>
                )}
              </Box>
            </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Card;

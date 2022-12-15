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
import { addProductToFav } from "../../redux/thunk-actions/favoriteActions";
import type { mappedDbProductsType } from "../../redux/types/productTypes";
import IncreaseCartButton from "../IncreaseCartButton/IncreaseCartButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { removefavItem } from "../../redux/slices/favoriteSlice";
import { formatNumber } from '../../assets/helpers'

type productProps = {
  product: mappedDbProductsType;
  margin?: string; // Slider
};

const Card = ({ product }: productProps) => {
  const dispatch = useAppDispatch();
  const { cartLoading, cart } = useAppSelector((state) => state.cart);
  const { favLoading, fav } = useAppSelector((state) => state.fav);
  const { token } = useAppSelector((state) => state.auth);
  const foundOnCart = cart?.find(({ name }) => name === product.name);
  const foundOnFav = fav?.find(({ name }) => name === product.name);

  const handleCart = (productId: string) => {
    dispatch(addProductToCart(productId));
  };

  const handleFav = (productId: string) => {
    dispatch(addProductToFav(productId));
  };
  const handleRemoveFav = (productId: string) => {
    dispatch(removefavItem(productId));
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={3} sx={{ display: "flex", height: "700px" }}>
        <Box
          sx={{
            backgroundColor: "#F5F5F5",
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {token ? (
            !foundOnFav ? (
              <Button
                disableElevation
                size="small"
                className={s.addButtonFav}
                onClick={() => handleFav(product._id)}
                disabled={favLoading}
                sx={{ position: "absolute" }}
              >
                {favLoading ? "♥" : <FavoriteBorderIcon />}
              </Button>
            ) : (
              <Button
                disableElevation
                size="small"
                className={s.addButtonFav}
                onClick={() => handleRemoveFav(product._id)}
                sx={{ position: "absolute" }}
              >
                <FavoriteIcon style={{ fill: "red" }} />
              </Button>
            )
          ) : (
            <></>
          )}
          <Link href={`/products/${product._id}`}>
            <Box>
              <img
                src={product.images.public_id}
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
              justifyContent: "center",
              marginY: ".25rem",
            }}
          >
            <Rating value={product.ratingsAverage} readOnly precision={0.5} />
            <Typography
              variant="subtitle2"
              sx={{ color: "gray", userSelect: "none", marginLeft: "3px" }}
            >
              {product.reviews.length} review/s
            </Typography>
          </Box>
          <Box>
            <Box>
              <Typography
                variant="h5"
                component="p"
                sx={{ fontWeight: 500, fontFamily: "system-ui" }}
              >
                {`$${formatNumber(product.price)}`}
              </Typography>
            </Box>
            <Box
              sx={{
                marginBottom: "0.5rem",
                marginTop: "1rem",
              }}
            >
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
                <div>
                  <IncreaseCartButton
                    id={product._id}
                    quantity={foundOnCart.quantity}
                  />
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Card;

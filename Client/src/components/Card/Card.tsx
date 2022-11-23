import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import s from "./Card.module.css";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { addProductToCart } from "../../redux/thunk-actions/cartActions";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type productProps = {
  product: Product;
};

const Card = ({ product }: productProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Link to={`/home/${product.id}`}>
            <Box>
              <img
                src={product.image}
                alt={`${product.title} not found`}
                className={s.image}
                style={{ marginBottom: ".7rem" }}
              />
              <Typography variant="h3" component="p" className={s.title}>
                {product.title}
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ marginBottom: ".25rem" }}
            >
              Not. FIFA. Endorsed.
            </Typography>
            <Typography
              variant="subtitle2"
              component="p"
              sx={{
                marginBottom: ".25rem",
                fontSize: "1rem",
                color: "rgba(119,119,119, 1);",
              }}
            >
              Lager ‧ 4.5% ‧ 12 x Can (330ml)
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
              <Button
                variant="contained"
                disableElevation
                size="small"
                className={s.addButton}
              >
                Agregar al carro
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Card;

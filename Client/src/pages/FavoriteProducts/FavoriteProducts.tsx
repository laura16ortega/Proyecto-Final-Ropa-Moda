import { Container, Box, Button, Grid, Typography, Link, Alert, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import s from "./FavoriteProducts.module.css";
import { useNotification } from '../../components/UseNotification/UseNotification';
import type { mappedDbProductsType } from "../../redux/types/productTypes"
import { getAllProducts } from "../../redux/thunk-actions/testActions";
import CartSlider from "../../components/CartSlider/CartSlider";
import { removefavItem } from "../../redux/slices/favoriteSlice";


const FavoriteProducts = () => {

  type DeletedProduct = {
    name?: any,
    id?: any
  }

  
  const [lastDeleted, setLastDeleted]  = useState<DeletedProduct>({})

  const { displayNotification } = useNotification();

  const dispatch = useAppDispatch();
  const { fav, favLoading, favError, checkoutLoad } = useAppSelector((state) => state.fav);
  const { allData, loading } = useAppSelector((state) => state.data);

  useEffect(() => {
    if(lastDeleted.hasOwnProperty('name') && lastDeleted.hasOwnProperty('id')){
      dispatch(removefavItem(lastDeleted.id));
      displayNotification({ message: `Has eliminado ${lastDeleted.name} de tus favoritos `, type: "info", timeout: 10000 });
      setLastDeleted({});
    }
  },[lastDeleted])

  const itemRes = fav?.reduce((total, item) => total + item.quantity, 0);

  const handleDelete = (productId: string, name: string) => {
    setLastDeleted({name:`${name}`, id:`${productId}`})
  };


  useEffect(() => {
    if (!allData?.length) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  return (
    <div>
      {favLoading ? (
        <h1>CartLoading</h1>
      ) : favError ? (
        <h1>FavError:{favError}</h1>
      ) : !fav?.length ? (
        <Box sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          <Box sx={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
            <Typography variant="h4" sx={{ fontWeight: "700" }}>
              Aun no has agregado ninguna prenda a favoritos
            </Typography>
            <Typography variant="subtitle1">
              ¿Necesitas ayuda escogiendo? Prueba nuestros productos
              recomendados abajo
            </Typography>
          </Box>
          {loading ? <h1>Loading</h1> : allData &&
            <Box sx={{}}>
              <Typography variant="h3" sx={{ textAlign: "left", fontFamily: "poppins", fontWeight: "600", margin: "1.6rem .4rem" }}>
                Recomendamos
              </Typography>
              <CartSlider allData={allData} />
            </Box>
          }
        </Box>
      ) : (
        <Container maxWidth={"lg"} >
          <Box sx={{ paddingY: "5rem", marginBottom:'2rem' }}>

            <Box>
              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{ textTransform: "uppercase" }}
                    >
                      Favoritos
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginLeft: "1rem", color: "gray" }}
                    >
                      {`${itemRes} ${itemRes === 1 ? "item" : "items"}`}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "2.5rem" }}>
                    {fav?.map((e, i) => (
                      
                      <Box key={i + 1} className={s.productsContainer}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ width: "8rem" /* mobile: 6rem */ }}>
                            <img
                              src={e.images.public_id}
                              alt=""
                              className={s.productImage}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Box  
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "1rem",
                                textAlign: "left",
                              }}
                            >
                              <Link href={`/products/${e._id}`}>
                              <Typography
                                variant="h6"
                                className={s.productName}
                              >
                                {e.name}
                              </Typography>
                              </Link>
                            
                              <Typography variant="subtitle1">
                                {`$${e.price}`}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                              </Box>
                              <Box sx={{ marginBottom: "0.5rem", marginTop: "1rem" }}>

              </Box>
                              <Button
                                onClick={() => handleDelete(e._id,e.name)}
                                className={s.deleteIcon}
                              >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default FavoriteProducts;

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { getAllProducts } from "../../redux/thunk-actions/testActions";
import Card from "../Card/Card";
import { Container, Grid, Skeleton, Paper, Box, Typography} from "@mui/material";
import Loading from "../Loading/loading";
import Pagination from '../Pagination/Pagination'

const AllCards = () => {
  const { allData, error, loading } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allData?.length) {
      dispatch(getAllProducts());
    }
  }, [dispatch]);

  let arr = [0, 1, 2, 3, 4, 5, 6, 7];

  // const [page, setPage] = useState(1);
  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  const [pagina, setPagina] = useState(1)
  const [productosPorPagina, setproductosPorPagina] = useState(8)

  const maximo = allData.length / productosPorPagina

  return (
    <Container maxWidth={"xl"} sx={{ marginBottom: 5 }}>
      <Pagination
        maximo={maximo}
        pagina={pagina}
        setPagina={setPagina}
        />
          {/* <Pagination count={10} page={page} onChange={handleChange} /> */}
      <Grid container spacing={1.5}>
        <>
      {loading && !error ? (        
         arr.map((item, index) => {
           return (
             <Grid item xs={12} sm={6} md={4} lg={3} key={index + 1}>
               <Paper
                 elevation={3}
                 sx={{ display: "flex", marginTop: "20px" }}
               >
                 <Skeleton
                   variant="rectangular"
                   width={280}
                   height={700}
                   sx={{
                     padding: ".5rem",
                     display: "flex",
                     flexDirection: "column",
                     flex: 1,
                   }}
                 />
               </Paper>
             </Grid>
           );
         })
       ) : error ? (
         <Box sx={{height: "66vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Typography variant="h2">
            Error: {error}
          </Typography>
         </Box>
       ) : allData?.length === 0 ? (
        <Box sx={{minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", width: "inherit"}}>
          <Typography variant="h3" fontFamily={"poppins"} fontWeight="600">
            Sin resultados
          </Typography>
        </Box>
       ) : (
         allData.slice (
          (pagina - 1) * productosPorPagina,
          (pagina - 1) * productosPorPagina + productosPorPagina)?.map((e, i) => <Card key={i + 1} product={e} />)
       )} 
       
      </>      
      </Grid>
    </Container>
  );
};

export default AllCards;

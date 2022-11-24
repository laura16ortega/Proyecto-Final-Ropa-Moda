import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { fetchingTest } from "../../redux/thunk-actions/testActions";
import Card from "../Card/Card";
import { Container, Grid, Skeleton, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../Loading/loading";

const AllCards = () => {
  const { allData, error, loading } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allData?.length) {
      dispatch(fetchingTest());
    }
  }, [dispatch]);

  let arr = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <Container maxWidth={"xl"} sx={{ marginBottom: 5 }}>
      <Grid container spacing={1.5}>
        {loading && !error ? (
          arr.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <h1>Error: {error}</h1>
        ) : allData?.length === 0 ? (
          <h1>No results</h1>
        ) : (
          allData?.map((e, i) => <Card key={i + 1} product={e} />)
        )}
      </Grid>
      {/*<Container maxWidth="xs" sx={{ mt: 7 }}>
            <Grid container sx={{ justifyContent: "center" }}>
               <TestPagination
                  numPages={TotalPages}
                  page={page}
                  setPage={setPage} />
            </Grid>
         </Container>*/}
    </Container>
  );
};

export default AllCards;

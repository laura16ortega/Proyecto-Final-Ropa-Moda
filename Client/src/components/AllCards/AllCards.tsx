import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { fetchingTest } from "../../redux/thunk-actions/testActions";
import Card from "../Card/Card";
import { Container, Grid, Box, Typography } from "@mui/material";

const AllCards = () => {
  const { allData, error, loading } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchingTest());
  }, [dispatch]);

  return (
    <Container maxWidth={"xl"} sx={{ marginBottom: 5 }}>
      <Grid container spacing={1.5}>
        {loading && !error ? (
          <h1>Loading</h1>
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

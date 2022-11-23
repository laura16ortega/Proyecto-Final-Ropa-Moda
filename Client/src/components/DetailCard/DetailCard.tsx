import { Box, Typography, Rating, Stack, Chip } from "@mui/material";
import { useAppSelector } from "../../assets/hooks";
import { useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";

export default function DetailCard() {
  const { allData, error, loading } = useAppSelector((state) => state.data);
  const { id } = useParams();

  let data = allData?.filter((obj) => obj.id === Number(id));
  console.log(allData);
  return (
    <Box>
      <img
        src={data ? data[0].image : ""}
        alt={`${data ? data[0].title : ""} not found`}
        style={{ textAlign: "center", height: "500px", width: "500px" }}
      />
      <Typography variant="h3" component="p">
        {data ? data[0].title : ""}
      </Typography>
      <Rating
        name="half-rating-read"
        defaultValue={data ? data[0].rating.rate : 0}
        precision={0.5}
        readOnly
      />
      <Typography component="p">{data ? data[0].description : ""}</Typography>
      <Chip
        label={data ? data[0].category : ""}
        sx={{
          margin: "5px",
          padding: "4px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "#e63946",
        }}
      />

      <Typography variant="h5" component="p">
        Stock: <CircleIcon sx={{ fontSize: 18, color: "green" }}></CircleIcon>{" "}
        Disponible
      </Typography>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Input,
} from "@mui/material";
import { Formik, FormikHelpers, Form, Field } from "formik";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "@emailjs/browser";
import * as yup from "yup";
import { useNotification } from "../../components/UseNotification/UseNotification";
import styles from "./CreateForm.module.css";
import { useCreateForm } from "../../assets/hooks/useCreateForm";
import { tallasCamiseta, tallasPantalon } from "./create-form-types";
import { useAppDispatch } from "../../assets/hooks";
import { createProduct } from "../../redux/thunk-actions/testActions";

export default function CreateForm() {
  const { register, handleSubmit, watch, setValue, formState } =
    useCreateForm();

  const dispatch = useAppDispatch();
  const [sizeArr, setSizeArr] = useState<Array<string>>([]);
  const [fileValue, setFileValue] = useState({
    image: "",
  });

  const widgetConfig = {
    cloudName: "dayt0wtlk",
    uploadPreset: "gmykq3nv",
    sources: [
      "local",
      "camera",
      "url",
      "facebook",
      "instagram",
      "google_drive",
      "image_search",
      "dropbox",
    ],
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
  };

  const widgetDisplay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let myWidget = window.cloudinary.createUploadWidget(
      widgetConfig,
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log(result);
          setFileValue({
            image: result.info.url,
          });
        }
      }
    );
    myWidget.open();
  };

  const handleInputSelector = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //setFileValue(e.currentTarget.value)
    setTimeout(() => {
      console.log(typeof e.target.value);
    }, 5005);

    setTimeout(() => {
      console.log("filevalue state: ", fileValue);
    }, 5000);
  };

  const onChange = (e: any) => {
    setSizeArr([...sizeArr, e.target.name]);
  };

  return (
    <Box sx={{ backgroundColor: "#3e3e3e" }}>
      <Box className={styles.contactHeader}>
        <Box>
          <Typography
            variant="h1"
            sx={{ fontWeight: "700", marginBottom: "0.5rem" }}
          >
            Crea tu producto
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={14}>
          <Grid item md={6} className={styles.contactLeft}>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Nombre</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Precio</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Descripcion</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Genero</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Categoria</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Imagen</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Stock</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Marca</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Talla</Typography>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit((data) => {
                if (data.category === "Pantalon") {
                  data.tallaPantalon = sizeArr;
                } else {
                  data.tallaCamiseta = sizeArr;
                }
                let allData = { ...data, images: [fileValue.image] };
                console.log(allData);
                dispatch(createProduct(allData));
              })}
            >
              <FormControl>
                <TextField
                  {...register("name")}
                  key={0}
                  label="Nombre"
                  className={styles.inputInfo}
                  name="name"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  helperText={formState.errors?.name?.message}
                  error={Boolean(formState.errors?.name?.message)}
                  focused
                />
                <TextField
                  {...register("price")}
                  key={1}
                  label="Precio"
                  className={styles.inputInfo}
                  name="price"
                  id="outlined-number"
                  variant="filled"
                  color="secondary"
                  type="number"
                  error={Boolean(formState.errors?.price?.message)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  focused
                />
                <TextField
                  {...register("summary")}
                  key={2}
                  label="Descripcion"
                  className={styles.inputInfo}
                  name="summary"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  helperText={formState.errors?.summary?.message}
                  error={Boolean(formState.errors?.summary?.message)}
                  focused
                />
                <Select
                  {...register("gender")}
                  key={3}
                  label="Ganero"
                  name="gender"
                  id="filled-basic"
                  variant="filled"
                  className={styles.inputInfo}
                  error={Boolean(formState.errors?.gender?.message)}
                  sx={{ border: "2px solid #ced4da", color: "white" }}
                >
                  <InputLabel id="label">Genero</InputLabel>
                  <MenuItem value="Hombre">Hombre</MenuItem>
                  <MenuItem value="Mujer">Mujer</MenuItem>
                  <MenuItem value="Unisex">Unisex</MenuItem>
                </Select>
                <Select
                  {...register("category")}
                  key={3}
                  label="Categoria"
                  name="category"
                  id="filled-basic"
                  variant="filled"
                  className={styles.inputInfo}
                  error={Boolean(formState.errors?.category?.message)}
                  sx={{ border: "2px solid #ced4da", color: "white" }}
                >
                  <InputLabel id="label">Categoria</InputLabel>
                  <MenuItem value="Camiseta">Camiseta</MenuItem>
                  <MenuItem value="Pantalones">Pantalon</MenuItem>
                </Select>
                <Button
                  sx={{
                    marginTop: "3rem",
                    border: "solid 2px #ced4da",
                    color: "#ced4da",
                  }}
                  onClick={(e) => widgetDisplay(e)}
                >
                  Subir Imagen...
                </Button>
                <TextField
                  {...register("stock")}
                  key={5}
                  label="Stock"
                  className={styles.inputInfo}
                  name="stock"
                  id="outlined-number"
                  variant="filled"
                  color="secondary"
                  type="number"
                  error={Boolean(formState.errors?.stock?.message)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  focused
                />
                <TextField
                  {...register("marca")}
                  key={7}
                  className={styles.inputInfo}
                  name="marca"
                  label="Marca"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  helperText={formState.errors?.marca?.message}
                  error={Boolean(formState.errors?.marca?.message)}
                  focused
                />
                {watch("category") === "Camiseta" ? (
                  <FormGroup className={styles.inputInfo}>
                    <FormControlLabel
                      control={<Checkbox name="S" onChange={onChange} />}
                      label="S"
                    />
                    <FormControlLabel
                      control={<Checkbox name="M" onChange={onChange} />}
                      label="M"
                    />
                    <FormControlLabel
                      control={<Checkbox name="L" onChange={onChange} />}
                      label="L"
                    />
                    <FormControlLabel
                      control={<Checkbox name="XL" onChange={onChange} />}
                      label="XL"
                    />
                  </FormGroup>
                ) : (
                  <FormGroup className={styles.inputInfo}>
                    <FormControlLabel
                      control={<Checkbox name="28" onChange={onChange} />}
                      label="28"
                    />
                    <FormControlLabel
                      control={<Checkbox name="30" onChange={onChange} />}
                      label="30"
                    />
                    <FormControlLabel
                      control={<Checkbox name="32" onChange={onChange} />}
                      label="32"
                    />
                  </FormGroup>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginBottom: "2rem", marginTop: "2rem" }}
                >
                  CREAR
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

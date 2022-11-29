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

export default function CreateForm() {
  const { register, handleSubmit, watch, setValue, formState } =
    useCreateForm();

  console.log(formState.errors);
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
              <Typography variant="h3">Categoria</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Imagen</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Stock</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Talla</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Marca</Typography>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit((data) => {
                console.log(data);
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
                  focused
                />
                <TextField
                  {...register("price")}
                  key={1}
                  label="Precio"
                  className={styles.inputInfo}
                  name="price"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  focused
                />
                <TextField
                  {...register("description")}
                  key={2}
                  label="Descripcion"
                  className={styles.inputInfo}
                  name="description"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  focused
                />
                <Select
                  {...register("category")}
                  key={3}
                  label="Categoria"
                  name="category"
                  id="filled-basic"
                  variant="filled"
                  className={styles.inputInfo}
                  sx={{ border: "2px solid #ced4da", color: "white" }}
                >
                  <InputLabel id="label">Categoria</InputLabel>
                  <MenuItem value="Camiseta">Camiseta</MenuItem>
                  <MenuItem value="Pantalon">Pantalon</MenuItem>
                </Select>
                <TextField
                  {...register("image")}
                  key={4}
                  label="Imagen"
                  className={styles.inputInfo}
                  name="image"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  focused
                />
                <TextField
                  {...register("stock")}
                  key={5}
                  label="Stock"
                  className={styles.inputInfo}
                  name="stock"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  focused
                />
                <Select
                  {...register("talla")}
                  key={6}
                  label="Talla"
                  className={styles.inputInfo}
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  sx={{ border: "2px solid #ced4da", color: "white" }}
                >
                  {watch("category") === "Camiseta" &&
                    tallasCamiseta.map((e) => (
                      <MenuItem value={e.value} key={e.value}>
                        {e.name}
                      </MenuItem>
                    ))}

                  {watch("category") === "Pantalon" &&
                    tallasPantalon.map((e) => (
                      <MenuItem value={e.value} key={e.value}>
                        {e.name}
                      </MenuItem>
                    ))}
                </Select>
                <TextField
                  {...register("marca")}
                  key={7}
                  className={styles.inputInfo}
                  name="marca"
                  label="Marca"
                  id="filled-basic"
                  variant="filled"
                  color="secondary"
                  focused
                />
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

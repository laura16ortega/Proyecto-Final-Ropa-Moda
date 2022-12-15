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
  ButtonGroup
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
import { useNavigate } from "react-router-dom";
import { PRODUCT_FORM_VALIDATOR_SCHEMA } from "../../assets/hooks/useCreateForm"

type InitialValue = {
  category: string,
  gender: string,
  images: string,
  marca: string,
  name: string,
  price: number,
  summary: string,
  stock: number
  tallaCamiseta: string[],
  tallaPantalón: string[],
  [index: string]: any // :s
}

type FieldType = {
  title: string
  label: string
}

type FieldProps = {
  field: FieldType
  form: any
}

export default function CreateForm() {
  const { register, handleSubmit, watch, setValue, formState } =
    useCreateForm();

  const dispatch = useAppDispatch();
  const [fileValue, setFileValue] = useState({
    image: "",
  });
  const [disabledButton, setDisabledButton] = useState<boolean>(false)

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

  const widgetDisplay = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let myWidget = window.cloudinary.createUploadWidget(
      widgetConfig,
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setFileValue({
            image: result.info.url,
          });
        }
      }
    );
    myWidget.open();
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, values: any, setFieldValue: any) => {
    if (e.target.value === "Camiseta") {
        setFieldValue("tallaPantalón", [])
    } else if (e.target.value === "Pantalones") {
        setFieldValue("tallaCamiseta", [])
    }
    setFieldValue(`${e.target.name}`, e.target.value)
}

  const handleButtonGroup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, values: string[], setFieldValue: any) => {
    if (!values.includes(e.currentTarget.value)) {
      setFieldValue(`${e.currentTarget.name}`, [...values, e.currentTarget.value])
    } else {
      setFieldValue(`${e.currentTarget.name}`, values.filter(v => v !== e.currentTarget.value))
    }
  }

  const handleFormikSubmit = (value: InitialValue) => {
    setDisabledButton(true)
    let allData = { ...value, images: [fileValue.image] };
    dispatch(createProduct(allData)).then(res => {
      if (typeof res === "object") {
        setDisabledButton(false)
        window.location.href = "/dashboard/products"
      }
    });
    
  }

  const initialValues: InitialValue = {
    category: "",
    gender: "",
    images: "",
    marca: "",
    name: "",
    price: 0,
    summary: "",
    stock: 0,
    tallaCamiseta: [],
    tallaPantalón: []
  }

  const tallespantalon = ["28", "30", "32", "34"]
  const tallescamiseta = ["XS", "S", "M", "L", "XL", "XXL"]

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
              <Typography variant="h3" sx={{ marginBottom: "9rem" }}>Descripcion</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Genero</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3">Categoria</Typography>
            </Box>
            <Box className={styles.leftContainer}>
              <Typography variant="h3" sx={{marginBottom: `${fileValue.image? "6rem" : "1rem"}`}}>Imagen</Typography>
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
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={PRODUCT_FORM_VALIDATOR_SCHEMA}
              onSubmit={(value) => handleFormikSubmit(value)}>
              {({ setFieldValue, values }) => (
                <Form>
                  <Field name="name" label="name">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        variant="filled"
                        label="Nombre"
                        fullWidth
                        sx={{ marginX: "5px" }}
                        color="secondary"
                        margin='normal'
                        className={styles.inputInfo}
                        error={Boolean(form.errors.name)}
                        helperText={form.errors.name && String(form.errors.name)}
                        focused
                      />
                    }
                  </Field>
                  <Field name="price" label="price">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        label="Precio"
                        className={styles.inputInfo}
                        fullWidth
                        id="outlined-number"
                        variant="filled"
                        color="secondary"
                        type="number"
                        error={Boolean(form.errors.price)}
                        helperText={form.errors.price && String(form.errors.price)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        focused
                      />
                    }
                  </Field>
                  <Field name="summary" label="summary">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        key={2}
                        label="Descripcion"
                        className={styles.inputInfo}
                        fullWidth
                        id="filled-basic"
                        variant="filled"
                        color="secondary"
                        multiline
                        rows={5}
                        helperText={form.errors.summary && String(form.errors.summary)}
                        error={Boolean(form.errors.summary)}
                        focused
                      />
                    }
                  </Field>
                  <Field name="gender" label="gender">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        select
                        label="Genero"
                        className={styles.inputInfo}
                        defaultValue=""
                        error={Boolean(form.errors.gender)}
                        helperText={form.errors.gender && String(form.errors.gender)}
                      >
                        <MenuItem value="Hombre">Hombre</MenuItem>
                        <MenuItem value="Mujer">Mujer</MenuItem>
                        <MenuItem value="Unisex">Unisex</MenuItem>
                      </TextField>
                    }
                  </Field>
                  <Field name="category" label="category">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        variant="filled"
                        fullWidth
                        select
                        label="Categoria"
                        className={styles.inputInfo}
                        defaultValue=""
                        onChange={(event) => handleCategory(event, values.category, setFieldValue)}
                        error={Boolean(form.errors.category)}
                        helperText={form.errors.category && String(form.errors.category)}
                      >
                        <MenuItem value="Camiseta">Camiseta</MenuItem>
                        <MenuItem value="Pantalones">Pantalon</MenuItem>
                      </TextField>
                    }
                  </Field>
                  <Box>
                  <Button
                    sx={{
                      marginTop: "3rem",
                      border: "solid 2px #ced4da",
                      color: "#ced4da",
                      width: "100%"
                    }}
                    onClick={(e) => widgetDisplay(e)}
                  >
                    Subir Imagen...
                  </Button>
                  {!fileValue.image ? "" : <Typography variant="subtitle1" sx={{padding: "10px", color: "white"}}>Imagen seleccionada</Typography>}
                  </Box>
                  <Field name="stock" label="stock">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        id="outlined-number"
                        variant="filled"
                        label="Stock"
                        color="secondary"
                        fullWidth
                        margin='normal'
                        type="number"
                        className={styles.inputInfo}
                        error={Boolean(form.errors.stock)}
                        helperText={form.errors.stock && String(form.errors.stock)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        focused
                      />
                    }
                  </Field>
                  <Field name="marca" label="marca">
                    {({ field, form }: FieldProps) =>
                      <TextField
                        {...field}
                        id="filled-basic"
                        variant="filled"
                        label="Marca"
                        color="secondary"
                        fullWidth
                        margin='normal'
                        className={styles.inputInfo}
                        error={Boolean(form.errors.marca)}
                        helperText={form.errors.marca && String(form.errors.marca)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        focused
                      />
                    }
                  </Field>
                  <Box className={styles.inputInfo}>
                    {values.category === "Camiseta" &&
                      <Field name="tallaCamiseta" label="tallaCamiseta">
                        {({ field, form }: FieldProps) =>
                          <ButtonGroup fullWidth>
                            {tallescamiseta.map(t =>
                              <Button {...field} key={t} onClick={(e) => handleButtonGroup(e, values.tallaCamiseta, setFieldValue)} value={t} color={values.tallaCamiseta.includes(t) ? "info" : "secondary"}>{t}</Button>
                            )}
                          </ButtonGroup>
                        }
                      </Field>
                    }
                    {values.category === "Pantalones" &&
                      <Field name="tallaPantalón" label="tallaPantalón">
                        {({ field, form }: FieldProps) =>
                          <ButtonGroup fullWidth>
                            {tallespantalon.map(t =>
                              <Button {...field} key={t} onClick={(e) => handleButtonGroup(e, values.tallaPantalón, setFieldValue)} value={t} color={values.tallaPantalón.includes(t) ? "info" : "secondary"}>{t}</Button>
                            )}
                          </ButtonGroup>
                        }
                      </Field>
                    }
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ marginBottom: "2rem", marginTop: "2rem" }}
                      disabled={disabledButton}
                    >
                      CREAR
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


/*

            <Box
              component="form"
              onSubmit={handleSubmit((data) => {
                if (data.category === "Pantalon") {
                  data.tallaPantalon = sizeArr;
                } else {
                  data.tallaCamiseta = sizeArr;
                }
                //let allData = { ...data, images: [data.images] };
                //console.log(allData);
                //dispatch(createProduct(data));
                let allData = { ...data, images: [fileValue.image] };

                dispatch(createProduct(allData));
                window.location.href = "/products";
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
                  key={4}
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
                  key={6}
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

*/
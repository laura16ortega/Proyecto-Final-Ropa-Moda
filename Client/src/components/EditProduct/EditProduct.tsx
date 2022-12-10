import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Button, TextField, MenuItem, ButtonGroup, Link } from "@mui/material"
import { Formik, FormikHelpers, Form, Field } from "formik";
import s from "./EditProduct.module.css"
import { useAppDispatch, useAppSelector } from '../../assets/hooks';
import { getProductDetail } from '../../redux/thunk-actions/productDetailsActions';
import { useParams } from 'react-router-dom';
import * as yup from "yup"
import { editProduct } from '../../redux/thunk-actions/testActions';

type ParamTypes = {
    id: string;
}

type FileType = {
    public_id: string
}

type InitialValue = {
    productId: string
    category: string,
    gender: string,
    images: string | FileType,
    marca: string,
    name: string,
    price: number,
    summary: string,
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

const EditProduct = () => {
    const dispatch = useAppDispatch()
    const [file, setFile] = useState<FileType>({
        public_id: "", // url en public_id
    })

    const { id } = useParams<keyof ParamTypes>() as ParamTypes;
    const { updateLoading } = useAppSelector(state => state.data)

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [])

    useEffect(() => {
        if (updateLoading) {
            window.location.href = "/dashboard/products"
        }
    }, [updateLoading])

    const { detailsLoading, productDetails } = useAppSelector(state => state.productDetails)


    const initialValues: InitialValue = {
        productId: id,
        category: productDetails.category,
        gender: productDetails.gender,
        images: productDetails.images,
        marca: productDetails.marca ? productDetails.marca : "",
        name: productDetails.name,
        price: productDetails.price,
        summary: productDetails.summary,
        tallaCamiseta: productDetails.tallaCamiseta,
        tallaPantalón: productDetails.tallaPantalón
    }

    const validation = yup.object({
        name: yup
            .string()
            .required("Este campo es requerido")
            .min(8, "El nombre debe ser entre 8 a 40 caracteres")
            .max(40, "El nombre debe ser entre 8 a 40 caracteres"),
        price: yup.number().required("Este campo es requerido"),
        marca: yup.string().required("Este campo es requerido"),
        gender: yup.string().required("Este campo es requerido"),
        category: yup.string().required("Este campo es requerido"),
        summary: yup
            .string()
            .required("Este campo es requerido")
            .min(4, "La descripcion debe tener mas de 4 caracteres"),
    });

    const handleButtonGroup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, values: string[], setFieldValue: any) => {
        if (!values.includes(e.currentTarget.value)) {
            setFieldValue(`${e.currentTarget.name}`, [...values, e.currentTarget.value])
        } else {
            setFieldValue(`${e.currentTarget.name}`, values.filter(v => v !== e.currentTarget.value))
        }
    }

    const handleCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, values: any, setFieldValue: any) => {
        if (e.target.value === "Camiseta") {
            setFieldValue("tallaPantalón", [])
        } else if (e.target.value === "Pantalones") {
            setFieldValue("tallaCamiseta", [])
        }
        setFieldValue(`${e.target.name}`, e.target.value)
    }

    const widgetConfig = {
        cloudName: "dayt0wtlk",
        uploadPreset: "u4ogbjix",
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

    const widgetDisplay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, setFieldValue: any) => {
        e.preventDefault();
        let myWidget = window.cloudinary.createUploadWidget(
            widgetConfig,
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    setFile({
                        public_id: result.info.url
                    })
                }
            }
        );
        myWidget.open();
    };

    const handleSubmit = (value: InitialValue, actions: FormikHelpers<InitialValue>) => {
        if (file.public_id.length) {
            value.images = file
        }
        dispatch(editProduct(value))
    }


    const firstRow = [{ name: "name", label: "Nombre" }, { name: "price", label: "Precio" }]
    const selectorRow = [{ name: "gender", label: "Genero", values: [{ valueName: "Hombre", value: "Hombre" }, { valueName: "Mujer", value: "Mujer" }, { valueName: "Unisex", value: "Unisex" }] }, { name: "category", label: "Categoria", values: [{ valueName: "Camiseta", value: "Camiseta" }, { valueName: "Pantalon", value: "Pantalones" }] }]
    const tallespantalon = ["28", "30", "32", "34"]
    const tallescamiseta = ["XS", "S", "M", "L", "XL", "XXL"]

    return (
        <Box sx={{ backgroundColor: "#EBEFF3", display: "flex", flex: 1 }}>
            {detailsLoading ? <h1> load </h1> : <Container maxWidth="lg" sx={{ paddingY: "30px" }}>
                <Box sx={{ backgroundColor: "white" }}>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validation}
                        onSubmit={(value, actions) => handleSubmit(value, actions)}>
                        {({ setFieldValue, values }) => (
                            <Form>
                                <Grid container>
                                    <Grid item md={6} xs={12} sx={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                                        <Box sx={{ padding: "10px" }}>
                                            <Typography variant="h6" sx={{ textAlign: "left", paddingBottom: "7px", borderBottom: "1px solid black", marginBottom: "10px" }}>
                                                asdasdasdas
                                            </Typography>
                                            <Box className={s.inputContainer}>
                                                {firstRow.map(e =>
                                                    <Field name={e.name} label={e.name} key={e.name}>
                                                        {({ field, form }: FieldProps) =>
                                                            <TextField
                                                                {...field}
                                                                variant="outlined"
                                                                placeholder={e.label}
                                                                fullWidth
                                                                label={e.label}
                                                                sx={{ marginX: "5px" }}
                                                                margin='normal'
                                                                error={Boolean(form.errors[e.name])}
                                                                helperText={form.errors[e.name] && String(form.errors[e.name])}
                                                            />
                                                        }
                                                    </Field>
                                                )}
                                            </Box>
                                            <Box sx={{ paddingX: "5px" }}>
                                                <Field name="marca" label="marca">
                                                    {({ field, form }: FieldProps) =>
                                                        <TextField
                                                            {...field}
                                                            variant="outlined"
                                                            fullWidth
                                                            margin='normal'
                                                            label="Marca"
                                                            placeholder="Precio"
                                                            error={Boolean(form.errors.marca)}
                                                            helperText={form.errors.marca && String(form.errors.marca)}
                                                        />
                                                    }
                                                </Field>
                                            </Box>
                                            <Box className={s.inputContainer}>
                                                {selectorRow.map(e =>
                                                    <Field name={e.name} label={e.name} key={e.name}>
                                                        {({ field, form }: FieldProps) =>
                                                            <TextField
                                                                {...field}
                                                                variant="outlined"
                                                                fullWidth
                                                                select
                                                                label={e.label}
                                                                sx={{ marginX: "5px" }}
                                                                margin='normal'
                                                                defaultValue="" // El que viene despues del llenado
                                                                onChange={(event) => handleCategory(event, values[e.name], setFieldValue)}
                                                                error={Boolean(form.errors.comment)}
                                                                helperText={form.errors[e.name] && String(form.errors[e.name])}
                                                            >
                                                                {e.values.map(val =>
                                                                    <MenuItem value={val.value} key={val.value}>{val.valueName}</MenuItem>
                                                                )}
                                                            </TextField>
                                                        }
                                                    </Field>
                                                )}
                                            </Box>
                                            <Box sx={{ marginTop: "16px", marginBottom: "8px" }}>
                                                <Typography variant='subtitle2'>Talle</Typography>
                                                {values.category === "Camiseta" &&
                                                    <Field name="tallaCamiseta" label="tallaCamiseta">
                                                        {({ field, form }: FieldProps) =>
                                                            <ButtonGroup fullWidth sx={{ padding: "0 20%" }}>
                                                                {tallescamiseta.map(t =>
                                                                    <Button {...field} key={t} onClick={(e) => handleButtonGroup(e, values.tallaCamiseta, setFieldValue)} value={t} color={values.tallaCamiseta.includes(t) ? "info" : "primary"}>{t}</Button>
                                                                )}
                                                            </ButtonGroup>
                                                        }
                                                    </Field>
                                                }
                                                {values.category === "Pantalones" &&
                                                    <Field name="tallaPantalón" label="tallaPantalón">
                                                        {({ field, form }: FieldProps) =>
                                                            <ButtonGroup fullWidth sx={{ padding: "0 20%", }}>
                                                                {tallespantalon.map(t =>
                                                                    <Button {...field} key={t} onClick={(e) => handleButtonGroup(e, values.tallaPantalón, setFieldValue)} value={t} color={values.tallaPantalón.includes(t) ? "info" : "primary"}>{t}</Button>
                                                                )}
                                                            </ButtonGroup>
                                                        }
                                                    </Field>
                                                }
                                            </Box>
                                            <Field name="summary" label="summary" style={{ padding: "5px 0" }}>
                                                {({ field, form }: FieldProps) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        label="Descripcion"
                                                        margin='normal'
                                                        placeholder='desc'
                                                        rows={5}
                                                        error={Boolean(form.errors.summary)}
                                                        helperText={form.errors.summary && String(form.errors.summary)}
                                                    />
                                                }
                                            </Field>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Box sx={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                                            <Box>
                                                <img src={
                                                    !productDetails.images
                                                        ? ""
                                                        : productDetails.images.public_id
                                                            ? productDetails.images.url
                                                            : productDetails.images[0]}
                                                    alt=""
                                                    style={{ height: "auto", width: "100%", objectFit: "cover", border: "1px solid rgba(1, 1, 1, 0.3)" }} />
                                            </Box>
                                            <Box sx={{ paddingX: "5rem" }}>
                                                <Box sx={{ marginY: "1rem" }}>
                                                    <Field name="image" label="image">
                                                        {({ field, form }: FieldProps) =>
                                                            <Button
                                                                {...field}
                                                                variant="contained"
                                                                fullWidth
                                                                disableElevation
                                                                sx={{ padding: "12px 5px" }}
                                                                onClick={e => widgetDisplay(e, setFieldValue)}
                                                                onChange={e => setFieldValue("image", file)}
                                                            >
                                                                Cambiar imagen
                                                            </Button>
                                                        }
                                                    </Field>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "space-around", margin: "1rem" }}>
                                                    <Button type="submit" variant="contained">Guardar</Button>
                                                    <Button variant="outlined">
                                                        <Link href="/dashboard/products">
                                                            Cancelar
                                                        </Link>
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
            }
        </Box>
    )
}

export default EditProduct

// textfield : stock, marca
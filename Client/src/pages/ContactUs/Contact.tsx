import React, { useState } from 'react'
import { Box, Container, Grid, Typography, Button } from "@mui/material"
import s from "./Contact.module.css"
import { Formik, FormikHelpers, Form, Field } from 'formik'
import InputField from "./InputField"
import emailjs from "@emailjs/browser"
import * as yup from "yup"
import { useNotification } from "../../components/UseNotification/UseNotification"

type InitialContactValue = {
    name: string
    email: string
    contactNum: string
    message: string
}

const Contact = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const initialValue: InitialContactValue = {
        name: "",
        email: "",
        contactNum: "",
        message: ""
    }

    const {
        displayNotification
    } = useNotification()

    const handleSubmit = (value: InitialContactValue, actions: FormikHelpers<InitialContactValue>) => {
        setLoading(true)
        // TODO: Pasar a nodemailer
        emailjs.send("service_5tiq3vl", "template_5t1ro4l", value, "vnap6grHJcb-IalvP");
        setTimeout(() => {
            setLoading(false)
            actions.resetForm()
            displayNotification({message: "Mensaje enviado con exito!", type: "success"})
        }, 2000);
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validation = yup.object({
        name: yup.string().required("Este campo es requerido").min(3, "Debe tener al menos 3 caracteres"),
        email: yup.string().email("Email no valido").required("Este campo es requerido"), // TODO: Validar email existente
        contactNum: yup.string().required("Este campo es requerido").matches(phoneRegExp, "Numero invalido"),
        message: yup.string().required("Este campo es requerido")
    })

    const inputData = [
        {
            label: "Nombre",
            name: "name"
        },
        {
            label: "Email",
            name: "email"
        },
        {
            label: "Numero de contacto",
            name: "contactNum"
        },
        {
            label: "Mensaje",
            name: "message"
        }
    ]


    return (
        <Box sx={{ backgroundColor: "#3e3e3e"}}>
            <Box className={s.contactHeader}>
                <Box>
                    <Typography variant="h1" sx={{ fontWeight: "700", marginBottom: "0.5rem" }}>
                        Ponte en contacto
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                        Nos encataria escuchar tus opiniones
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ marginTop: "5rem", paddingBottom: "5rem" }}>
                <Container maxWidth="md" >
                    <Grid container spacing={14}>
                        <Grid item md={6} className={s.contactLeft}>
                            <Box className={s.leftContainer}>
                                <Typography variant='h3'>Direccion</Typography>
                                <Typography variant="subtitle1">Calle Falsa 123</Typography>
                            </Box>
                            <Box className={s.leftContainer}>
                                <Typography variant='h3'>Telefono</Typography>
                                <Typography variant="subtitle1">(012) 345-6789</Typography>
                            </Box>
                            <Box className={s.leftContainer}>
                                <Typography variant='h3'>Envianos un email</Typography>
                                <Typography variant="subtitle1">Llena este formulario</Typography>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Formik
                                validationSchema={validation}
                                initialValues={initialValue}
                                onSubmit={(value, actions) => handleSubmit(value, actions)}>
                                {() => (
                                    <Form>
                                        {inputData.map((e, i) =>
                                            <Field key={i + 1} label={e.label} name={e.name} component={InputField} />
                                        )}
                                        <Button disabled={loading} type='submit' size='large' fullWidth variant="contained" sx={{ marginTop: "2.5rem" }}>Enviar</Button>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default Contact
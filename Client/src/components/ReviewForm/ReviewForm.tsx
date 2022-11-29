import React, { useState } from 'react'
import { Container, Box, Typography, Rating, TextField, Button, Avatar } from "@mui/material"
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useAppDispatch } from '../../assets/hooks';
import { postReview } from '../../redux/thunk-actions/reviewActions';

/* Props: userId, comment, commentTitle, rating, isAuthenticated, localuser */
type InitialValue = {
   userImage: string
   username: string
   rating: number
   comment: string
}

type FieldType = {
   title: string
   label: string
}

type FieldProps = {
   field: FieldType
   form: any
}

const ReviewForm = () => {
   // userId, userImage, name, comment, rating 
   const dispatch = useAppDispatch()

   const initialValue: InitialValue = {
      userImage: "", // Solo para mostrar en el formulario, no se envia
      username: "", // Solo para mostrar en el formulario, no se envia
      rating: 0,
      comment: ""
      // productId: "" // Props
      // userId: string // localStorage.get ---- (reemplaza userImage y username)
      // token: string // localStorage.get
   }

   const validation = yup.object({
      comment: yup
         .string()
         .required("Este campo es requerido")
         .min(3, "Debe tener al menos 3 caracteres"),
      rating: yup
         .number()
         .required("Este campo es requerido")
         .min(1, "El rating valido es de 1 a 5")
   });

   const handleSubmit = (value: InitialValue, actions: FormikHelpers<InitialValue>) => {
      console.log("Submit value: ", value)

      //dispatch(postReview(value))
      actions.resetForm()
   }

   return (
      <Box sx={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.1)", textAlign: "left" }}>
         <Container maxWidth="sm">
            <Typography variant="h6" sx={{ textAlign: "left", paddingBottom: ".7rem" }}>
               Write a review
            </Typography>
            <Formik
               initialValues={initialValue}
               validationSchema={validation}
               onSubmit={(value, actions) => handleSubmit(value, actions)}>
               {({ setFieldValue, values }) => (
                  <Form>
                     <Box sx={{ marginBottom: ".9rem", display: "flex" }}>
                        <Box>
                           <Avatar sx={{ height: "56px", width: "56px" }}>H</Avatar>
                        </Box>
                        <Box sx={{ marginLeft: "1rem" }}>
                           <Typography variant="subtitle1" sx={{ marginLeft: ".25rem" }}>
                              User1
                           </Typography>
                           <Rating name="rating" size="large" defaultValue={0} precision={0.5} value={values.rating} onChange={(e, newVal) => setFieldValue("rating", Number(newVal))} />
                        </Box>
                     </Box>
                     <ErrorMessage name="rating"/>
                     <Box sx={{ marginBottom: ".9rem" }}>
                        <Typography variant="subtitle2" sx={{ color: "#818689" }}>
                           Comentario
                        </Typography>
                        <Field name="comment" label="comment">
                           {({ field, form }: FieldProps) =>
                              <TextField 
                              {...field} 
                              variant="outlined" 
                              fullWidth 
                              multiline 
                              rows={5} 
                              error={Boolean(form.errors.comment)}
                              helperText={form.errors.comment && String(form.errors.comment)}
                              />
                           }
                        </Field>
                     </Box>
                     <Button
                        type="submit"
                        size="large"
                        variant="contained"
                     >
                        Publicar review
                        </Button>
                  </Form>
               )}

            </Formik>
         </Container>
      </Box>
   )
}
// is authenticated ? form de auth0 : form locl 

export default ReviewForm
import React, { useState } from 'react'
import { Container, Box, Typography, Rating, TextField, Button, Avatar, FormHelperText  } from "@mui/material"
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useAppDispatch } from '../../assets/hooks';
import { postReview } from '../../redux/thunk-actions/reviewActions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


/* Props: userId, comment, commentTitle, rating, isAuthenticated, localuser */
type InitialValue = {
   userId: string
   rating: number
   comment: string
   productId: string | undefined
   token: string | null
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
   const {id:productId} = useParams();
   const dispatch = useAppDispatch();
   const {userId} = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")!) : "";
   //const token = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : ""


   const initialValue: InitialValue = {
      userId: userId, // Solo para mostrar en el formulario, no se envia
      rating: 0,
      comment: "",
      productId: productId, // Props
      token: localStorage.getItem("jwt") ? localStorage.getItem("jwt") : ""// localStorage.get
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

   const handleSubmit = async(value: InitialValue, actions: FormikHelpers<InitialValue>) => {
      try {
         dispatch(await postReview(value))
         toast.success("Review Created Successfully")
         actions.resetForm()
      } catch (error) {
         console.log(error)
      }
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
                     <Box sx={{ marginBottom: ".9rem"}}>
                        <Box sx={{display: "flex"}}>
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
                        <ErrorMessage name="rating" render={msg => <FormHelperText error={msg ? true : false}>{msg}</FormHelperText>} />
                     </Box>
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
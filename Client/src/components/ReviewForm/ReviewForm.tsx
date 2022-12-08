import React, { useState } from 'react'
import { Container, Box, Typography, Rating, TextField, Button, Avatar, FormHelperText, Collapse, Alert } from "@mui/material"
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '../../assets/hooks';
import { postReview } from '../../redux/thunk-actions/reviewActions';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNotification } from "../UseNotification/UseNotification";
import { unwrapResult } from '@reduxjs/toolkit'


/* Props: userId, comment, commentTitle, rating, isAuthenticated, localuser */
type InitialValue = {
   rating: number
   comment: string
   userId: string
   token: string
   productId: string
}

type FieldType = {
   title: string
   label: string
}

type FieldProps = {
   field: FieldType
   form: any
}

type ReviewFormProps = {
   productId: string
   setOpenReviewForm: React.Dispatch<React.SetStateAction<boolean>>
   forceUpdate: React.DispatchWithoutAction
}

const ReviewForm = ({ productId, setOpenReviewForm, forceUpdate }: ReviewFormProps) => {
   // userId, userImage, name, comment, rating 
   const dispatch = useAppDispatch()
   const [errors, setErrors] = useState<boolean>(false)

   const { user, userLoading, token } = useAppSelector(state => state.auth)
   const { postReviewLoading, postReviewError, postReviewSuccess } = useAppSelector(state => state.review)

   const loggedUser = Object.keys(user).length

   const initialValue: InitialValue = {
      rating: 0,
      comment: "",
      userId: user ? user._id : "",
      token: token ? token : "",
      productId
   }

   const validation = yup.object({
      comment: yup
         .string()
         .required("Este campo es requerido")
         .min(3, "Debe tener al menos 3 caracteres"),
      rating: yup
         .number()
         .required("Este campo es requerido")
         .min(0.5, "El rating valido es de 0.5 a 5")
   });

   const { displayNotification } = useNotification();

   const handleSubmit = async (value: InitialValue, actions: FormikHelpers<InitialValue>) => {
      try {
         const resultAction = await dispatch(postReview(value))
         const originalPromiseResult = unwrapResult(resultAction)
         displayNotification({
            message: "Review enviada con exito!",
            type: "success",
         });
         setOpenReviewForm(false)
         forceUpdate()
         actions.resetForm()
      } catch (error) {
       setErrors(true)
      }
   }

   return (
      <Box sx={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.1)", textAlign: "left" }}>
         <Container maxWidth="sm">
            <Collapse in={errors}>
               <Box>
                  <Alert severity='error' sx={{ mb: 2, textAlign: "center" }}>
                     {postReviewError}
                  </Alert>
               </Box>
            </Collapse>
            <Typography variant="h6" sx={{ textAlign: "left", paddingBottom: ".7rem" }}>
               Cuentanos tu opinion
            </Typography>
            <Formik
               initialValues={initialValue}
               validationSchema={validation}
               onSubmit={(value, actions) => handleSubmit(value, actions)}>
               {({ setFieldValue, values }) => (
                  <Form>
                     <Box sx={{ marginBottom: ".9rem" }}>
                        <Box sx={{ display: "flex" }}>
                           <Box>
                              <Avatar src={user?.image} sx={{ height: "56px", width: "56px" }}>
                                 {loggedUser > 0 ? user.fullName.slice(0, 1).toUpperCase() : ""}
                              </Avatar>
                           </Box>
                           <Box sx={{ marginLeft: "1rem" }}>
                              <Typography variant="subtitle1" sx={{ marginLeft: ".25rem" }}>
                                 {loggedUser > 0 ? user.fullName : ""}
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
                        disabled={postReviewLoading}
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
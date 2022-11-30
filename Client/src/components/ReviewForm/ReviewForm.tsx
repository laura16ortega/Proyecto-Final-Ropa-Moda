import React from 'react'
import { Container, Box, Typography, Rating, TextField, Button, Avatar, FormHelperText, Collapse, Alert } from "@mui/material"
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '../../assets/hooks';
import { postReview } from '../../redux/thunk-actions/reviewActions';


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
}

const ReviewForm = ({ productId }: ReviewFormProps) => {
   // userId, userImage, name, comment, rating 
   const dispatch = useAppDispatch()

   const { user, userLoading, token } = useAppSelector(state => state.auth)
   const { postReviewLoading, postReviewError, postReviewSuccess } = useAppSelector(state => state.review)

   const initialValue: InitialValue = {
      rating: 0,
      comment: "",
      userId: user ? user.userId : "",
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
         .min(1, "El rating valido es de 1 a 5")
   });

   const handleSubmit = (value: InitialValue, actions: FormikHelpers<InitialValue>) => {
      console.log("Submit value: ", value)

      dispatch(postReview(value))
      actions.resetForm()
   }

   return (
      <Box sx={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.1)", textAlign: "left" }}>
         <Container maxWidth="sm">
            <Collapse in={postReviewError.length > 1}>
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
                              <Avatar src={/*user.image*/user?.email} sx={{ height: "56px", width: "56px" }} />
                           </Box>
                           <Box sx={{ marginLeft: "1rem" }}>
                              <Typography variant="subtitle1" sx={{ marginLeft: ".25rem" }}>
                                 {user?.fullName}
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
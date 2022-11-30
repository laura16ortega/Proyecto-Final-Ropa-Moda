import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { FormHelperText } from "@mui/material";
import * as Yup from "yup";
import { useNotification } from "../../components/UseNotification/UseNotification";
import axios from 'axios'
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { registerUser } from "../../redux/thunk-actions/authActions";


interface FormValues{
  fullName: string;
  email: string;
  gender: string;
  phone_number: number;
  password: string;
  confirmPassword: string;
  termsAndConditions?: boolean;
}

const Register = () => {
  const { displayNotification } = useNotification();
  const dispatch = useAppDispatch();
  const paperStyle = { padding: "30px 20px", width: 500, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const initialValues = {
    fullName: "",
    email: "",
    gender: "",
    phone_number: 0,
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(3, "Es Demasiado Corto").required("Required "),
    email: Yup.string().email("Ingrese un email valido").required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Required"),
    phoneNumber: Yup.number()
      .typeError("Introduzca un número válido")
      .required("Required"),
    password: Yup.string()
      .min(8, "la longitud mínima de la contraseña debe ser 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Contraseña no coincide")
      .required("Required"),
    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Aceptar términos y condiciones"
    ),
  });

 
  const onSubmit = async(values: FormValues) => {
    try {
      const {fullName, password, email, phone_number} = values 
      dispatch(registerUser({fullName, password, email, phone_number}));

      displayNotification({
        message: "Se registró satisfactoriamente ! ",
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (error) {
      alert(error)
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Register</h2>
          <Typography variant="caption" gutterBottom>
            please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name="fullName"
                label="FullName"
                placeholder="Enter you fullName"
                helperText={<ErrorMessage name="fullName" />}
              />

              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter you email"
                helperText={<ErrorMessage name="email" />}
              />

              <FormControl component="fieldset" style={marginTop}>
                <FormLabel component="legend">Gender</FormLabel>

                <Field
                  as={RadioGroup}
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Field>
              </FormControl>

              <FormHelperText>
                <ErrorMessage name="gender" />
              </FormHelperText>

              <Field
                as={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter you phone number"
                helperText={<ErrorMessage name="phoneNumber" />}
              />

              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Password"
                placeholder="Enter you Password"
                helperText={<ErrorMessage name="password" />}
              />

              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm you password"
                helperText={<ErrorMessage name="confirmPassword" />}
              />

              <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="I accept the terms and conditions."
              />

              <FormHelperText>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText>

              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
              >
                {props.isSubmitting ? "loading" : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Register;

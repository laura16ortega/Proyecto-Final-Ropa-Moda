import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
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
import { useAppDispatch } from "../../assets/hooks";
import { registerUser } from "../../redux/thunk-actions/authActions";
import { unwrapResult } from "@reduxjs/toolkit"


interface FormValues{
  fullName: string;
  email: string;
  gender: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  termsAndConditions?: boolean;
  image: string
}
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

const Register = () => {
  const [fileValue, setFileValue] = useState({
    image: "",
  });
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
    phone_number: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
    image:""
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
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(3, "Es Demasiado Corto").required("Required "),
    email: Yup.string().email("Ingrese un email valido").required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Required"),
    phone_number: Yup.string()
      .required("Required")
      .matches(/(\d|\s|_|@|\.|,)/g, "Introduzca un número válido"),
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
      const newUser = {
        image:fileValue.image,
        fullName,
        password,
        email,
        phone_number
      }
      const registerDispatch = await dispatch(registerUser(newUser));
      unwrapResult(registerDispatch)
      displayNotification({
        message: "Se registró satisfactoriamente ! ",
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (error: any) {
      displayNotification({
        message: error,
        type: "error",
      });
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
                name="phone_number"
                label="Phone Number"
                placeholder="Enter you phone number"
                helperText={<ErrorMessage name="phone_number" />}
              />
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

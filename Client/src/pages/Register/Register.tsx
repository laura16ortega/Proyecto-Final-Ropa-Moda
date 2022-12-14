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
  const paperStyle = { padding: "30px 20px", width: 500, margin: "20px auto", marginBottom:'4rem',marginTop:'3rem' };
  const headerStyle = { marginTop:'-2rem', marginBottom:'2rem' };
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
    fullName: Yup.string().min(3, "Es Demasiado Corto").required("Requerido"),
    email: Yup.string().email("Ingrese un email valido").required("Requerido"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Requerido")
      .required("Requerido"),
    phone_number: Yup.string()
      .required("Requerido")
      .matches(/(\d|\s|_|@|\.|,)/g, "Introduzca un número válido"),
    password: Yup.string()
      .min(8, "la longitud mínima de la contraseña debe ser 8")
      .required("Requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Contraseña no coincide")
      .required("Requerido"),
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
          <h2 style={headerStyle}>Crea tu cuenta en FC</h2>
          
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <div style={{marginBottom:'1rem'}}> 
              <Field
                as={TextField}
                fullWidth
                name="fullName"
                label="Nombre y apellido"
                placeholder="Ingresa tu nombre"
                helperText={<ErrorMessage name="fullName"  />} />
              </div>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Ingresa tu email"
                helperText={<ErrorMessage name="email" 
                
                />}
              />

              <FormControl component="fieldset" style={{marginTop:'2rem'}}>
                <FormLabel component="legend" style={{marginBottom:'1rem'}}>Genero</FormLabel>
              <div style={{marginBottom:'1rem'}}>
                <Field
                  as={RadioGroup}
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Femenino"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Masculino"
                  />
                </Field>
                </div>
              </FormControl>

              <FormHelperText>
                <ErrorMessage name="gender" />
              </FormHelperText>

              <Field
                as={TextField}
                fullWidth
                name="phone_number"
                label="Numero de telefono"
                placeholder="Ingresa tu numero de telefono"
                helperText={<ErrorMessage name="phone_number" />}
              />
              <Button
                  sx={{
                    marginTop: "2rem",marginBottom:'2rem',
                    border: "solid 2px #ced4da",
               
                  }}
                  onClick={(e) => widgetDisplay(e)}
                >
                  Subir Imagen...
                </Button>

                <div style={{marginBottom:'1rem'}}> 
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                helperText={<ErrorMessage name="password" />}
              />
              </div>

              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirmar contraseña"
                placeholder="Confirma tu contraseña"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <div style={{marginTop:'1.5rem'}}>
              <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="Acepto los terminos y condiciones."
              />
              </div>
              <FormHelperText>
                <ErrorMessage name="termsAndConditions" />
              </FormHelperText>
              
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={{marginTop:'1rem'}}
              >
                {props.isSubmitting ? "loading" : "Registrarse"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Register;

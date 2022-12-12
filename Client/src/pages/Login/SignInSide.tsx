import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNotification } from "../../components/UseNotification/UseNotification";
/* import { setUser } from "../../redux/slices/authSlice"; */
import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { loginUser } from "../../redux/thunk-actions/authActions";
import { unwrapResult } from '@reduxjs/toolkit'
import Alert from "@mui/material/Alert"
import Collapse from "@mui/material/Collapse"
import { LoginButton } from "../../components";


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Moda
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {/* 
  const googleLogo = require('../../assets/images/google.svg');
 */  const dispatch = useAppDispatch()
  const { displayNotification } = useNotification();
  const [loginErrors, setLoginErrors] = useState<boolean>(false)

  const { userError } = useAppSelector(state => state.auth)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const user = {
        email: data.get("email"),
        password: data.get("password"),
      };  
      const dispatchLogin = await dispatch(loginUser(user));
      unwrapResult(dispatchLogin)
      displayNotification({ message: "Bienvenido", type: "success" });
      setTimeout(()=>{
        window.location.href = "/";
      },800)
    } catch (error) {
      setLoginErrors(true)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://images.unsplash.com/photo-1665398288056-8da669cc7909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box
              component="form"
              /* noValidate */ onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>

              <LoginButton/>

              <Collapse in={loginErrors}>
                <Alert severity='error' sx={{ mb: 2, textAlign: "center" }} onClose={() => setLoginErrors(false)}>
                  {userError}
                </Alert>
              </Collapse>

              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    Te has olvidado de tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Aun no tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNotification } from '../../components/UseNotification/UseNotification';
import axios from 'axios';

import { useState } from 'react';



function Copyright(props: any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Moda
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function SignInSide() {
/*   const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    password:'',
    email:''
  }) */

  const { displayNotification } = useNotification();

  const LoginUser = async (user: any) => {
    try{
      const response = await axios.post(`http://localhost:3001/api/auth/login`, user);
      if(response){ 
        displayNotification({ message: "Bienvenido", type:"success" })
        window.localStorage.setItem('jwt', response.data.loginData.token)
        console.log(window.localStorage.getItem('jwt'))

        setTimeout(() => {
          window.location.href = '/'
        },500)
    }
    }catch{
      displayNotification({ message: "E-mail o contraseña incorrectos", type:"error" })
    }
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      "email":data.get('email'),
      "password":data.get('password')
    }
    return LoginUser(user)
  };

/*   const handleInputChange = (e: any) => {
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }
  const validations = () => {
    let errores = {}
    
  } */


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box component="form" /* noValidate */ onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Te has olvidado de tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
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
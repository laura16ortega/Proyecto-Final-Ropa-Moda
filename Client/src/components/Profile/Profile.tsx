import { useAppDispatch, useAppSelector } from "../../assets/hooks";
export default Profile;
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
import { useEffect } from 'react';

type User = {
  fullName: string;
  email: string,
  isAdmin: boolean,
  userId: string
}

function Profile(props: any) {
    const theme = createTheme();
    const {user}:any = useAppSelector((state) => state.auth);

    

        const perfil = localStorage.getItem('userInfo');
        

 
    return (
      <>
        <ThemeProvider theme={theme}>
          
                  
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          
        
          <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 5,
                mx: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 7, bgcolor: "secondary.main", width: 106, height: 106 }}>
             
              </Avatar>
              <Typography component="h1" variant="h5">
              {user.fullName}
              </Typography>

              <Typography style={{marginTop:"1rem"}}>
              {user.email}
              </Typography>

              <Box
                component="form"
                /* noValidate */ 
                sx={{ mt: 1 }}
              >

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  edit
                </Button>
                <Grid container>

                </Grid>
               
              </Box>
            </Box>
          </Grid>
          {/* <Grid
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
            backgroundPosition: "left",
          }}
        /> */}
        </Grid>
      </ThemeProvider>
      </>
    );
}

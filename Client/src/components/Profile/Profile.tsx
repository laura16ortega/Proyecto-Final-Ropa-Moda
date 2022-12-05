import { useAppDispatch, useAppSelector } from "../../assets/hooks";
export default Profile;
import * as React from "react";
import {Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Box,Typography,} from "@mui/material"
import { getUserInfo } from "../../redux/thunk-actions/authActions";
import Button, { buttonClasses } from "@mui/material/Button";


import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

type User = {
  fullName: string;
  email: string;
  isAdmin: boolean;
  userId: string;
  phone_number: number;
};

function Profile(props: any) {
  const dispatch = useAppDispatch()
  const theme = createTheme();
  const { user }= useAppSelector((state) => state.auth);
  const perfil = localStorage.getItem("userInfo");

  
  console.log(window.localStorage.getItem('jwt'))

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [input, setInput] = React.useState<any>({});

  const token = window.localStorage.getItem('jwt')
  const userId = user.userId
/*   const obj1 = {
    token:{token},
    userId:{userId}
  } */

  const submitHandler = async (event: React.FormEvent<HTMLButtonElement>) => {
    try{
      event.preventDefault()
      const { data } = await axios.patch(`http://localhost:3001/api/v1/users/updateUser`, input, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      
      setEditName(false);
      setEditEmail(false);
      
      return data;
    }catch(err){
      console.log(err)
    }


  }

  const inputHandler = () => {
    const target = event?.target as HTMLInputElement;
    setInput({
      ...input,
      [`${target.name}`]: target.value,
      userId: userId
    })
  };
console.log(input)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={12}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 5,
                mx: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  m: 7,
                  bgcolor: "secondary.main",
                  width: 106,
                  height: 106,
                }}
              ></Avatar>

              <div
                style={{ display: "flex", flexDirection: "row" }}
              >
                {editName ? (
                  <div>
                    <TextField
                      margin="normal"
                      required
                      id="fullName"
                      label="Nuevo nombre"
                      name="fullName"
                      autoComplete="off"
                      type="text"
                      autoFocus
                      onChange={inputHandler}
                    />
                    <Button
                      sx={{ mt: 3, mb: 2 }}
                      style={{ marginLeft: "1rem" }}
                      onClick={e => {setEditName(false)
                      setInput({
                      })}}
                    >
                      <CancelIcon />
                    </Button>
                    <Button name='name' sx={{ mt: 3, mb: 2 }} onClick={(event) => submitHandler(event)} >
                      <CheckIcon />
                    </Button>
                 
                  </div>
                ) : (
                  <div>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ width: "10rem" }}
                    >
                      {user.fullName}
                    </Typography>
                  </div>
                )}
                {editName ? (
                  <div> </div>
                ) : (
                  <Button onClick={e => {setEditName(!editName)
                  setEditEmail(false)
                  setInput({
                  })}}>
                    <EditIcon />
                  </Button>
                )}

              </div>















              <div
                style={{ display: "flex", flexDirection: "row" }}
              >
                {editEmail ? (
                  <div>
                    <TextField
                      margin="normal"
                      required
                      id="email"
                      label="Nuevo email"
                      name="email"
                      autoComplete="off"
                      type="text"
                      autoFocus
                      onChange={inputHandler}
                    />
                    <Button
                      sx={{ mt: 3, mb: 2 }}
                      name='name'
                      
                      style={{ marginLeft: "1rem" }}
                      onClick={e => {setEditEmail(false)
                      setInput({})}}
                    >
                      <CancelIcon />
                    </Button>
                    <Button name='name' sx={{ mt: 3, mb: 2 }}>
                      <CheckIcon />
                    </Button>
            
                  </div>
                ) : (
                  <div>
              <Typography style={{ marginTop: "1rem" }}>
                {user.email}
              </Typography>
                  </div>
                )}
                {editEmail ? (
                  <div> </div>
                ) : (
                  <Button onClick={(e) => {setEditEmail(!editEmail)
                  setEditName(false)
                  setInput({
                  })} }>
                    <EditIcon />
                  </Button>
                )}
              </div>



              <Box
                component="form"
                /* noValidate */
                sx={{ mt: 1 }}
              >
                <Grid container></Grid>
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

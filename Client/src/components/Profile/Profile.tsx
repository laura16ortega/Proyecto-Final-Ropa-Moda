import { useAppDispatch, useAppSelector } from "../../assets/hooks";
export default Profile;
import * as React from "react";
import {Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Box,Typography,} from "@mui/material"
import { getUserInfo } from "../../redux/thunk-actions/authActions";
import Button, { buttonClasses } from "@mui/material/Button";
import { useNotification } from "../../components/UseNotification/UseNotification";


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
  const { displayNotification } = useNotification();
  const { clearNotification } = useNotification();
  const dispatch = useAppDispatch()
  const theme = createTheme();
  const { user }= useAppSelector((state) => state.auth);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [input, setInput] = React.useState<any>({});
  const token = window.localStorage.getItem('jwt')
  const userId = user.userId ? user.userId : window.localStorage.getItem('userId');
  const [editProfile, setEditProfile] = useState(false);

  const [error, setError] = React.useState<any>({});


  useEffect(() => { 
   validateEdit(input);
    
  },[error, editProfile])

  type errorType = {
    [key: string]: any;
  }
  
  const validateEdit = (input: any) => {
    const error: errorType = {}

    if(input.fullName?.length < 4) error.fullName = displayNotification({ message: `Ingresar minimo 4 caracteres`, type: "warning" })

   /*  if(filter.test(input.email)) error.email = displayNotification({message: "Ingrese un e-mail valido", type:"warning"})  */
    return error  
  }
  
  const submitHandler = async (event: React.FormEvent<HTMLButtonElement>) => {
    if (Object.keys(error).length > 0) {
      return displayNotification({message:"Completa los campos correctamente", type: "warning"})
    } else {
    try{

      event.preventDefault()
      clearNotification()
      if(!(input.fullName?.length < 4) || input.email?.length.includes('@')) displayNotification({ message: "*Ingresar minimo 4 caracteres", type: "warning" });
      
      const userCredentials = {
        token: token,
        userId: userId,
      };
      
    
      const { data } = await axios.patch(`http://localhost:3001/api/v1/users/updateUser`, input, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditName(false);
      setEditEmail(false);
      if(userId) window.localStorage.setItem('userId',userId)
     
      const sendUserInfo = await dispatch(getUserInfo(userCredentials))
      
      displayNotification({message:"Cambio efectuado satisfactoriamente", type: "success"})
      if(data) return sendUserInfo;
     
      
    }catch(err){
      console.log(err)
    }
  }
  }

  const inputHandler = ()  => {
    
    const target = event?.target as HTMLInputElement;

    setInput({
      ...input,
      [`${target.name}`]: target.value,
      userId: userId
    })
    setError(validateEdit({...input,
    [`${target.name}`]: target.value,}))
  };
/* console.log(input) */
  const handleEditProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditProfile(!editProfile)
  }

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
                          { editProfile  ? (
              <Button  style={{marginBottom:'-6rem', marginLeft:'8rem'}} sx={{ mt: 3, mb: 2 }} onClick={(event) => handleEditProfile(event)} >
                      <CheckIcon /> Hecho
                    </Button>) : (                          <Button style={{marginBottom:'-6rem', marginLeft:'6rem'}} sx={{ mt: 3, mb: 2 }} onClick={(event) => handleEditProfile(event)} >
                      <EditIcon /> Editar datos
                    </Button>)}


            { editProfile ? (<Box
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
              <div>  </div>
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
            </Box>) 
            : /* Arriba perfil editable, abajo perfil no editable */
            (
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
              <div>  </div>
              <div
                style={{ display: "flex", flexDirection: "row" }}
              >


                  <div>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ width: "10rem" }}
                    >
                      {user.fullName}
                    </Typography>
                  </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row" }}
              >
                  <div>
              <Typography style={{ marginTop: "1rem" }}>
                {user.email}
              </Typography>
                  </div>
              </div>
              <Box
                component="form"
                /* noValidate */
                sx={{ mt: 1 }}
              >
                <Grid container></Grid>
              </Box>
            </Box>
            )}

          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

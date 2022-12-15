import { useAppDispatch, useAppSelector } from "../../assets/hooks";
export default Profile;
import * as React from "react";
import { Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Box, Typography, IconButton } from "@mui/material"
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
import s from "./Profile.module.css"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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
  const { user } = useAppSelector((state) => state.auth);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [input, setInput] = React.useState<any>({});
  const token = window.localStorage.getItem('jwt')
  const userId = user.userId ? user.userId : window.localStorage.getItem('userId');
  const [editProfile, setEditProfile] = useState(false);

  const [error, setError] = React.useState<any>({});


  useEffect(() => {
    validateEdit(input);
  }, [error, editProfile])

  type errorType = {
    [key: string]: any;
  }

  const validateEdit = (input: any) => {
    const error: errorType = {}

    if (input.fullName?.length < 4) error.fullName = displayNotification({ message: `Ingresar minimo 4 caracteres`, type: "warning" })

    /*  if(filter.test(input.email)) error.email = displayNotification({message: "Ingrese un e-mail valido", type:"warning"})  */
    return error
  }

  const submitHandler = async (event: React.FormEvent<HTMLButtonElement>) => {
    if (Object.keys(error).length > 0) {
      return displayNotification({ message: "Completa los campos correctamente", type: "warning" })
    } else if (!Object.keys(input).length) {
      setEditProfile(!editProfile)
    } else {
      try {

        clearNotification()
        if (!(input.fullName?.length < 4) || input.email?.length.includes('@')) displayNotification({ message: "*Ingresar minimo 4 caracteres", type: "warning" });

        const userCredentials = {
          token: token,
          userId: userId,
        };


        const { data } = await axios.patch(`${BACKEND_URL}/api/v1/users/updateUser`, input, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setEditName(false);
        setEditEmail(false);
        if (userId) window.localStorage.setItem('userId', userId)

        const sendUserInfo = await dispatch(getUserInfo(userCredentials))

        displayNotification({ message: "Cambio efectuado satisfactoriamente", type: "success" })
        setEditProfile(!editProfile)
        setInput({})
        if (data) return sendUserInfo;

      } catch (err) {
        console.log(err)
      }
    }
  }

  const inputHandler = () => {

    const target = event?.target as HTMLInputElement;

    setInput({
      ...input,
      [`${target.name}`]: target.value,
      userId: userId
    })
    setError(validateEdit({
      ...input,
      [`${target.name}`]: target.value,
    }))
  };
  /* console.log(input) */
  const handleEditProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setEditProfile(!editProfile)
  }

  const widgetConfig = {
    cloudName: "dayt0wtlk",
    uploadPreset: "uqat49qi",
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

  const widgetDisplay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let myWidget = window.cloudinary.createUploadWidget(
      widgetConfig,
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setInput({
            ...input,
            image: result.info.url,
            userId: userId
          })
        }
      }
    );
    myWidget.open();
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className={s.profileInfo} style={{marginBottom:'5rem'}}>
          <Box className={s.backgroundImage}>
            <img className={s.imgFit} src="https://images.unsplash.com/photo-1511207538754-e8555f2bc187?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=88672068827eaeeab540f584b883cc66&auto=format&fit=crop&w=1164&q=80" alt="nada" />
          </Box>
          {editProfile ? (
            <Box
              sx={{
                mx: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Box className={s.profilePhoto}>
                <Button className={s.avatarButton} onClick={e => widgetDisplay(e)}>
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                      width: 106,
                      height: 106,
                    }}
                    src={input.image ? input.image : user.image}
                    className={s.avatarEdit}
                  />
                  <EditIcon className={s.avatarIcon} />
                </Button>
              </Box>
              <Box className={s.profileData}>
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
                        onClick={e => {
                          setEditName(false)
                          setInput({
                          })
                        }}
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
                    <Button onClick={e => {
                      setEditName(!editName)
                      setEditEmail(false)

                    }}>
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
                        onClick={e => {
                          setEditEmail(false)
                          setInput({})
                        }}
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
                    <Button onClick={(e) => {
                      setEditEmail(!editEmail)
                      setEditName(false)

                    }}>
                      <EditIcon />
                    </Button>
                  )}
                </div>
              </Box>
              <Button variant="contained" disableElevation color="primary" onClick={(event) => submitHandler(input)} fullWidth sx={{ width: "95%" }}>
                <CheckIcon /> Hecho
              </Button>
              <Box
                component="form"
                /* noValidate */
                sx={{ mt: 1 }}
              >
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                mx: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className={s.profilePhoto}>
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    width: 106,
                    height: 106,
                  }}
                  src={user.image}
                />
              </Box>
              <Box className={s.profileData}>
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
              </Box>
              <Button variant="contained" disableElevation color="primary" onClick={(event) => handleEditProfile(event)} fullWidth sx={{ width: "95%" }}>
                <EditIcon /> Editar datos
              </Button>
              <Box
                component="form"
                /* noValidate */
                sx={{ mt: 1 }}
              >
              </Box>
            </Box>)}
        </Box>
      </ThemeProvider>
    </Box>
  );
}

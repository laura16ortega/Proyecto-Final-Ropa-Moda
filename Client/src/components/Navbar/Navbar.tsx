import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Badge,
} from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { NavLink, UNSAFE_RouteContext } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import Search from "../Search/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useAppDispatch } from "../../assets/hooks";
import { useEffect } from "react";
import { useAppSelector } from "../../assets/hooks";
import type { mappedDbProductsType } from "../../redux/types/productTypes";
import { logout } from "../../redux/slices/authSlice";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart); // Actualiza numeros del carro
  const cartItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [];
  const itemRes = cartItems?.reduce(
    (total: number, item: mappedDbProductsType) => total + item.quantity,
    0
  );

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logout());
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Search />
          {/*                 <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <CheckroomIcon />
                    </IconButton> */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" className={styles.logo} />
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              component={NavLink}
              to="/products"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Inicio
            </Button>
            <Button
              component={NavLink}
              to="/create"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Crea tu prenda
            </Button>
            {!localStorage.getItem("jwt") ? (
              /*                         <Button 
                        component={NavLink}
                        to="/login"
                        sx={{
                            textTransform: "none",
                          '&.active': {
                            background:'black',
                          }
                        }}
                        color='inherit'
                        >
                        Ingresar
                        </Button> */ <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                <LoginIcon />
              </IconButton>
            ) : (
              <div></div>
            )}

            {window.localStorage.getItem("jwt") ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="logo"
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                >
                  <PersonIcon />
                </IconButton>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="logo"
                >
                  <SettingsApplicationsIcon />
                </IconButton>
              </>
            ) : (
              <div> </div>
            )}
            <IconButton
              component={NavLink}
              to="/cart"
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <Badge badgeContent={itemRes} color="warning" max={99}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {window.localStorage.getItem("jwt") ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            ) : (
              <div></div>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

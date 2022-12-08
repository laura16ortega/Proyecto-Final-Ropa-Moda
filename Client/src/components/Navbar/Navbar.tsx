import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Badge,
  Input,
  Drawer,
  List,
} from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, UNSAFE_RouteContext } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import Search from "../Search/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useAppDispatch } from "../../assets/hooks";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../assets/hooks";
import type { mappedDbProductsType } from "../../redux/types/productTypes";
import { logout } from "../../redux/slices/authSlice";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {useAuth0} from "@auth0/auth0-react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const {logout:logoutAuth0} = useAuth0();
  const { cart } = useAppSelector((state) => state.cart); // Actualiza numeros del carro
  const { fav } = useAppSelector((state) => state.fav); // Actualiza numeros del carro

  const favItems = localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav")!)
    : [];
  const favAmount = favItems?.reduce(
    (total: number, item: mappedDbProductsType) => total + item.quantity,
    0
  );
  console.log(favItems);

  const handleLogout = (event: any) => {
    event.preventDefault();
    logoutAuth0();
    dispatch(logout());
    window.localStorage.removeItem("User")
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const [check, setCheck] = useState(false);

  const toggleDrawer = () => {
    setCheck(!check);
  };

  const navigate = useNavigate();


  
  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Search />
          {/*                 <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <CheckroomIcon />
                      </IconButton> */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" className={styles.logo} />
          </Typography>

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

          <li className={styles.logos}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              onClick={() => {
                navigate("/products");
              }}
            >
              <HomeIcon />
            </IconButton>
          </li>
          {window.localStorage.getItem("jwt") ? (
            <li className={styles.logos}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <PersonIcon />
              </IconButton>
              <IconButton
                component={NavLink}
                to="/favoritos"
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
              >
                <Badge badgeContent={favAmount} color="warning" max={99}>
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </li>
          ) : (
            <div> </div>
          )}

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
                        </Button> */
            <li className={styles.logos}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <LoginIcon />
              </IconButton>
            </li>
          ) : (
            <div></div>
          )}

          <li className={styles.logos}>
            <IconButton
              component={NavLink}
              to="/cart"
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <Badge color="warning" max={99}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </li>

          {window.localStorage.getItem("jwt") ? (
            <li className={styles.logos}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </li>
          ) : (
            <div></div>
          )}
          <li className={styles.logoResponsive}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              onClick={toggleDrawer}
            >
              <DehazeIcon />
            </IconButton>
          </li>

          <Drawer anchor="left" open={check} onClose={toggleDrawer}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <ListItemIcon>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="logo"
                    >
                      <HomeIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </ListItem>

              {window.localStorage.getItem("jwt") ? (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <ListItemIcon>
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="logo"
                        >
                          <PersonIcon />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText primary="Perfil" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/favoritos");
                      }}
                    >
                      <ListItemIcon>
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="logo"
                        >
                          <Badge
                            badgeContent={favAmount}
                            color="warning"
                            max={99}
                          >
                            <FavoriteBorderIcon />
                          </Badge>
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText primary="Favoritos" />
                    </ListItemButton>
                  </ListItem>
                </>
              ) : (
                <div> </div>
              )}

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
                        </Button> */
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <ListItemIcon>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                      >
                        <LoginIcon />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Ingresar" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <div></div>
              )}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <ListItemIcon>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="logo"
                    >
                      <Badge color="warning" max={99}>
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Carrito" />
                </ListItemButton>
              </ListItem>
              {window.localStorage.getItem("jwt") ? (
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => handleLogout(e)}>
                    <ListItemIcon>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                      >
                        <LogoutIcon />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText primary="Salir" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <div></div>
              )}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;

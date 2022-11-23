import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { NavLink, UNSAFE_RouteContext } from "react-router-dom";
import SearchBar from "../Search/Search";
import UserNavBtns from "../UserNavBtns/UserNavBtns";
export const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <SearchBar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Moda
          </Typography>
          <Stack direction="row" spacing={2}>
            {/* <Search /> */}
            <Button
              component={NavLink}
              to="/"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Home
            </Button>

            <Button
              component={NavLink}
              to="/categorias"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Categorias
            </Button>

            <Button
              component={NavLink}
              to="/hombres"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Hombres
            </Button>

            <Button
              component={NavLink}
              to="/mujeres"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Mujeres
            </Button>

            <Button
              component={NavLink}
              to="/login"
              sx={{
                textTransform: "none",
                "&.active": {
                  background: "black",
                },
              }}
              color="inherit"
            >
              Ingresar
            </Button>
            <UserNavBtns />
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

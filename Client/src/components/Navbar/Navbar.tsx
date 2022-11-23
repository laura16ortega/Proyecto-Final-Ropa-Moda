import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { NavLink, UNSAFE_RouteContext } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';
import Search from "../Search/Search";
import { useEffect} from 'react';

export const Navbar = () => {
    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      window.localStorage.removeItem('jwt')
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    }
    return (
      <div>
<AppBar position='static'>
                <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                        <CheckroomIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                        Moda
                    </Typography>
                    <Stack direction='row' spacing={2}>
                    <Button 
                        component={NavLink}
                        to="/"
                        sx={{
                            textTransform: "none",
                          '&.active': {
                            background:'black',
                          }
                        }}
                        color='inherit'
                        >
                        Home
                        </Button>
                        <Button 
                        component={NavLink}
                        to="/categorias"
                        sx={{
                            textTransform: "none",
                          '&.active': {
                            background:'black',
                          }
                        }}
                        color='inherit'
                        >
                        Categorias
                        </Button>
                        {
                          !localStorage.getItem('jwt') ? 
                        <Button 
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
                        </Button> : <div></div> }

                {
                  window.localStorage.getItem('jwt') ? 
                  <>
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                  <PersonIcon />
                </IconButton>
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                    <SettingsApplicationsIcon />
                </IconButton>
                </> : <div> </div>
                }
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                    <ShoppingCartIcon />
                </IconButton>

                {
                  window.localStorage.getItem('jwt') ?
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo' onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton> : <div></div>
                }

                    </Stack>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar;

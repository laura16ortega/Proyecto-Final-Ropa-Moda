import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

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

                        <Button 
                        component={NavLink}
                        to="/hombres"
                        sx={{
                            textTransform: "none",
                          '&.active': {
                            background:'black',
                          }
                        }}
                        color='inherit'
                        >
                        Hombres
                        </Button>

                        <Button 
                        component={NavLink}
                        to="/mujeres"
                        sx={{
                            textTransform: "none",
                          '&.active': {
                            background:'black',
                          }
                        }}
                        color='inherit'
                        >
                        Mujeres
                        </Button>

                    </Stack>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar;
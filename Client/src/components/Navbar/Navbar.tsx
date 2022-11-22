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

                        <NavLink to='/'>
                        <Button sx={{textTransform: "none"}} color='inherit'>
                        Home
                        </Button>
                        </NavLink>

                        <NavLink to='/categorias'>
                        <Button sx={{textTransform: "none"}} color='inherit'>
                        Categorias
                        </Button>
                        </NavLink>

                        <NavLink to='/hombre'>
                        <Button sx={{textTransform: "none"}} color='inherit'>
                        Hombre
                        </Button>
                        </NavLink>

                        <NavLink to='/mujer'>
                        <Button sx={{textTransform: "none"}} color='inherit'>
                        Mujer
                        </Button>
                        </NavLink>

                        <NavLink to='/login'>
                        <Button sx={{textTransform: "none"}} color='inherit'>
                        Ingresar
                        </Button>
                        </NavLink>
                    </Stack>
                </Toolbar>
            </AppBar>

        </div>
    )
}
import {useAuth0} from '@auth0/auth0-react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Stack,
    Button,
    Badge,
  } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () =>{
    const {loginWithRedirect, logout} = useAuth0();
    return (
        <>

        <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                onClick={()=>logout()}
              >


                <LogoutIcon />


              </IconButton>  
        
        
        
        
        </>
    )
};

export default LogoutButton;
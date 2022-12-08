import {useAuth0} from '@auth0/auth0-react';
import Button from "@mui/material/Button";
const LoginButton = () =>{
    const {loginWithRedirect, logout} = useAuth0();
    return (
        <>
                      <Button fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>loginWithRedirect()}>  
                  Ingresar con google
                  
              </Button>
   
      </>
    )
};

export default LoginButton; 
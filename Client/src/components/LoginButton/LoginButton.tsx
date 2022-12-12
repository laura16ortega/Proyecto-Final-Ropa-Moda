import {useAuth0} from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LoginButton = () =>{
    const {loginWithRedirect} = useAuth0();
    return (
        <>
        {/*<button onClick={()=>loginWithRedirect()}>Login</button>*/}
        <Button 
         onClick={()=>loginWithRedirect()}
         variant="contained"
         fullWidth
        sx={{ mt: 3, mb: 2 }}>
          Ingresar con Google
        </Button>
     </>
    )
};

export default LoginButton;
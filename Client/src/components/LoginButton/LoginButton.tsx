import {useAuth0} from '@auth0/auth0-react';

const LoginButton = () =>{
    const {loginWithRedirect, logout} = useAuth0();
    return (
        <>
        <button onClick={()=>loginWithRedirect()}>Login</button>
        <button onClick={()=>logout()}>Logout</button>        </>
    )
};

export default LoginButton;
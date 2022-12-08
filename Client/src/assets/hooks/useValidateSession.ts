import {useAuth0} from "@auth0/auth0-react";
import sign from 'jwt-encode';
import {v4 as uuidv4} from 'uuid';

const secret = 'algunsecreto'

type newUser = {
    fullName: string | undefined,
    email: string  | undefined,
    image: string  | undefined,
    userId: string | undefined
}

export const useValidateSession = () => {

    const {user} = useAuth0();
    
    const jwt = sign(user, secret);
    const newUser:newUser = {
        fullName:user?.nickname,
        email: user?.email,
        image: user?.picture,
        userId: uuidv4(),
    }

    if(user){
        window.localStorage.setItem("User", JSON.stringify(newUser) as string);
        window.localStorage.setItem("jwt", jwt as string);

    }

}
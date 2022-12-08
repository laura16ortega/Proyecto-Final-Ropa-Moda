import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../assets/hooks";
import { PrivateRoutes, PublicRoutes } from "../models";

interface Props {
    privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet/>;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.CREATE}/>

export const AuthGuard = ({privateValidation}:Props) =>{
    const user = useAppSelector((state)=>state.auth);
    return user.token ? (
        privateValidation ? (
            PrivateValidationFragment
        ) : (
            PublicValidationFragment
        )
    ) : (
        <Navigate replace to={PublicRoutes.LOGIN} />
    )
}

export default AuthGuard;
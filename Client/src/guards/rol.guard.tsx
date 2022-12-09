import { useAppSelector } from "../assets/hooks/index";
import { Roles, PublicRoutes, PrivateRoutes } from '../models';
import {Navigate, Outlet} from 'react-router-dom';


interface Props{
    isAdmin: boolean
}

function RoleGuard({isAdmin}:Props){
    const {user} = useAppSelector((state)=>state.auth)
    return user.isAdmin === isAdmin ? <Outlet/> : <Navigate replace to={PrivateRoutes.PROFILE}/>
}

export default RoleGuard;
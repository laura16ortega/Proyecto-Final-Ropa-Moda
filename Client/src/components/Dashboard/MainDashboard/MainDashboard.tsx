import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "../style.css";
import Home from "../home/DashboardHome";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import { getAllProducts } from "../../../redux/thunk-actions/testActions";
import { getOrders } from "../../../redux/thunk-actions/orderActions";
import { useEffect } from "react";
import { selectUsers } from "../../../redux/slices/allUsersSlice";
import { getAllUsers } from "../../../redux/thunk-actions/allUsersActions";
import { Box } from "@mui/material"
import s from "./MainDashboard.module.css"

function MainDashboard() {
    const dispatch = useAppDispatch()
    const currentToken = window.localStorage.getItem('jwt');
    const { orders } = useAppSelector(state => state.order)
    const { allData } = useAppSelector(state => state.data)
    const { allUsers } = useAppSelector(selectUsers)

    useEffect(() => {
        if (!allData.length || !orders.length || !allUsers.length) {
            dispatch(getAllProducts())
            dispatch(getOrders())
            dispatch(getAllUsers(currentToken!))
        }
    }, [])

    return (
        <div>
            <Topbar />
            <div style={{ display: "flex" }}>
                <Sidebar />
                {!orders.length || !allData.length || !allUsers.length ? 
                <Box sx={{ backgroundColor: "#EBEFF3", display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Box className={s.loader}/>
                </Box> 
                : <Outlet/>}
            </div>
        </div>  
    );
}

export default MainDashboard;

//className="content w-100" style={{paddingTop: "10px", backgroundColor: "white"}}
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "../style.css";
import Home from "../home/DashboardHome";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import { getAllProducts } from "../../../redux/thunk-actions/testActions";
import { getOrders } from "../../../redux/thunk-actions/orderActions";
import { useEffect } from "react";



function MainDashboard() {
    const dispatch = useAppDispatch()
    const { orders } = useAppSelector(state => state.order)
    const { allData } = useAppSelector(state => state.data)

    useEffect(() => {
        if (!allData.length || !orders.length) {
            dispatch(getAllProducts())
            dispatch(getOrders())
        }
    }, [])

    return (
        <div>
            <Topbar />
            <div style={{ display: "flex" }}>
                <Sidebar />
                {orders.length && allData.length ? <Outlet/> : <div></div>}
            </div>
        </div>  
    );
}

export default MainDashboard;

//className="content w-100" style={{paddingTop: "10px", backgroundColor: "white"}}
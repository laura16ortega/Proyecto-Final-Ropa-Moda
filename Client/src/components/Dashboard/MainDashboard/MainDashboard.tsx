import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "../style.css";
import Home from "../home/DashboardHome";
import { Outlet } from "react-router-dom";





function MainDashboard() {
    return (
        <div>
            <Topbar />
            <div style={{display: "flex"}}>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default MainDashboard;

//className="content w-100" style={{paddingTop: "10px", backgroundColor: "white"}}
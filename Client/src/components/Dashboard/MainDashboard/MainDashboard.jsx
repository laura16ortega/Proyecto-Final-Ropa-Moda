import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import "../style.css";
import Home from "../home/Home";





function Dashboard() {
    return (
        <div>
            <Topbar />
            <div style={{display: "flex"}}>
                <Sidebar/>
                <Home/>
            </div>
        </div>
    );
}

export default Dashboard;

//className="content w-100" style={{paddingTop: "10px", backgroundColor: "white"}}
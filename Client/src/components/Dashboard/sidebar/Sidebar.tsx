import "./sidebar.css"
import {LineStyle, Timeline, TrendingUp, Person,
     Storefront, Paid, Assessment, Mail,
     Message, Feedback, Report, ManageAccounts,
     } from "@mui/icons-material"
import { NavLink } from 'react-router-dom'


export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li >
                    <NavLink to="/dashboard" className="sidebarListItem" >
                        <LineStyle className="sidebarIcon"/>
                        Home
                    </NavLink>
                    </li>
                    <li className="sidebarListItem">
                        <Timeline className="sidebarIcon"/>
                        Analítica
                    </li>
                    <li className="sidebarListItem">
                        <TrendingUp className="sidebarIcon"/>
                        Ventas
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle"> Menú rápido </h3>
                <ul className="sidebarList">
                    <li >
                    <NavLink to="/dashboard/users" className="sidebarListItem ">
                        <Person className="sidebarIcon"/>
                        Usuarios
                    </NavLink>
                    </li>
                    <li >
                    <NavLink to="/dashboard/products" className="sidebarListItem">
                        <Storefront className="sidebarIcon"/>
                        Productos
                        </NavLink>
                    </li>
                    <li className="sidebarListItem">
                        <Paid className="sidebarIcon"/>
                        Actas
                    </li>
                    <li className="sidebarListItem">
                        <Assessment className="sidebarIcon"/>
                        Informes
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notificaciones</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Mail className="sidebarIcon"/>
                        Correo
                    </li>
                    <li className="sidebarListItem">
                        <Feedback className="sidebarIcon"/>
                        Retroalimentación
                    </li>
                    <li className="sidebarListItem">
                        <Message className="sidebarIcon"/>
                        Mensajes
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Personal</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem ">
                        <ManageAccounts className="sidebarIcon"/>
                        Administrador
                    </li>
                    <li className="sidebarListItem">
                        <Timeline className="sidebarIcon"/>
                        Analítica
                    </li>
                    <li className="sidebarListItem">
                        <Report className="sidebarIcon"/>
                        Informes
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
    
  )
}

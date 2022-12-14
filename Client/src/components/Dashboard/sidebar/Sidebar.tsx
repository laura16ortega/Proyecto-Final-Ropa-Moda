import "./sidebar.css"
import {
    LineStyle, Timeline, TrendingUp, Person,
    Storefront, Paid, Assessment, Mail,
    Message, Feedback, Report, ManageAccounts,
} from "@mui/icons-material"
import { NavLink } from 'react-router-dom'
import { Box, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Sidebar() {
    return (
        <Box className="sidebar">
            <Box className="sidebarWrapper">
                <Box className="sidebarMenu">
                    <Typography className="sidebarTitle" variant="subtitle2">
                        Dashboard
                    </Typography>
                    <Box className="sidebarList">
                        <Box sx={{marginY: ".4rem"}}>
                            <NavLink to="/dashboard/" className="sidebarListItem" >
                                <LineStyle className="sidebarIcon" />
                                <Typography variant="h6">Home</Typography>
                            </NavLink>
                        </Box>
                        <Box sx={{marginY: ".4rem"}}>
                            <NavLink to="/dashboard/users" className="sidebarListItem ">
                                <Person className="sidebarIcon" />
                                <Typography variant="h6">Usuarios</Typography>
                            </NavLink>
                        </Box>
                        <Box sx={{marginY: ".4rem"}}>
                            <NavLink to="/dashboard/products" className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                <Typography variant="h6">Productos</Typography>
                            </NavLink>
                        </Box>
                        <Box sx={{marginY: ".4rem"}}>
                            <NavLink to="/dashboard/orders" className="sidebarListItem">
                                <ShoppingCartIcon className="sidebarIcon" />
                                <Typography variant="h6">Ordenes</Typography>
                            </NavLink>
                        </Box>
                    </Box>
                </Box>
                <Box className="sidebarMenu">
                    <Typography className="sidebarTitle" variant="subtitle2">
                        Personal
                    </Typography>
                    <ul className="sidebarList">
                        <li className="sidebarListItem ">
                            <ManageAccounts className="sidebarIcon" />
                            <NavLink to="/dashboard/perfil">
                                Perfil
                            </NavLink>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Box>

    )
}

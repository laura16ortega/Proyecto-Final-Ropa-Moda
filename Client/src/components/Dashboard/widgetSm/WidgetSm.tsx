import "./widgetSm.css"
import { Visibility } from '@mui/icons-material'
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import AllUsersCard from '../AllUsers/AllUsersCard';
import { getAllUsers } from '../../../redux/thunk-actions/allUsersActions';
import { selectUsers } from '../../../redux/slices/allUsersSlice';
import {
    Typography,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    Button,
    TableRow,
    Grid,
    Avatar
} from "@mui/material"


type UsersData = {
    users: any // users.slice >>> map
}

export default function WidgetSm({users}: UsersData) {

    return (
            <Grid item xs={12} lg={4.5}>
                <Paper elevation={5} sx={{ backgroundColor: "white", padding: "20px"}}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Nuevos Miembros</Typography>
                    <TableContainer sx={{overflow: "hidden"}}>
                        <Table>
                            <TableBody>
                                {users?.map((u: any, i: any) =>
                                    <TableRow key={i + 1}>
                                        <TableCell align="center"><Avatar src={u.image} alt="" className="widgetSmImg" /></TableCell>
                                        <TableCell align="center">{u.fullName}</TableCell>
                                        <TableCell align="center">
                                            <Button className="widgetSmButton">
                                                <Visibility />
                                                Display
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
    )
}

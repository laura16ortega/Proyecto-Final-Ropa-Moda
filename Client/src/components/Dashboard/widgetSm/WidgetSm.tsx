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
} from "@mui/material"
import AllUsers from "../AllUsers/AllUsers"

type UsersData = {
    users: any // users.slice >>> map
}

export default function WidgetSm() {
    const { allUsers, usersError, usersLoading } = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const currentToken = window.localStorage.getItem('jwt');
    const lastUsers = allUsers.slice().reverse().slice(0,10)

    useEffect(() => {
        dispatch(getAllUsers(currentToken!))
    }, [])

    useEffect(() => {
    if(!allUsers?.lenght){
        dispatch(getAllUsers(currentToken!))
    }
    },[dispatch])

    return (
        <>
      
        <Grid item xs={12} lg={4.5}>
            <Paper elevation={5} sx={{ backgroundColor: "white", padding: "20px", width:'34rem',height:'30.9rem', overflow:'scroll',overflowX:'hidden' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Nuevos Miembros</Typography>

        {
        lastUsers?.map((u: any, index: any) =>{ return (
        <div /* style={{marginLeft:'1rem',height:'10vh', width:'50vh'}} */ key={index}>
        <AllUsersCard key={index} image={u.image} _id={u._id} fullName={u.fullName} email={u.email} phone_number={u.phone_number} createdAt={u.createdAt} updatedAt={u.updatedAt} moreOptions='false' />
        </div>
        )})} 
        </Paper>
        </Grid>

        </>
    )
}

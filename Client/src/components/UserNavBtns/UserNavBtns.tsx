import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";

function UserNavBtns(props: any) {

    return (
        <>
        <AppBar position='static'>
            <Toolbar>
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                    <PersonIcon />
                </IconButton>
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                    <ShoppingCartIcon />
                </IconButton>
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                    <SettingsApplicationsIcon />
                </IconButton>
                <IconButton  size='large' edge='start' color='inherit' aria-label='logo'>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
            
        </>
    );
}

export default UserNavBtns;
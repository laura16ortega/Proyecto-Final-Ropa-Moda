import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material';
import { Avatar, Box, Typography } from "@mui/material"
import { useAppSelector } from '../../../assets/hooks';


export default function Topbar() {

  const { user } = useAppSelector(state => state.auth) 

  return (
    <Box className='topbar'>
      <Box className="topbarWrapper">
        <Box className="topbarLeft">
          <Typography variant="h4" className='logo'>FASHION CLOTHING</Typography>
        </Box>
        <Box className="topbarRight">
          <Box className="topbarIconContainer">
            <Typography variant="h6">
            {user.fullName}
            </Typography>
          </Box>
          <Avatar src={user.image} alt=""/>
        </Box>
      </Box>
    </Box>
  )
}

import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@mui/icons-material';


export default function Topbar() {
  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <span className="logo">FASHION CLOTHING</span>
        </div>
        <div className="topbarRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
            <span className="topIconBadge">2</span>
          </div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzk38h9SS8YRZZo581yeDgepPuCoENqgc-A&usqp=CAU" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}

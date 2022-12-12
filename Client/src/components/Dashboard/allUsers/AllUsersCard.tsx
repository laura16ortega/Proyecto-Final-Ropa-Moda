import React from 'react';
import {Avatar} from '@mui/material'
import { Link } from 'react-router-dom';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import EditIcon from '@mui/icons-material/Edit';


function AllUsersCard({ _id,fullName,email,phone_number,createdAt,updatedAt, moreOptions  }: any) {
 /*    const { allData } = props;
    const d = allData; */

    return (
        <>
        { moreOptions === 'true' ? 
        (
            <div style={{  boxShadow: '0px 2.5px 6px 0px rgba(0,0,0,0.35)',fontFamily:'Trebuchet MS', width:'30vh',height:'35vh', borderRadius:'1.5vh',backgroundColor:'#F5F5F5', display:'flex', flexDirection:'column',alignItems: 'center', justifyContent:'space-between', padding:'1rem 1rem 1rem 1rem',margin:'0.5rem 1rem 1rem 1rem'}}>


                <Avatar sx={{ width: 80, height: 80 }} />
                <Link to="/" >
            <h3 style={{marginBottom:'0.3rem', marginTop:'0.5rem'}}>{fullName}</h3>
            </Link>

            
            <div style={{justifyContent:'space-between', textAlign:'left'}}>
            

            <h4>{email}</h4>
            <div>
            <h5 style={{marginTop:'0.5rem'}}>Tel:{' ' + phone_number}</h5>
            </div>
            <h4 style={{marginTop:'0.5rem'}}>Creado:</h4>
            <h6>{createdAt}</h6>
            <h4 style={{marginTop:'0.5rem'}}>Ultima vez actualizado:</h4>
            <h5>{updatedAt}</h5>
            </div>
    
            <div className='buttons' style={{display:'flex', flexDirection:'row', marginRight:'50%', justifyContent:'space-evenly'}}>
            <div /* style={{marginLeft:'19vh', marginTop:'-2.5rem'}} */>
            <SettingsApplicationsIcon fontSize="medium"  />
            </div>
            <div>
                <DeleteOutlineIcon />
            </div>

            <div>
            <EditIcon />
            </div>
    
            
            </div>


           
            
            
    
    {/* //router.get("/:id",verifyTokenAndAdmin, getUser); */}
          


            </div>

        ) 
        : 
        (
            <div style={{width:'29vh',height:'6vh', borderRadius:'0.2vh',backgroundColor:'#F5F5F5', display:'flex', flexDirection:'row', margin:'0.5rem 1rem 1rem 1rem'}}>
            <div style={{display:'flex',flexDirection:'row', margin:'0.5rem 0.5rem 0.5rem 0.5rem', fontFamily:'Trebuchet MS'}}>
            <Avatar />
            
            
            <div style={{display:'flex',flexDirection:'column',textAlign:'left', marginLeft:'1rem'}}>
            <Link to="/" >
            <h4 style={{marginBottom:'0.3rem'}}>{fullName}</h4>
            </Link>
            <h5>{email}</h5>
    
    
            <div style={{marginLeft:'19vh', marginTop:'-2.5rem'}}>
            <SettingsApplicationsIcon fontSize="medium"  />
            </div>
    
            </div>
            
    
    {/* //router.get("/:id",verifyTokenAndAdmin, getUser); */}
            </div>  
            </div>

        ) }
        
        
            
        </>
    );
}

export default AllUsersCard;
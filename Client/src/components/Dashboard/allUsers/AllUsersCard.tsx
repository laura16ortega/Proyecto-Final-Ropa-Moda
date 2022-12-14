import React, { MouseEventHandler, useEffect, useState } from 'react';
import {Avatar} from '@mui/material'
import { Link } from 'react-router-dom';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import EditIcon from '@mui/icons-material/Edit';
import { deleteUser, getAllUsers } from '../../../redux/thunk-actions/allUsersActions';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Clear } from '@mui/icons-material';
import { useNotification } from "../../UseNotification/UseNotification";
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
import { Visibility } from '@mui/icons-material'

function AllUsersCard({ image,_id,fullName,email,phone_number,createdAt,updatedAt, moreOptions  }: any) {
 /*    const { allData } = props;
    const d = allData; */
    const { displayNotification } = useNotification();
    const { clearNotification } = useNotification();

    const [confirm, setConfirm ] = useState(false);
    const dispatch = useAppDispatch();
    const currentToken = window.localStorage.getItem('jwt');
    const deleteValidations = {
        token: currentToken,
        id:_id
    }
    useEffect(() => {

    },[])
    const handleConfirm = (e: MouseEvent) => {
        setConfirm(!confirm);
    }
    const handleDelete = (e: MouseEvent) => {
        dispatch(deleteUser(deleteValidations));
        setConfirm(false);
        dispatch(getAllUsers(currentToken!))
        displayNotification({ message: "Usuario eliminado satisfactoriamente", type: "success", timeout:1000 })
    }

    return (
        <>
        { moreOptions === 'true' ? 
        (
            <div style={{  boxShadow: '0px 2.5px 6px 0px rgba(0,0,0,0.35)',fontFamily:'Trebuchet MS', width:'35vh',height:'40vh', borderRadius:'1.5vh',backgroundColor:'#F5F5F5', display:'flex', flexDirection:'column',alignItems: 'center', justifyContent:'space-between', padding:'1rem 1rem 1rem 1rem',margin:'1rem 1rem 1rem 1rem'}}>


                <Avatar sx={{ width: 80, height: 80 }} src={image}/>
                <Link to="/" >
            <h3 style={{marginBottom:'0.3rem', marginTop:'0.5rem'}}>{fullName}</h3>
            </Link>

            <div>
            <h4>{email}</h4>
            </div>
            
            <div style={{justifyContent:'space-between', textAlign:'left'}}>
            

            <div>
            <h4 style={{marginTop:'0.5rem'}}>Tel.:</h4>
            <h5 style={{marginTop:'0.5rem'}}>{phone_number}</h5>
            </div>
            <h4 style={{marginTop:'0.5rem'}}>Creado:</h4>
            <h6>{createdAt}</h6>
            <h4 style={{marginTop:'0.5rem'}}>Ultima vez actualizado:</h4>
            <h5>{updatedAt}</h5>
            </div>
    

            {confirm ? 
            (
                <div>
                    <div>
                    Estas seguro?
                    </div>
                    <Button onClick={(e:any) => handleConfirm(e)}>
                        <ClearIcon />
                    </Button>
                    <Button onClick={(e:any)=> handleDelete(e)} ><CheckIcon /></Button>

                </div>
            )
            :
            (
                <div className='buttons' style={{display:'flex', flexDirection:'row', marginRight:'50%', justifyContent:'space-evenly'}}>
    
                <div>
                    <Button style={{marginTop:'1vh'}} onClick={(e: any) => handleConfirm(e)}>
                    <DeleteOutlineIcon  />
                    </Button>
                </div>
{/*     
                <div>
                <EditIcon />
                </div> */}
        
                
                </div>

            )}
            



           
            
            
    
    {/* //router.get("/:id",verifyTokenAndAdmin, getUser); */}
          


            </div>

        ) 
        : 
        (

           
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center"><Avatar src={image} /></TableCell>
                                <TableCell align="center">{fullName}</TableCell>
                                <TableCell align="center">
                                    <Button className="widgetSmButton">
                                        <Visibility />
                                        Display
                                    </Button>
                                </TableCell>
                            </TableRow>
                            </TableBody>
                            </Table>
                            </TableContainer>
        





        ) }
        
        
            
        </>
    );
}

export default AllUsersCard;
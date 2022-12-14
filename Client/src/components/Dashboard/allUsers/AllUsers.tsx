import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import AllUsersCard from './AllUsersCard';
import { getAllUsers } from '../../../redux/thunk-actions/allUsersActions';

import { selectUsers } from '../../../redux/slices/allUsersSlice';


function AllUsers(props: any) {
    const { allUsers, usersError, usersLoading } = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const currentToken = window.localStorage.getItem('jwt');
    useEffect(() => {
        dispatch(getAllUsers(currentToken!))

    }, [])

    useEffect(() => {
    if(!allUsers?.lenght){
        dispatch(getAllUsers(currentToken!))
    }
    console.log(allUsers)
    },[dispatch])

    return (
        <>


        <div style={{display:'flex', flexWrap:'wrap', height:'60vh', overflow:'scroll', overflowX:'hidden', width:'100vh'}}>
        {
        allUsers?.map((u: any, index: any) =>{ return (
        <div /* style={{marginLeft:'1rem',height:'10vh', width:'50vh'}} */ key={index}>
        <AllUsersCard key={index} _id={u._id} fullName={u.fullName} email={u.email} phone_number={u.phone_number} createdAt={u.createdAt} updatedAt={u.updatedAt} moreOptions='false' />
        </div>
        )})}
                
            </div>
        </>
    );
}

export default AllUsers;
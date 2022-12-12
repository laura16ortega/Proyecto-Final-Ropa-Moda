import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import AllUsersCard from './AllUsersCard';
import { getAllUsers } from '../../../redux/thunk-actions/allUsersActions';
import { usersData } from './usersData/usersData';


function AllUsers(props: any) {
    const { allData, error, loading } = useAppSelector((state: any) => state.allUsers);
    const dispatch = useAppDispatch();
    const currentToken = window.localStorage.getItem('jwt');
    useEffect(() => {
        dispatch(getAllUsers(currentToken!))

    }, [])
    useEffect(() => {
    if(!allData?.lenght){
        dispatch(getAllUsers(currentToken!))
    }
    console.log(allData)
    },[dispatch])
    return (
        <>
        <div style={{display:'flex', flexWrap:'wrap', height:'60vh', overflow:'scroll', overflowX:'hidden', width:'100vh'}}>
        {
        usersData?.map((u: any, index: any) =>{ return (
        <div /* style={{marginLeft:'1rem',height:'10vh', width:'50vh'}} */ key={index}>
        <AllUsersCard key={index} _id={u._id} fullName={u.fullName} email={u.email} phone_number={u.phone_number} createdAt={u.createdAt} updatedAt={u.updatedAt} moreOptions='false' />
        </div>
        )})}
                
            </div>
        </>
    );
}

export default AllUsers;
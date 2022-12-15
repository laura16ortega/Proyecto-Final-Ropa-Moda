import React, { useEffect } from 'react';
import AllUsersCard from '../AllUsers/AllUsersCard';
import { getAllUsers } from '../../../redux/thunk-actions/allUsersActions';
import { useAppDispatch, useAppSelector } from "../../../assets/hooks";
import { selectUsers } from '../../../redux/slices/allUsersSlice';
function ManageUsers(props: any) {

    const { allUsers, usersError, usersLoading } = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const currentToken = window.localStorage.getItem('jwt');
  
    

    useEffect(()=> {

    },[window.localStorage.getItem('refresh')])

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
        <div style={{margin:'0 auto'}}>
        
        <div style={{display:'flex', flexWrap:'wrap', height:'max-content',width:'100rem', marginBottom:'3vh', marginTop:'3rem', marginLeft:'4rem'}}>
            
                    {
        allUsers?.map((u: any, index: any) =>{ return (
        <div key={index}>
        <AllUsersCard isAllowed={u.isAllowed} key={index} image={u.image} _id={u._id} fullName={u.fullName} email={u.email} phone_number={u.phone_number} createdAt={u.createdAt} updatedAt={u.updatedAt} moreOptions='true' />
        </div>
        )})}
        </div>
        </div>
        </>
    );
}

export default ManageUsers;
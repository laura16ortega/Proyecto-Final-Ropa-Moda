import React from 'react';
import { usersData } from '../AllUsers/usersData/usersData';
import AllUsersCard from '../AllUsers/AllUsersCard';


function ManageUsers(props: any) {
    return (
        <> 
        <div style={{margin:'0 auto'}}>
        
        <div style={{display:'flex', flexWrap:'wrap', height:'60vh',width:'150vh', marginBottom:'100rem', marginTop:'3rem', marginLeft:'15%'}}>
            
                    {
        usersData?.map((u: any, index: any) =>{ return (
        <div /* style={{width:'50vh'}}  */key={index}>
        <AllUsersCard key={index} _id={u._id} fullName={u.fullName} email={u.email} phone_number={u.phone_number} createdAt={u.createdAt} updatedAt={u.updatedAt} moreOptions='true' />
        </div>
        )})}
        </div>
        </div>
        </>
    );
}

export default ManageUsers;
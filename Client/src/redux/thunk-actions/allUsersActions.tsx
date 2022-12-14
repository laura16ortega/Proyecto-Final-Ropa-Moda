import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


type User = {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}
 

type ResetPass = {
    password: string | undefined,
    resetToken: string | undefined
}


export const getAllUsers = createAsyncThunk(
    "all/users",
    async(token: string, thunkApi)=>{
        try {
            console.log('ENTERED ACTION')
            const {data}:any = await axios.get(
                `${BACKEND_URL}/api/v1/users`, {
                    headers:{
                        'Authorization': `token ${token}`
                    }
                }
            )
            console.log(data)
            return data
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    }
);

export const deleteUser = createAsyncThunk(
    "delete/users",
    async(info: any, thunkApi) => {
        
        try{
            console.log(info)
            const returnUsers = {"returnUsers":'true'}
            const { data }: any = await axios.delete(`${BACKEND_URL}/api/v1/users/find/${info.id}`, {
                headers:{
                    'Authorization': `token ${info.token}`
                },
                data: {
                  source: returnUsers
                }
            });
            return data
        }catch(err: any) {
            return thunkApi.rejectWithValue(err.response.data.message)
        }
    }
)
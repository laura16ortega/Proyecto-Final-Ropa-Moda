import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const BACKEND_URL = 'http://localhost:3001'

type User = {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
}

type ResetPass = {
    password: string | undefined,
    resetToken: string | undefined
}

interface FormValues { // Exportar de register
    fullName: string;
    email: string;
    // gender: string; // No pasado
    phone_number: string;
    password: string;
    // confirmPassword: string; // No pasado
    termsAndConditions?: boolean;
  }

//Register User
export const registerUser = createAsyncThunk(
    "register/user",
    async(userData: FormValues, thunkApi)=>{
        try {
            const {data}:any = await axios.post(
                `${BACKEND_URL}/api/auth/register`,
                userData
            )
            window.localStorage.setItem("jwt", data.registerNewUser.token);
            window.localStorage.setItem("User", JSON.stringify(data.registerNewUser)); 
            return data.registerNewUser
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    }
);

//Login User
export const loginUser = createAsyncThunk(
    "login/user",
    async(userData: User, thunkApi)=>{
        try {
            const {data}:any = await axios.post(
                `${BACKEND_URL}/api/auth/login`,
                userData
            );
            window.localStorage.setItem("jwt", data.loginData.token);
            window.localStorage.setItem("User", JSON.stringify(data.loginData.user));
            return data.loginData
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    }
);
export const getUserInfo = createAsyncThunk(
    "get/user",
    async(userData:any) => {
        try{
            const {data}:any = await axios.get(
                `${BACKEND_URL}/api/v1/users/${userData.userId}`, {headers: { Authorization: `Bearer ${userData.token}`}}
            );
            window.localStorage.setItem("jwt", data.loginData.token);
            window.localStorage.setItem("User", JSON.stringify(data.loginData.user));
            return data.loginData
        }catch(error:any){
            console.log(error)
        }
    }
)

//Forgot Password
export const forgotPassword = createAsyncThunk(
    "forgot/password",
    async(userData: {email: string}, thunkApi)=>{
        try {
            const {data}:any = await axios.post(
                `${BACKEND_URL}/api/v1/users/forgotPassword`,
                userData
            );
            return data.message
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

// Reset Password
export const resetPassword = createAsyncThunk(
    "reset/password",
    async(userData:ResetPass)=>{
        try {
            console.log(userData)
            const {resetToken} = userData
            const {data}:any = await axios.put(
                `${BACKEND_URL}/api/v1/users/resetPassword/${resetToken}`,
                userData
            );
            return data;
        } catch (error) {
            return {message:error}
        }
    }
);

//Change Password
export const updatePassword = createAsyncThunk(
    "update/password",
    async(formData, thunkApi)=>{
        try {
            const {data}:any = await axios.patch(
                `${BACKEND_URL}/api/v1/users/password/update`,
                formData
            );
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

//Update User
export const updateUser = createAsyncThunk(
    "update/user",
    async(formData, thunkApi)=>{
        try {
            const {data}:any = await axios.patch(
                `${BACKEND_URL}/api/v1/users/updateUser`,
                formData
            );
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

//add Review



export const validateEmail = (email:string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
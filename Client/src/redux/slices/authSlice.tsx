import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';
import { loginUser, registerUser, getUserInfo } from '../thunk-actions/authActions';
import type { UserType } from "../types/userTypes"

type InitialState = {
    user: UserType
    userLoading: boolean
    token: string
    userError: null | any
}

const initialState = {
    user:localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User") as string) : {} ,
    userLoading: false,
    token: localStorage.getItem("jwt") ? localStorage.getItem("jwt") : ""
} as InitialState

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout: (
            state
        ) =>{
            localStorage.removeItem("jwt");
            localStorage.removeItem("User");
            localStorage.removeItem("fav");
            localStorage.removeItem("cart");
            state.token = ""
        }
    },
    extraReducers(builder) {
        builder
        //Register User
        .addCase(registerUser.pending,(state,action)=>{
            state.userLoading = true
        })
        .addCase(registerUser.fulfilled,(state,action:PayloadAction<any>)=>{
            state.userLoading = false
            const {userId, fullName, token,email, image} = action.payload
            state.user = {
                userId,
                fullName,
                email,
                image
            }
            state.token = token
        })
        .addCase(registerUser.rejected,(state,action:PayloadAction<any>)=>{
            state.userLoading = false
            state.userError = action.payload
        })
        .addCase(getUserInfo.pending,(state,action)=> {
            state.userLoading = true
        })
        .addCase(getUserInfo.fulfilled, (state, action:PayloadAction<any>) => {
            state.userLoading = false
            
            // state.user = action.payload
            //console.log("get user info: ", action.payload)
            const {_id, fullName, email, image, isAdmin} = action.payload
            state.user = {
                userId: _id,
                fullName,
                email,
                image,
                isAdmin
            }
            localStorage.setItem("User", JSON.stringify(state.user))
            //state.token = token
        })
        .addCase(getUserInfo.rejected,(state,action:PayloadAction<any>)=>{
            state.userLoading = false
            state.userError = action.payload
        })

        //Login User
        .addCase(loginUser.pending,(state,action)=>{
            state.userLoading = true
        })

        .addCase(loginUser.fulfilled, (state,action:PayloadAction<any>)=>{
            state.userLoading = false
            const {token, user} = action.payload
            state.user = user
            state.token = token
        })
        .addCase(loginUser.rejected,(state,action:PayloadAction<any>)=>{
            state.userLoading = false
            state.userError = action.payload
        })
    },
});

export const selectAuth = (state:RootState) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
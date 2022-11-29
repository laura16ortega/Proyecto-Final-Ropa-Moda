import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';
import { loginUser, registerUser } from '../thunk-actions/authActions';

type InitialState = {
    user: null | {}
    userLoading: boolean
    token: null | string
    userError: null | any
}

const initialState = {
    user: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")!) : {} ,
    userLoading: false,
    token: localStorage.getItem("jwt") ? localStorage.getItem("jwt") : ""
} as InitialState

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (
            state,
            action: PayloadAction<{token: string; user: []}>
        ) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (
            state
        ) =>{
            localStorage.clear();
            state.user = null;
            state.token = null;
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
            const {userId, fullName, token,email} = action.payload
            state.user = {
                userId,
                fullName,
                email
            }
            state.token = token
        })
        .addCase(registerUser.rejected,(state,action:PayloadAction<any>)=>{
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

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;
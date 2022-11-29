import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';

type InitialState = {
    user: null | []
    userLoading: boolean
    token: null | string
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
    }
});

export const selectAuth = (state:RootState) => state.auth;

export const {setUser, logout} = authSlice.actions;

export default authSlice.reducer;
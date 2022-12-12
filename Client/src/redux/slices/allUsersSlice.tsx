import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';
import { loginUser, registerUser } from '../thunk-actions/authActions';
import { deleteUser, getAllUsers } from "../thunk-actions/allUsersActions";


type InitialState = {
    user: any // here add type by import { user}
    usersLoading: boolean
    userError: null | any
}

const initialState = {
    allUsers: [],
    usersLoading: false,
    usersError: []
} /* as InitialState */

export const allUsersSlice = createSlice({
    name:"allUsers",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
        .addCase(getAllUsers.fulfilled,(state,action:PayloadAction<any>) => {
            state.allUsers = action.payload
        })
        .addCase(getAllUsers.pending,(state,action:PayloadAction<any>) => {
            state.usersLoading = true;
        })
        .addCase(getAllUsers.rejected,(state,action:PayloadAction<any>) => {
            state.usersLoading = false;
            state.usersError = action.payload
        })
        .addCase(deleteUser.fulfilled,(state, action:PayloadAction<any>) => {
            state.allUsers 
        })
        
    }
});

export const selectUsers = (state:RootState) => state.allUsers;

/* export const { logout } = authSlice.actions; */

export default allUsersSlice.reducer;
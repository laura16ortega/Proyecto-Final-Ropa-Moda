import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';
import { loginUser, registerUser } from '../thunk-actions/authActions';
import { deleteUser, getAllUsers } from "../thunk-actions/allUsersActions";


type InitialState = {
    allUsers: any // here add type by import { user}
    usersLoading: boolean
    usersError: null | any
}


const initialState: InitialState = {
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
        .addCase(getAllUsers.pending,(state,action:PayloadAction<any>) => {
            state.usersLoading = true;
        })
        .addCase(getAllUsers.fulfilled,(state,action:PayloadAction<any>) => {
            state.usersLoading = false;
            state.allUsers = action.payload;
        })
        .addCase(getAllUsers.rejected,(state,action:PayloadAction<any>) => {
            state.usersLoading = false;
            state.usersError = action.payload
        })
        .addCase(deleteUser.fulfilled,(state, action:PayloadAction<any>) => {

        })
        
    }
});

export const selectUsers = (state:RootState) => state.allUsers;

/* export const { logout } = authSlice.actions; */

export default allUsersSlice.reducer;
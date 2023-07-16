import {createSlice} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

function decode(state:any,action:any) {
    const token = action.payload;
    // If token exists update the state
    if(token) {
        const decodedData = jwtDecode(token);
        state.user[0].userID = (decodedData as any).user[0]?.userID;
        state.user[0].userName = (decodedData as any).user[0]?.userName;
        state.user[0].firstName = (decodedData as any).user[0]?.firstName;
        state.user[0].lastName = (decodedData as any).user[0]?.lastName;
        state.user[0].role = (decodedData as any).user[0]?.role;
        state.user[0].token = token;
        localStorage.setItem("token",token);
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        // User state must stay the same way when changed(example: can't change to string )
        user: [{
            userID:null,
            userName: 'Guest',
            firstName: null,
            lastName: null,
            role: null,
            token: ''
        }]
    },
    reducers: {
        register(state,action) {
            decode(state,action);       
        },
        login(state,action) {
            decode(state,action);
        },
        logout(state) {
            state.user = [{
                userID:null,
                userName: 'Guest',
                firstName: null,
                lastName: null,
                role: null,
                token: ''
            }];
            localStorage.removeItem("token");
        }
    }
});

export const {register,login,logout} = userSlice.actions;

export const user = userSlice.getInitialState().user;

export const selectUser = (state:any) => state.user;

export default userSlice.reducer;



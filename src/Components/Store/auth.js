import {createSlice} from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initailEmail = localStorage.getItem('email');
const initailOriginalEmail = localStorage.getItem('originalEmail');
const userIsLoggedIn = !!initialToken;
const initialAuthState = {
    token : initialToken,
    email : initailEmail,
    originalEmail : initailOriginalEmail,
    isAuthenticated : userIsLoggedIn,
}
const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state, action){
            state.token = action.payload.action;
            state.email = action.payload.email;
            state.originalEmail = action.payload.originalEmail;
            state.isAuthenticated = true;
        },
        logout(state){
            state.token = null;
            state.email = null;
            state.originalEmail = null;
            state.isAuthenticated = false;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer
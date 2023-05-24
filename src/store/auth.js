import {createSlice} from '@reduxjs/toolkit'

const useridToken = localStorage.getItem("authToken")
? localStorage.getItem("authToken")
: "";
const userLocalID = localStorage.getItem("userId")
? localStorage.getItem("userId")
: "";
const initialAuthState = {isLoggedIn:!!useridToken , token:useridToken, userId : userLocalID , isEmailVerified : false}
// const initialAuthState={
//     isAuthenticated:false,
//     userId:null,
//     token:null,
    
// }
const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        setUserId(state,action){
        state.userId = action.payload
        },
        setToken(state,action){
            state.token = action.payload
        },
        Setlogin(state){
            state.isAuthenticated=true;
        },
        Setlogout(state){
            state.isAuthenticated=false;
        },
        setEmailVerified(state,action){
            state.isEmailVerified=action.payload
        }
      
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;
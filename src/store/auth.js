import {createSlice} from '@reduxjs/toolkit'

const initialAuthState={
    isAuthenticated:false,
    userId:null,
    token:null,
    
}
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        userId(state,action){
        state.userId = action.payload
        },
        token(state,action){
            state.token = action.payload
        },
        login(state){
            state.isAuthenticated=true;
        },
        logout(state){
            state.isAuthenticated=false;
        },
      
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;
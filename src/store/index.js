// import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import themeReducer from "../store/theme-reducer";

import authReducer from './auth'
// export const INCREMENT= 'increment'




const store = configureStore({
    reducer:{auth:authReducer,theme : themeReducer}
})
// export const counterActions=counterSlice.actions;
// export const authActions=authSlice.actions;
export default store;

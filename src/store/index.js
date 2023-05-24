// import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import themeReducer from "../store/theme-reducer";
import expenseState from "../store/expenses-state";

import authReducer from './auth'
// export const INCREMENT= 'increment'




const store = configureStore({
    reducer:{auth:authReducer,theme : themeReducer,expense: expenseState}
})
// export const counterActions=counterSlice.actions;
// export const authActions=authSlice.actions;
export default store;

// import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit'

import authReducer from './auth'
// export const INCREMENT= 'increment'




const store = configureStore({
    reducer:{auth:authReducer}
})
// export const counterActions=counterSlice.actions;
// export const authActions=authSlice.actions;
export default store;


import {configureStore} from '@reduxjs/toolkit'

import couterReducer from './counter'
import authReducer from './auth'



const store = configureStore({
    reducer: {counter: couterReducer, auth: authReducer}
});


export default store;
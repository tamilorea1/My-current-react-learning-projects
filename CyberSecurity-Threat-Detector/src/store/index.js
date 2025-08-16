

import {configureStore} from '@reduxjs/toolkit'

import threatReducer from './threats'

import filterReducer from './filter'

const store = configureStore({
    reducer: {threats: threatReducer, filter: filterReducer}
})

export default store;
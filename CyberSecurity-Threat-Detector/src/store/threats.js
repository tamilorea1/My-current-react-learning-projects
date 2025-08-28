import { createSlice } from "@reduxjs/toolkit";


const initialThreatsState = {threats: [], loading: false, error: null}

const threatSlice = createSlice({
    name: 'threats',
    initialState: initialThreatsState,
    reducers: {

        //When the data is fetched, set loading to true
        // and clear any previous errors
        setThreatsAtStart (state) {
            state.loading = true
            state.error = null
        },

        //When the data is successfully fetched, set loading to false
        // and add the fetched threats to the threats array
        setThreatsAtSuccess(state, action) {
            state.threats = action.payload
            state.loading = false
        },

        //When the data is not successfully fetched, set loading to false
        // and set the error message
        setThreatsAtFailure(state, action) {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const threatActions = threatSlice.actions

export default threatSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {severityType: 'All', hackType: 'All'}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setSeverityType(state, action) {
            state.severityType = action.payload //The payload will represent the severity type 'critical', 'high', 'all', etc
        },

        setHackType(state, action) {
            state.hackType = action.payload // The payload will be different hack types
        }

    }
})

export const filterActions = filterSlice.actions

export default filterSlice.reducer
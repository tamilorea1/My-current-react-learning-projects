import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {severityType: 'All', hackType: 'All', searchTerm: '', submittedTerm: ''}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        setSeverityType(state, action) {
            state.severityType = action.payload //The payload will represent the severity type 'critical', 'high', 'all', etc
        },

        setHackType(state, action) {
            state.hackType = action.payload // The payload will be different hack types
        },

        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },

        setSubmittedTerm (state, action) {
            state.submittedTerm = action.payload
        }

    }
})

export const filterActions = filterSlice.actions

export default filterSlice.reducer
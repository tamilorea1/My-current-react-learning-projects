import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = { searchTerm: '', submittedTerm: '', selectedVendor: 'All', selectedRansomware: 'All'}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },

        setSubmittedTerm (state, action) {
            state.submittedTerm = action.payload
        },

        setSelectedVendor(state, action) {
            state.selectedVendor = action.payload //The payload will represent the selected vendor
        },

        setSelectedRansomware(state, action) {
            state.selectedRansomware = action.payload //The payload will represent the selected ransomware type
        }

    }
})

export const filterActions = filterSlice.actions

export default filterSlice.reducer
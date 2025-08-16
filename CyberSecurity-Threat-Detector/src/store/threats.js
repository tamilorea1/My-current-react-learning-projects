import { createSlice } from "@reduxjs/toolkit";

import { mockThreats } from "../mockThreats";

const initialThreatsState = {threats: mockThreats}

const threatSlice = createSlice({
    name: 'threats',
    initialState: initialThreatsState
})

export default threatSlice.reducer;
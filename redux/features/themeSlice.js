import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE
const initialState = {
    theme: 'light'
}


export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers : {
        changeTheme: (state,action)=>{
            state.theme = action.payload
        },
    }
})

export const {changeTheme} = themeSlice.actions;
export const themeSliceReducer = themeSlice.reducer;
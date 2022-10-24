import {configureStore} from '@reduxjs/toolkit'
import { themeSliceReducer } from './features/themeSlice'

console.log(themeSliceReducer)
export const store = configureStore({
    reducer: {
        theme:themeSliceReducer,
    },
  })
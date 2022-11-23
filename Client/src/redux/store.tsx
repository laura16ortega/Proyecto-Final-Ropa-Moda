import { configureStore } from '@reduxjs/toolkit'
import testSlice from '../redux/slices/testSlice'
import cartSlice from './slices/cartSlice'

const store = configureStore({
   reducer: {
      data: testSlice,
      cart: cartSlice
   },
})

export type RootState = ReturnType<typeof store.getState> // Usado para el custom useSelector
export type AppDispatch = typeof store.dispatch // Usado para el custom dispatch


export default store
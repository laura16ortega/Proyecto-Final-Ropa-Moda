import { configureStore } from '@reduxjs/toolkit'
import testSlice from './slices/testSlice'
import cartSlice from './slices/cartSlice'
import authSlice from './slices/authSlice'
import { NotificationReducer } from './slices/notificationSlice'
import productDetailsSlice from './slices/productDetailsSlice'

const store = configureStore({
   reducer: {
      auth: authSlice,
      data: testSlice,
      productDetails: productDetailsSlice,
      cart: cartSlice,
      notification: NotificationReducer
   },
})

export type RootState = ReturnType<typeof store.getState> // Usado para el custom useSelector
export type AppDispatch = typeof store.dispatch // Usado para el custom dispatch


export default store
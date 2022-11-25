import { configureStore } from '@reduxjs/toolkit'
import testSlice from './slices/testSlice'
import cartSlice from './slices/cartSlice'
import { NotificationReducer } from './slices/notificationSlice'

const store = configureStore({
   reducer: {
      data: testSlice,
      cart: cartSlice,
      notification: NotificationReducer
   },
})

export type RootState = ReturnType<typeof store.getState> // Usado para el custom useSelector
export type AppDispatch = typeof store.dispatch // Usado para el custom dispatch


export default store
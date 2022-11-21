import { configureStore } from '@reduxjs/toolkit'
import testSlice from '../redux/slices/testSlice'

const store = configureStore({
   reducer: {
      data: testSlice,
      // OtherData: otherSlice
   },
})

export type RootState = ReturnType<typeof store.getState> // Usado para el custom useSelector
export type AppDispatch = typeof store.dispatch // Usado para el custom dispatch


export default store
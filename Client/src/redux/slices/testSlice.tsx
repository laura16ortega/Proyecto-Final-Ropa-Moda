import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchingTest, testApiCall, mappedDataType } from "../thunk-actions/testActions"

type InitialState = {
   loading: boolean,
   error: null | string,
   allData: null | mappedDataType[]
}

const initialState = {
   loading: false,
   error: null,
   allData: []
} as InitialState

export const testSlice = createSlice({
   name: "test",
   initialState,
   reducers: {
     increaseGeneralQuantity: (state, action: PayloadAction<number>) => {
      const findProduct = state.allData && state.allData.find(e => e.id === action.payload)
      if (findProduct) findProduct.quantity = findProduct.quantity + 1
     },
     decreaseGeneralQuantity: (state, action: PayloadAction<number>) => {
      const findProduct = state.allData && state.allData.find(e => e.id === action.payload)
      if (findProduct) {
         findProduct.quantity = findProduct.quantity - 1
         if (findProduct.quantity <= 0) findProduct.quantity = 0
      }
     },
     clearGeneralQuantity: (state, action: PayloadAction<number>) => {
      const findProduct = state.allData && state.allData.find(e => e.id === action.payload)
      if (findProduct) findProduct.quantity = 0
     },
   },
   extraReducers(builder) {
      builder
         .addCase(fetchingTest.pending, (state, action) => {
            state.loading = true
         })
         .addCase(fetchingTest.fulfilled, (state, action: PayloadAction<mappedDataType[]>) => {
            state.loading = false
            state.allData = action.payload
         })
         .addCase(fetchingTest.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { increaseGeneralQuantity, decreaseGeneralQuantity, clearGeneralQuantity } = testSlice.actions
export default testSlice.reducer
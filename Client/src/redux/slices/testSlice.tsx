import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchingTest, testApiCall } from "../thunk-actions/testActions"

type InitialState = {
   loading: boolean,
   error: null | string,
   allData: null | testApiCall[]
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
      /*
          - - - Ejemplo de sintaxis - - -

          searchByName: (state, action: PayloadAction<string>) => {
              const filteredName = state.dataBackup && state.dataBackup.filter(e => e.title.toLowerCase().includes(action.payload.toLowerCase()))
              return {
                  ...state,
                  allData: filteredName
              }
          },

      */
   },
   extraReducers(builder) {
      builder
         .addCase(fetchingTest.pending, (state, action) => {
            state.loading = true
         })
         .addCase(fetchingTest.fulfilled, (state, action: PayloadAction<testApiCall[]>) => {
            state.loading = false
            state.allData = action.payload
         })
         .addCase(fetchingTest.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

// export const { searchByName } = testSlice.actions

export default testSlice.reducer
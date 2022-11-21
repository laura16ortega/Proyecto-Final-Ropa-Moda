import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

type ratingApiCall = {
   rate: number
   count: number
}

export type testApiCall = {
   id: number
   title: string
   price: number
   description: string
   category: string
   image: string
   rating: ratingApiCall
}

export const fetchingTest = createAsyncThunk<testApiCall[]>(
   "test/fetch",
   async (data, thunkApi) => {
      try {
         const { data } = await axios.get<testApiCall[]>("https://fakestoreapi.com/products")
         return data
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
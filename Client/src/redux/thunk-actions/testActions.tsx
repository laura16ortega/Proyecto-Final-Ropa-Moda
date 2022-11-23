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

export type mappedDataType = {
   id: number
   title: string
   price: number
   description: string
   category: string
   image: string
   rating: ratingApiCall
   quantity: number
}

export const fetchingTest = createAsyncThunk<mappedDataType[]>(
   "test/fetch",
   async (data, thunkApi) => {
      try {
         const { data } = await axios.get<testApiCall[]>("https://fakestoreapi.com/products")
         const mappedData = data.map(e => {
            return {
               id: e.id,
               title: e.title,
               price: e.price,
               description: e.description,
               category: e.category,
               image: e.image,
               rating: e.rating,
               quantity: 0
            }})
         return mappedData
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
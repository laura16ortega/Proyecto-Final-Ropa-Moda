import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

type ratingApiCall = {
   rate: number
   count: number
}

export type ApiCall = {
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

export const addProductToCart = createAsyncThunk(
   "cart/fetch",
   async (id: number, thunkApi) => {
      try {
         const { data } = await axios.get<ApiCall>(`https://fakestoreapi.com/products/${id}`)
         const dataQuanity = ({...data, quantity: 1})
         return dataQuanity
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
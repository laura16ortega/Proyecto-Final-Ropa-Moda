import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { detailsApiCall } from "../types/productDetailTypes"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getProductDetail = createAsyncThunk(
   "productDetails/fetch",
   async (id: string, thunkApi) => {
      try {
         const { data } = await axios.get<detailsApiCall>(`${BACKEND_URL}/api/v1/products/${id}`)
         return data.data.product
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
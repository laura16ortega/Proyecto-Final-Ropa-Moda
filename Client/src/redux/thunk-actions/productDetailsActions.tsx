import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { detailsApiCall } from "../types/productDetailTypes"

export const getProductDetail = createAsyncThunk(
   "productDetails/fetch",
   async (id: string, thunkApi) => {
      try {
         const { data } = await axios.get<detailsApiCall>(`http://localhost:3001/api/v1/products/${id}`)
         console.log("Details data: ", data.data.product)
         return data.data.product
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
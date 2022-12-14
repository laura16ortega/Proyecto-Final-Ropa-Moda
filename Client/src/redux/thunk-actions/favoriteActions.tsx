import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { detailsApiCall } from "../types/productDetailTypes"
import type { mappedDbProductsType } from "../types/productTypes"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export const addProductToFav = createAsyncThunk(
   "favorite/fetch",
   async (id: string, thunkApi) => {
      try {
         const { data } = await axios.get<detailsApiCall>(`${BACKEND_URL}/api/v1/products/${id}`)
         const dataQuanity = ({...data.data.product, quantity: 1})
         return dataQuanity
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

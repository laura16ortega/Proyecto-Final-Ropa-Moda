import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { detailsApiCall } from "../types/productDetailTypes"
import type { mappedDbProductsType } from "../types/productTypes"



export const addProductToFav = createAsyncThunk(
   "favorite/fetch",
   async (id: string, thunkApi) => {
      try {
         const { data } = await axios.get<detailsApiCall>(`http://localhost:3001/api/v1/products/${id}`)
         const dataQuanity = ({...data.data.product, quantity: 1})
         return dataQuanity
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

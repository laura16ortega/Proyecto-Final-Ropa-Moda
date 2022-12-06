import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { detailsApiCall } from "../types/productDetailTypes"
import type { mappedDbProductsType } from "../types/productTypes"

type cartCheckoutType = {
   token: string
   cartData: mappedDbProductsType[]
}

export const addProductToCart = createAsyncThunk(
   "cart/fetch",
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

export const stripeCheckout = createAsyncThunk(
   "cart/stripe_checkout",
   async (cartCheckout: cartCheckoutType, thunkApi) => {
      console.log("Cart checkout: ", cartCheckout)
      try {
         const { data } = await axios.post("http://localhost:3001/api/v1/payment/stripe",
         cartCheckout.cartData,
         { headers: { Authorization: `Bearer ${cartCheckout.token}` } }
         )
         return data.url
      } catch (error: any) {
         console.log("stripe error: ", error)
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
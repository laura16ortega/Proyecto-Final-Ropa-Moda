import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { DataProps } from "../types/reviewTypes"

export const postReview = createAsyncThunk(
   "reviews/post",
   async (postData: DataProps, thunkApi) => {
      try {
         const { data } = await axios.post(
            `http://localhost:3001/api/v1/products/review/${postData.productId}`,
            postData, // Toda la data, se destructura desde el back
            { headers: { Authorization: `Bearer ${postData.token}` } }
         )
         return data.message
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
);

//Get Review info by id
export const getReview = createAsyncThunk(
   "get/review",
   async(id:string, thunkApi)=>{
         try {
            const {data} = await axios.get(
               `http://localhost:3001/api/v1/products/review/${id}`
            )

            return data
         } catch (error) {
            return thunkApi.rejectWithValue(error)
         }
   }
)


// createAsyncThunk only accepts a single argument for your thunks / payload creation callbacks.
// You're currently declaring that it takes two arguments: (userId, userDiveLogList).
// You would need to put both of these together into a single object.

//.pending reviewPostloading true
//.fulfilled message, display message snack
//error, display error arriba del formulario
// error de autorizacion: snakckdsk err
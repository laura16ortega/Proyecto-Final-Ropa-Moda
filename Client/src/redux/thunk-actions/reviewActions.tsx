import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { DataProps, PostReviewResponse, ReviewType } from "../types/reviewTypes"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const postReview = createAsyncThunk(
   "reviews/post",
   async (postData: DataProps, thunkApi) => {
      try {
         console.log("Sent values: ", postData)
         const { data } = await axios.post<PostReviewResponse>(
            `${BACKEND_URL}/api/v1/products/review/${postData.productId}`,
            postData, // Toda la data, se destructura desde el back
            { headers: { Authorization: `Bearer ${postData.token}` } }
         )
         return data.message
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
);

export const getReview = createAsyncThunk(
   "reviews/get",
   async(reviewId: string, thunkApi) => {
      try {
         const { data } = await axios.get<ReviewType>(`${BACKEND_URL}/api/v1/products/review/${reviewId}`)
         return data
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
);

// /review/:id
// reviews: ['6388d82432839c23d8df7781']


// createAsyncThunk only accepts a single argument for your thunks / payload creation callbacks.
// You're currently declaring that it takes two arguments: (userId, userDiveLogList).
// You would need to put both of these together into a single object.

//.pending reviewPostloading true
//.fulfilled message, display message snack
//error, display error arriba del formulario
// error de autorizacion: snakckdsk err
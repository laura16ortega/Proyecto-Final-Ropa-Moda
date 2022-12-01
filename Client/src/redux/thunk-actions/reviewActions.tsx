import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { DataProps, PostReviewResponse, ReviewType } from "../types/reviewTypes"

export const postReview = createAsyncThunk(
   "reviews/post",
   async (postData: DataProps, thunkApi) => {
      try {
         console.log("Sent values: ", postData)
         const { data } = await axios.post<PostReviewResponse>(
            `http://localhost:3001/api/v1/products/review/${postData.productId}`,
            postData, // Toda la data, se destructura desde el back
            { headers: { Authorization: `Bearer ${postData.token}` } }
         )
         console.log("post response", data)
         return data.message
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.response.data.message)
      }
   }
)

export const getReview = createAsyncThunk(
   "reviews/get",
   async(reviewId: string, thunkApi) => {
      try {
         const { data } = await axios.get<ReviewType>(`http://localhost:3001/api/v1/products/review/${reviewId}`)
         return data
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

// /review/:id
// reviews: ['6388d82432839c23d8df7781']


// createAsyncThunk only accepts a single argument for your thunks / payload creation callbacks.
// You're currently declaring that it takes two arguments: (userId, userDiveLogList).
// You would need to put both of these together into a single object.

//.pending reviewPostloading true
//.fulfilled message, display message snack
//error, display error arriba del formulario
// error de autorizacion: snakckdsk err
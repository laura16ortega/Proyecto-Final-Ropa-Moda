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
         console.log("Review post data: ", data)
         return data.message
         /*
         res.status(201).json({
            message:"Review Created Succesfully",
            review: updatedProduct.reviews[updatedProduct.reviews.length -1],
            ratingsQuantity: product.ratingsQuantity,
            rating: product.ratingsAverage
         }); 
         */
      } catch (error: any) {
         console.log("Post review action error: ", error)
         return thunkApi.rejectWithValue(error.message)
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
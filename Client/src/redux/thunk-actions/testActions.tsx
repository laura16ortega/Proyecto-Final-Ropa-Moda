import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { DbProductType, mappedDbProductsType, DbCall } from "../types/productTypes"

/*
export const fetchingTest = createAsyncThunk<mappedDataType[]>(
   "test/fetch",
   async (data, thunkApi) => {
      try {
         const { data } = await axios.get<testApiCall[]>("https://fakestoreapi.com/products")
         const mappedData = data.map(e => {
            return {
               id: e.id,
               title: e.title,
               price: e.price,
               description: e.description,
               category: e.category,
               image: e.image,
               rating: e.rating,
               quantity: 0
            }})
         return mappedData
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)
*/

export const getAllProducts = createAsyncThunk<mappedDbProductsType[]>(
   "test/fetch",
   async (data, thunkApi) => {
      try {
         const { data } = await axios.get<DbCall>("http://localhost:3001/api/v1/products")
         const mappedData = data.data.products.map((e: DbProductType) => {
            return {
               images: e.images,
               ratingsAverage: e.ratingsAverage,
               ratingsQuantity: e.ratingsQuantity,
               tallaCamiseta: e.tallaCamiseta,
               tallaPantalón: e.tallaPantalón,
               _id: e._id,
               name: e.name,
               price: e.price,
               summary: e.summary,
               description: e.description,
               stock: e.stock,
               category: e.category,
               reviews: e.reviews,
               __v: e.__v,
               quantity: 1
            }})
         return mappedData
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message)
      }
   }
)

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DbProductType,
  mappedDbProductsType,
  DbCall,
} from "../types/productTypes";

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
      const { data } = await axios.get<DbCall>(
        "http://localhost:3001/api/v1/products"
      );
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
          stock: e.stock,
          category: e.category,
          marca: e.marca,
          gender: e.gender,
          reviews: e.reviews,
          __v: e.__v,
          quantity: 1,
        };
      });
      return mappedData;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "test/create",
  async (bodyData: object, thunkApi) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/api/v1/products`, bodyData);
      console.log("Data post: ", data)
      return data;
    } catch (error: any) {
      console.log("post product error: ", error)
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getCheckoutSessions = createAsyncThunk(
  "test/getStripeData",
  async(data, thunkApi) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/v1/payment/stripe")
      return data
    } catch (e) {
      return thunkApi.rejectWithValue(e)
    }
  }
)
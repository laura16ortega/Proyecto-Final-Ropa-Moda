import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { OrderType, OrderItems, GetOrdersResponse, OrderDetailsType } from "../types/orderTypes"

type SentOrder = {
    orderItems: OrderItems[] | undefined
    paymentMethod: string | null
    itemsPrice: number | undefined
    taxPrice: number
    shippingPrice: number
    totalPrice: number | undefined
    userId: string
}

export const createOrder = createAsyncThunk(
    "order/create",
    async(orderData: SentOrder, thunkApi) => {
        console.log("sent order data: ", orderData)
        try {
            const { data } = await axios.post<any>(`http://localhost:3001/api/v1/orders`, orderData)
            // const createOrder = await order.save();
            // res.status(201).json(createOrder);
            console.log("order data: ", data)
        } catch (e) {
            console.log("create order error: ", e)
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const getOrders = createAsyncThunk(
    "order/getAll",
    async(data, thunkApi) => {
        try {
            const { data } = await axios.get<GetOrdersResponse>(`http://localhost:3001/api/v1/orders`)
            console.log("order get all: ", data)
            return data.data.orders
        } catch (e) {
            console.log("get all order error: ", e)
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const orderById = createAsyncThunk(
    "order/byId",
    async(id: string, thunkApi) => {
        try {
            const { data } = await axios.get<OrderDetailsType>(`http://localhost:3001/api/v1/orders/${id}`)
            console.log("order get by id data: ", data)
            return data
        } catch (e) {
            console.log("get by id error: ", e)
            return thunkApi.rejectWithValue(e)
        }
    }
)
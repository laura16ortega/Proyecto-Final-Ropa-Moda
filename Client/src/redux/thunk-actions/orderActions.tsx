import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { OrderType, OrderItems, GetOrdersResponse, OrderDetailsType } from "../types/orderTypes"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

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
            const { data } = await axios.post<any>(`${BACKEND_URL}/api/v1/orders`, orderData)
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
            const { data } = await axios.get<GetOrdersResponse>(`${BACKEND_URL}/api/v1/orders`)
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
            const { data } = await axios.get<OrderDetailsType>(`${BACKEND_URL}/api/v1/orders/${id}`)
            console.log("order get by id data: ", data)
            return data
        } catch (e) {
            console.log("get by id error: ", e)
            return thunkApi.rejectWithValue(e)
        }
    }
)

type DadataBody = {
    orderId: string
    isDelivered: boolean
    isPaid: boolean
}

export const updateOrder = createAsyncThunk(
    "order/update",
    async(dataBody: DadataBody, thunkApi) => {
        try {
            const { data } = await axios.patch<OrderDetailsType>(`${BACKEND_URL}/api/v1/orders/${dataBody.orderId}`, dataBody)
            return data
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.response.data)
        }
    }
)
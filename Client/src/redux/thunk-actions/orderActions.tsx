import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

type OrderItems = {
    name: string
    qty: number
    image: string
    price: number
    product: string
}

type OrderType = {
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
    async(orderData: OrderType, thunkApi) => {
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
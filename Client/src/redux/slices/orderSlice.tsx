import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { OrderType, OrderDetailsType } from "../types/orderTypes"
import { getOrders, orderById } from "../thunk-actions/orderActions"

type InitialState = {
    ordersLoading: boolean
    ordersError: null | string
    orders: OrderType[]
    orderDetailsLoading: boolean
    orderDetails: OrderDetailsType | undefined
}

const initialState = {
    ordersLoading: false,
    ordersError: null,
    orders: [],
    orderDetailsLoading: false,
    orderDetails: undefined
} as InitialState

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getOrders.pending, (state, action) => {
            state.ordersLoading = true
        })
        .addCase(getOrders.fulfilled, (state, action: PayloadAction<OrderType[]>) => {
            state.ordersLoading = false
            state.orders = action.payload
        })
        .addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
            state.ordersLoading = false
            state.ordersError = action.payload
        })
        .addCase(orderById.pending, (state, action) => {
            state.orderDetailsLoading = true
        })
        .addCase(orderById.fulfilled, (state, action: PayloadAction<OrderDetailsType>) => {
            state.orderDetailsLoading = false
            state.orderDetails = action.payload
        });
    },
})

export default orderSlice.reducer

/*

createdAt: "2022-12-09T21:44:26.079Z"
isDelivered: false
isPaid: false
orderItems: [{…}]
paymentMethod: "Credit Card"
shippingPrice: 0
taxPrice: 0
totalPrice: 125
updatedAt: "2022-12-09T21:44:26.079Z"
user: "63939fb4a266f81d1cff2231"
_id: "6393ac3ac1de2d33482503ed"

*/
export type OrderItems = {
    image: string
    name: string
    product: string
    qty: number
    _id: string
}

export type OrderType = {
    createdAt: string
    isDelivered: boolean
    isPaid: boolean
    orderItems: OrderItems[]
    paymentMethod: string
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    updatedAt: string
    user: string
    _id: string
}

type UserOrderType = {
    email: string
    fullName: string
    _id: string
}

export type OrderDetailsType = {
createdAt: string
isDelivered: boolean
isPaid: boolean
orderItems: OrderItems[]
paymentMethod: string
shippingPrice: number
taxPrice: number
totalPrice: number
updatedAt: string
user: UserOrderType
_id: string
}

export type GetOrdersResponse = {
    status: string
    results: number
    data: {orders: OrderType[]}
}
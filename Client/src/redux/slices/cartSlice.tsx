import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addProductToCart, ApiCall, mappedDataType } from "../thunk-actions/cartActions"

type InitialState = {
    cartLoading: boolean,
    cartError: null | string,
    cart: null | mappedDataType[]
}

const initialState = {
    cartLoading: false,
    cartError: null,
    cart: [],
} as InitialState

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increaseCartQuantity: (state, action: PayloadAction<number>) => {
            const findOnCart = state.cart && state.cart.find(e => e.id === action.payload)
            if (findOnCart) {
                const newqty = findOnCart.quantity = findOnCart.quantity + 1
                findOnCart.quantity = newqty
            }
        },
        decreaseCartQuantity: (state, action: PayloadAction<number>) => {
            const findOnCart = state.cart && state.cart.find(e => e.id === action.payload)

            if (findOnCart) {
                findOnCart.quantity = findOnCart.quantity - 1
                if (findOnCart.quantity <= 0) {
                    // No optimo :ss
                    const newState = state.cart && state.cart.filter(e => e.id !== action.payload)
                    state.cart = newState
                }
            }

        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const newState = state.cart && state.cart.filter(e => e.id !== action.payload)
            state.cart = newState
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addProductToCart.pending, (state, action) => {
                state.cartLoading = true
            })
            .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<mappedDataType>) => {
                state.cartLoading = false
                state.cart && state.cart.push(action.payload) // Immer deja alterar el estado con javascript puro
            })
            .addCase(addProductToCart.rejected, (state, action: PayloadAction<any>) => {
                state.cartLoading = false
                state.cartError = action.payload
            })
    },
})

export const { increaseCartQuantity, decreaseCartQuantity, removeCartItem } = cartSlice.actions
export default cartSlice.reducer
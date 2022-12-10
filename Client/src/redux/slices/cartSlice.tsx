import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addProductToCart, stripeCheckout } from "../thunk-actions/cartActions"
import type { mappedDbProductsType } from "../types/productTypes"

type InitialState = {
    cartLoading: boolean,
    cartError: null | string,
    cart: null | mappedDbProductsType[]
    checkoutLoad: boolean
}

const initialState = {
    cartLoading: false,
    cartError: null,
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [],
    checkoutLoad: false
} as InitialState

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increaseCartQuantity: (state, action: PayloadAction<string>) => {
            const cartProd: mappedDbProductsType[] = JSON.parse(localStorage.getItem('cart') || "")
            state.cart = cartProd
            const findOnCart = state.cart && state.cart.find(e => e._id === action.payload) // Buscar en localstorage, no funciona al recargar
            if (findOnCart) {
                const newqty = findOnCart.quantity = findOnCart.quantity + 1
                findOnCart.quantity = newqty
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        decreaseCartQuantity: (state, action: PayloadAction<string>) => {
            const cartProd: mappedDbProductsType[] = JSON.parse(localStorage.getItem('cart') || "")
            state.cart = cartProd
            const findOnCart = state.cart && state.cart.find(e => e._id === action.payload)

            if (findOnCart) {
                findOnCart.quantity = findOnCart.quantity - 1
                localStorage.setItem('cart', JSON.stringify(state.cart));
                if (findOnCart.quantity <= 0) {
                    // No optimo :ss
                    const newState = state.cart && state.cart.filter(e => e._id !== action.payload)
                    state.cart = newState
                    localStorage.setItem('cart', JSON.stringify(state.cart));
                }
            }

        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            const cartProd: mappedDbProductsType[] = JSON.parse(localStorage.getItem('cart') || "")
            state.cart = cartProd
            
            const newState = state.cart && state.cart.filter(e => e._id !== action.payload)
            state.cart = newState
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state, action: PayloadAction<void>) => {
            state.cart = []
            window.localStorage.setItem("cart", JSON.stringify([]))
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addProductToCart.pending, (state, action) => {
                state.cartLoading = true
            })
            .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<mappedDbProductsType>) => {
                state.cartLoading = false
                state.cart && state.cart.push(action.payload) // Immer deja alterar el estado con javascript puro
                localStorage.setItem('cart', JSON.stringify(state.cart));
            })
            .addCase(addProductToCart.rejected, (state, action: PayloadAction<any>) => {
                state.cartLoading = false
                state.cartError = action.payload
            })
            .addCase(stripeCheckout.pending, (state, action) => {
                state.checkoutLoad = true
            })
            .addCase(stripeCheckout.fulfilled, (state, action) => {
                state.checkoutLoad = false
            })
    },
})

export const { increaseCartQuantity, decreaseCartQuantity, removeCartItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
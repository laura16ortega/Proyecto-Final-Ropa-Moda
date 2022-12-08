import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addProductToFav } from "../thunk-actions/favoriteActions"
import type { mappedDbProductsType } from "../types/productTypes"

type InitialState = {
    favLoading: boolean,
    favError: null | string,
    fav: null | mappedDbProductsType[]
    checkoutLoad: boolean
}

const initialState = {
    favLoading: false,
    favError: null,
    fav: localStorage.getItem("fav") ? JSON.parse(localStorage.getItem("fav")!) : [],
    checkoutLoad: false
} as InitialState

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        increasefavQuantity: (state, action: PayloadAction<string>) => {
            const favProd: mappedDbProductsType[] = JSON.parse(localStorage.getItem('fav') || "")
            state.fav = favProd
            const findOnFav = state.fav && state.fav.find(e => e._id === action.payload) // Buscar en localstorage, no funciona al recargar
            console.log("fav from localstorage - reducer: ", favProd)
            if (findOnFav) {
                const newqty = findOnFav.quantity = findOnFav.quantity + 1
                findOnFav.quantity = newqty
                localStorage.setItem('fav', JSON.stringify(state.fav));
            }
        },
        decreasefavQuantity: (state, action: PayloadAction<string>) => {
            const favProd: mappedDbProductsType[] = JSON.parse(localStorage.getItem('fav') || "")
            state.fav = favProd
            const findOnFav = state.fav && state.fav.find(e => e._id === action.payload)

            if (findOnFav) {
                findOnFav.quantity = findOnFav.quantity - 1
                localStorage.setItem('fav', JSON.stringify(state.fav));
                if (findOnFav.quantity <= 0) {
                    // No optimo :ss
                    const newState = state.fav && state.fav.filter(e => e._id !== action.payload)
                    state.fav = newState
                    localStorage.setItem('fav', JSON.stringify(state.fav));
                }
            }

        },
        removefavItem: (state, action: PayloadAction<string>) => {
            const favProd: mappedDbProductsType[] = JSON.parse(localStorage.getItem('fav') || "")
            state.fav = favProd
            
            const newState = state.fav && state.fav.filter(e => e._id !== action.payload)
            state.fav = newState
            localStorage.setItem('fav', JSON.stringify(state.fav));
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addProductToFav.pending, (state, action) => {
                state.favLoading = true
            })
            .addCase(addProductToFav.fulfilled, (state, action: PayloadAction<mappedDbProductsType>) => {
                state.favLoading = false
                state.fav && state.fav.push(action.payload) // Immer deja alterar el estado con javascript puro
                localStorage.setItem('fav', JSON.stringify(state.fav));
            })
            .addCase(addProductToFav.rejected, (state, action: PayloadAction<any>) => {
                state.favLoading = false
                state.favError = action.payload
            })
    },
})

export const { increasefavQuantity, decreasefavQuantity, removefavItem } = favoritesSlice.actions
export default favoritesSlice.reducer
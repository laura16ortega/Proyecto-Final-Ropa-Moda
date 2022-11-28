import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DbProductType } from "../types/productTypes"
import { getProductDetail } from "../thunk-actions/productDetailsActions" 

type InitialState = {
    detailsLoading: boolean
    detailsError: null | string
    productDetails: null | DbProductType
}

const initialState = {
    detailsLoading: false,
    detailsError: null,
    productDetails: {},
} as InitialState

export const productDetailSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        clearState: (state, action: PayloadAction<void>) => {
            state.productDetails = null
        },
    },
    extraReducers(builder) {
        builder
        .addCase(getProductDetail.pending, (state, action) => {
            state.detailsLoading = true
        })
        .addCase(getProductDetail.fulfilled, (state, action: PayloadAction<DbProductType>) => {
            state.detailsLoading = false
            state.productDetails = action.payload
        })
        .addCase(getProductDetail.rejected, (state, action: PayloadAction<any>) => {
            state.detailsLoading = false
            state.detailsError = action.payload
        })
    },
})
export const { clearState } = productDetailSlice.actions
export default productDetailSlice.reducer
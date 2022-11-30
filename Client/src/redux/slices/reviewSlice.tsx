import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { postReview } from "../thunk-actions/reviewActions"

type InitialState = {
    postReviewLoading: boolean
    postReviewError: any 
    postReviewSuccess: any
}

const initialState = {
    postReviewLoading: false,
    postReviewError: "",
    postReviewSuccess: null
} as InitialState

export const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(postReview.pending, (state, action) => {
            state.postReviewLoading = true
        })
        .addCase(postReview.fulfilled, (state, action: PayloadAction<string>) => {
            state.postReviewLoading = false
            state.postReviewSuccess = action.payload
        })
        .addCase(postReview.rejected, (state, action: PayloadAction<any>) => {
            state.postReviewError = action.payload
        })
    },
})

export default reviewSlice.reducer
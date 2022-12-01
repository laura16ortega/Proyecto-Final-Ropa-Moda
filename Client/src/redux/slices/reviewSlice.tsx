import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getReview, postReview } from "../thunk-actions/reviewActions"
import type { ReviewType } from "../types/reviewTypes"

type InitialState = {
    postReviewLoading: boolean
    postReviewError: any 
    postReviewSuccess: any
    getReviewLoading: boolean
    reviewsArr: ReviewType[]
    getReviewError: any
}

const initialState = {
    postReviewLoading: false,
    postReviewError: "",
    postReviewSuccess: null,
    getReviewLoading: false,
    reviewsArr: [],
    getReviewError: null
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
        .addCase(getReview.pending, (state, action) => {
            state.getReviewLoading = false
        })
        .addCase(getReview.fulfilled, (state, action: PayloadAction<ReviewType>) => {
            state.reviewsArr.push(action.payload)
            state.getReviewLoading = false
        })
        .addCase(getReview.rejected, (state, action: PayloadAction<any>) => {
            state.getReviewLoading = false
            state.getReviewError = action.payload
        })
    },
})

export default reviewSlice.reducer
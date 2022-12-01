export type DataProps = {
    productId: string
    userId: string
    rating: number
    comment: string
    token: string
}

type DbReviewType = {
    _id: string
    userId: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}

export type PostReviewResponse = {
    message: string
    review: DbReviewType
    ratingsQuantity: number
    rating: number
}
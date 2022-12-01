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
    // SOLO: 
    //
    // "rating": 5,
    // "name": "test-admin2",
    // "comment": "comentario test postman"
}

export type PostReviewResponse = {
    message: string
    review: DbReviewType
    ratingsQuantity: number
    rating: number
}

export type ReviewType = {
    rating: number
    name: string
    comment: string
}
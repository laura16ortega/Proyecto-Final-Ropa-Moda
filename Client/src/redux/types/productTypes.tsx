// Reviews
type DbReviewsType = {
    _id: string
    userId: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}

// Producto en general
export type DbProductType = {
    images: string[] | []
    ratingsAverage: number
    ratingsQuantity: number
    tallaCamiseta: string[] | []
    tallaPantalón: string[] | []
    _id: string
    name: string
    price: number
    summary: string
    stock: number
    category: string
    marca: string
    gender: string
    reviews: DbReviewsType[]
    __v: number
}

// Llamado al localhost
type dataDbCall = {
    products: DbProductType[]
}

export type DbCall = {
    status: string
    results: number
    data: dataDbCall
}

// Usado para el cart
export interface mappedDbProductsType extends DbProductType {
    quantity: number
    [index: string]: any; // Includes del filtros
}
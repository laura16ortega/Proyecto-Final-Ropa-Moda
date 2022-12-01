// Reviews
type DbReviewsType = {
    _id: string
    userId: string
    rating: number
    comment: string
    createdAt: string
    updatedAt: string
}

type ImagesType = {
    public_id: string
    url: string
}

// Producto en general
export type DbProductType = {
    images: any // Pasar a string[] | [] | ImagesType cuando se arregle
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
    reviews: string[]
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
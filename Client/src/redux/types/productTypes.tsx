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
<<<<<<< HEAD
    map(arg0: (e: any) => JSX.Element): import("react").ReactNode
    length: number
    images: string[] | []
=======
    images: any // Pasar a string[] | [] | ImagesType cuando se arregle
>>>>>>> 7a381a9d5c4021ef81171078c57610c368c1d912
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
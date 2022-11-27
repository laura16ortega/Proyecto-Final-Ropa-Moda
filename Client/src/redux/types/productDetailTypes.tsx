import { DbProductType } from "./productTypes"

type dataDetailsApiCall = {
    product: DbProductType
}

export type detailsApiCall = {
    status: string
    data: dataDetailsApiCall
}
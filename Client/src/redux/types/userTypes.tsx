export type UserType = {
    isAdmin?: boolean
    fullName: string
    email: string
    _id: string
    image: string
    createdAt: string
    phone_number: number
    updatedAt: string
}

export type LoginUserPost = {
    token: string
    user: UserType
}

export type RegisterUserPost = {
    message: string
    registerNewUser: UserType
}
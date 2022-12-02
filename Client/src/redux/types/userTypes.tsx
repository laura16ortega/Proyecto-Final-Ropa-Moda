export type UserType = {
    isAdmin?: boolean
    fullName: string
    email: string
    userId: string
}

export type LoginUserPost = {
    token: string
    user: UserType
}

export type RegisterUserPost = {
    message: string
    registerNewUser: UserType
}
import { Roles } from "./roles"

export interface UserInfo{
    userId: string,
    fullName: string,
    email: string,
    isAdmin: boolean
    rol: Roles
}
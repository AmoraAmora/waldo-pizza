/* eslint-disable no-unused-vars */
import { GetToppingsFieldsFragment } from '../../generated/graphql'

export interface order{
    name: string
    maxToppings: number | null
    basePrice: number
    toppings: GetToppingsFieldsFragment[]
}

export type OrdersType = {
    totalPrice: string
    orders: order[]
    onAdd(item: order): void
    onDelete(id: number): void
}

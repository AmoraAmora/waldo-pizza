interface pizzaToppingConnection {
    defaultSelected: boolean
    topping: {
        name: string
        price: number
    }
}

export interface order{
    name: string
    maxToppings: number | null
    basePrice: number
    toppings: pizzaToppingConnection[]
}

export type OrdersType = {
    totalPrice: string
    orders: order[]
    onAdd(item: order): void
    onDelete(id: number): void
}
export interface pizzaToppingConnection {
    defaultSelected: boolean
    topping: {
        name: string
        price: number
    }
}

export interface pizzaSizes{
    name: string
    maxToppings: number | null
    basePrice: number
    toppings: pizzaToppingConnection[]
}

export type PizzaData = {
    pizzaSizes: pizzaSizes[]
}

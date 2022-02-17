import React, { createContext, ReactNode, useContext, useEffect, useState, } from 'react'
import { order, OrdersType } from './intefaces'

const defaultValue = {
    orders: [],
    totalPrice: '',
    onAdd: () => null,
    onDelete: () => null,
}

const Orders = createContext<OrdersType>(defaultValue)

export const useOrder = () => useContext(Orders)

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<order[]>([])
    const [total, setTotal] = useState('0')

    useEffect(()=>{
        const sum = orders.length !==0 ? orders.map((el)=>{
           return (el?.basePrice + el.toppings.map((el)=>el.defaultSelected ? el.topping.price : 0).reduce((total, amount) => total + amount))
        }).reduce((total, amount) => total + amount).toFixed(2) : ''
        setTotal(sum)
    }, [orders])

    const onAdd = (item: order) => {
        const add = [...orders]
        add.push(item)
        setOrders(add)
    }

    const onDelete = (id: number) => {
        setOrders(orders!.filter((el,i) => i !== id))
    }

    return (
        <Orders.Provider value={{
            totalPrice: total,
            orders: orders,
            onAdd,
            onDelete,
        }}
        >
            {children}
        </Orders.Provider>
    )
}
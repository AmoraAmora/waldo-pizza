import React, {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react'
import { order, OrdersType } from './intefaces'

const getTotal = (orderData: order) => {
  const { basePrice, toppings } = orderData
  const pricesOfToppings = toppings.map((item) => (item.defaultSelected ? item.topping.price : 0))
  const selectedToppingsTotalPrice = pricesOfToppings.reduce((total, amount) => total + amount)

  return (basePrice + selectedToppingsTotalPrice)
}

const getOrdersTotal = (orders: order[]) => {
  const ordersSum = orders.map((el) => getTotal(el)).reduce((sum, amount) => sum + amount)

  return ordersSum.toFixed(2)
}

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

  useEffect(() => {
    const sumOfOrders = orders.length !== 0 ? getOrdersTotal(orders) : ''
    setTotal(sumOfOrders)
  }, [orders])

  const onAdd = (item: order) => {
    const add = [...orders]
    add.push(item)
    setOrders(add)
  }

  const onDelete = (id: number) => {
    setOrders(orders!.filter((el, i) => i !== id))
  }

  return (
    <Orders.Provider value={{
      totalPrice: total,
      orders,
      onAdd,
      onDelete,
    }}
    >
      {children}
    </Orders.Provider>
  )
}

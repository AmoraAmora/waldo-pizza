import React from 'react'
import { order } from '../../OrderContext/intefaces'
import { useOrder } from '../../OrderContext'
import style from '../style.module.css'
import { getEmogi } from '../../Pizza/ToppingItem/emogi'

const getTotal = (orderData: order) => {
  const { basePrice, toppings } = orderData
  const pricesOfToppings = toppings.map((item) => (item.defaultSelected ? item.topping.price : 0))
  const selectedToppingsTotalPrice = pricesOfToppings.reduce((total, amount) => total + amount)

  return (basePrice + selectedToppingsTotalPrice).toFixed(2)
}

function CartItem({ сartData, orderId }: {сartData: order, orderId: number}) {
  const { onDelete } = useOrder()
  const total = getTotal(сartData)

  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <span className={style.title}>
          {сartData.name}
          {' '}
          pizza
        </span>
        <div className={style.icon_container}>
          {сartData.toppings.map((item, i) => {
            if (item.defaultSelected) {
              return <div key={i} className={style.icon}>{getEmogi(item.topping.name)}</div>
            }
            return null
          })}
        </div>
        <span className={style.total}>
          total: $
          {total}
        </span>
      </div>
      <div className={style.end}>
        <div className={style.icon_button} onClick={() => onDelete(orderId)}>✖️</div>
      </div>
    </div>
  )
}

export default CartItem

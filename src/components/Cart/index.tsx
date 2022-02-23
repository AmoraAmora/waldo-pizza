import React from 'react'
import { useOrder } from '../OrderContext'
import CartItem from './CartItem'
import style from './style.module.css'

function Cart() {
  const { orders, totalPrice } = useOrder()

  return (
    <div className={style.main}>
      {orders.map((el, i) => <CartItem key={i} сartData={el} orderId={i} />)}
      {totalPrice && <div className={style.hr} /> }
      {totalPrice && (
      <div className={style.total_container}>
        <div className={style.total_title}>total</div>
        <div className={style.total_title}>{totalPrice}</div>
      </div>
      )}
      {!totalPrice && <div className={style.nothing}>your pizza cart is empty</div>}
    </div>
  )
}

export default Cart

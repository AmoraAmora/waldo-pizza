import React from "react"
import { useOrder } from "../OrderContext"
import CartItem from "./CartItem"
import style from "./style.module.css"

const Cart = () => {
    const { orders, totalPrice } = useOrder()
    return (
        <div className={style.main}>
            {orders.map((el, i)=>{
                return <CartItem key={i} el={el} id={i} />
            })}
            {totalPrice && <div className={style.hr}/> }
            {totalPrice && <div className={style.total_container}>
                <div className={style.total_title}>total</div>
                <div className={style.total_title}>{totalPrice}</div>
            </div>}
        </div>
    )
}

export default Cart
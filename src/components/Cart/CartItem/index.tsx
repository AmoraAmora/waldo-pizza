import React from "react"
import { order } from "../../OrderContext/intefaces"
import { useOrder } from "../../OrderContext"
import style from "../../Cart/style.module.css"
import { EMOGI } from "../../Pizza/ToppingItem/emogi"

const CartItem = ({el, id}: {el: order, id: number}) => {
    const { onDelete } = useOrder()
    const total = (el?.basePrice + el.toppings.map((el)=>el.defaultSelected ? el.topping.price : 0).reduce((total, amount) => total + amount)).toFixed(2)
    return (
        <div className={style.container}>
            <div className={style.title_container}>
                <span className={style.title}>{el.name} pizza</span>
                <div className={style.icon_container}>
                    {el.toppings.map((el, i)=>{
                        /* @ts-ignore */
                        if (el.defaultSelected) {return <div key={i}  className={style.icon}>{EMOGI[el.topping.name]}</div>}
                        else return null
                    })}
                </div>
                <span className={style.total}>total: ${total}</span>
           </div>
           <div className={style.end}>
               <div className={style.icon_button} onClick={() => onDelete(id)}>✖️</div>
           </div>
        </div>
    )
}

export default CartItem
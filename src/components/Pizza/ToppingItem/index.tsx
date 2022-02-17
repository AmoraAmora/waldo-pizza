import React from "react"
import { pizzaToppingConnection } from "../interfaces"
import style from "../style.module.css"
import { EMOGI, COLOR } from "./emogi"

const ToppingItem = ({el, onClick , id}: {el: pizzaToppingConnection, onClick:(id: number) => void, id: number}) => {
    return (
        <>
        {/* @ts-ignore */}
        <div className={style.tag} style={{background: el.defaultSelected ? COLOR[el.topping.name] : '#eff0f5'}} onClick={()=>onClick(id)}>
            {/* @ts-ignore */}
             <span>{EMOGI[el.topping.name]}</span>
            <span>{el.topping.name}</span>
            <span className={style.tag_price}>${el.topping.price}</span>
        </div>
        </>
    )
}

export default ToppingItem
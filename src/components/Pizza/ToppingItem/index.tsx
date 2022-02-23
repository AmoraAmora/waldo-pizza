import React from 'react'
import style from '../style.module.css'
import { getEmogi } from './emogi'
import { ToppingItemProps } from './interface'

function ToppingItem({ el, onClick, id }: ToppingItemProps) {
  const background = el.defaultSelected ? '#eff0f5' : '#FFF'
  const { name } = el.topping
  return (
    <div className={style.tag} style={{ background }} onClick={() => onClick(id)}>
      <span>{getEmogi(name)}</span>
      <span className={style.tag_name}>{el.topping.name}</span>
      <span className={style.tag_price}>
        $
        {el.topping.price}
      </span>
    </div>
  )
}

export default ToppingItem

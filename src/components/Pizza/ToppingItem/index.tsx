import React from 'react'
import style from '../style.module.css'
import { getEmogi } from './emogi'
import { ToppingItemProps } from './interface'

function ToppingItem({ toppingData, onClick, id }: ToppingItemProps) {
  const background = toppingData.defaultSelected ? '#eff0f5' : '#FFF'
  const { name, price } = toppingData.topping

  return (
    <div className={style.tag} style={{ background }} onClick={() => onClick(id)}>
      <span>{getEmogi(name)}</span>
      <span className={style.tag_name}>{name}</span>
      <span className={style.tag_price}>
        $
        {price}
      </span>
    </div>
  )
}

export default ToppingItem

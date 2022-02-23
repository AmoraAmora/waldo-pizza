import React from 'react'
import PizzaItem from './PizzaItem'
import style from './style.module.css'
import { useGetPizzaQuery } from '../../generated/graphql'

function Pizzas() {
  const { data } = useGetPizzaQuery()
  return (
    <div className={style.main}>
      {data && data!.pizzaSizes.map((el, i) => <PizzaItem el={el} key={i} />)}
    </div>
  )
}

export default Pizzas

import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PIZZA } from './query'
import { PizzaData } from './interfaces'
import PizzaItem from './PizzaItem'
import style from './style.module.css'

function Pizzas() {
  const { data } = useQuery<PizzaData>(GET_PIZZA)
  return (
    <div className={style.main}>
      {data && data!.pizzaSizes.map((el, i) => <PizzaItem el={el} key={i} />)}
    </div>
  )
}

export default Pizzas

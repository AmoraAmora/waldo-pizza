import React, { useReducer } from 'react'
import { GetPizzaFieldsFragment } from '../../../generated/graphql'
import { useOrder } from '../../OrderContext'
import style from '../style.module.css'
import ToppingItem from '../ToppingItem'
import {
  pizzaReducer,
  SELECT_WITH_EMPTY_LIMIT,
  SELECT_WITH_LIMIT, UNLIMITED_CHANGE,
  UNSELECT_WITH_EMPTY_LIMIT,
  UNSELECT_WITH_LIMIT,
} from './pizzaReducer'

const getTotal = (el: GetPizzaFieldsFragment) => {
  const { basePrice, toppings } = el
  const pricesOfToppings = toppings.map((item) => (item.defaultSelected ? item.topping.price : 0))
  const selectedToppingsTotalPrice = pricesOfToppings.reduce((total, amount) => total + amount)
  return (basePrice + selectedToppingsTotalPrice).toFixed(2)
}

const getInitialState = (initialPizza: GetPizzaFieldsFragment) => {
  const count = initialPizza.toppings.filter((item) => item.defaultSelected === true)
  const { name } = initialPizza
  const maxToppings = initialPizza.maxToppings === null
    ? initialPizza.maxToppings
    : initialPizza.maxToppings - count.length
  const { basePrice } = initialPizza
  const { toppings } = initialPizza
  return {
    count, name, maxToppings, basePrice, toppings,
  }
}

function PizzaItem({ el }: {el: GetPizzaFieldsFragment}) {
  const [state, dispatch] = useReducer(pizzaReducer, getInitialState(el))
  const { onAdd } = useOrder()

  const handleClick = (id: number) => {
    if (state.maxToppings === null) {
      dispatch({
        type: UNLIMITED_CHANGE,
        id,
      })
    }
    if (state.maxToppings! !== 0 && state.maxToppings!) {
      if (state.toppings[id].defaultSelected === false) {
        dispatch({
          type: SELECT_WITH_LIMIT,
          id,
        })
      } else {
        dispatch({
          type: UNSELECT_WITH_LIMIT,
          id,
        })
      }
    } else if (state.maxToppings! === 0) {
      if (state.toppings[id].defaultSelected === true) {
        dispatch({
          type: UNSELECT_WITH_EMPTY_LIMIT,
          id,
        })
      } else {
        dispatch({
          type: SELECT_WITH_EMPTY_LIMIT,
          id,
        })
      }
    }
  }

  const getOrderState = () => {
    const {
      name, toppings, maxToppings, basePrice,
    } = state
    return {
      name, toppings, maxToppings, basePrice,
    }
  }

  return (
    <div className={style.container}>
      <div className={style.title}>{state?.name}</div>
      <div className={style.tag_container}>
        {state
          ?.toppings
          .map((item, i) => <ToppingItem el={item} key={i} onClick={handleClick} id={i} />)}
      </div>
      <div className={style.title_container}>
        <div className={style.price}>
          $
          {getTotal(state)}
        </div>
        <div className={style.button} onClick={() => { onAdd(getOrderState()) }}>add to card</div>
      </div>
    </div>
  )
}

export default PizzaItem

import { useReducer } from 'react'
import { GetPizzaFieldsFragment } from '../../../generated/graphql'
import { pizzaReducer } from './pizzaReducer'

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

export const usePizza = (pizza: GetPizzaFieldsFragment) => {
  const [state, dispatch] = useReducer(pizzaReducer, getInitialState(pizza))

  return { state, dispatch }
}

import React, { useEffect, useState } from 'react'
import { useOrder } from '../../OrderContext'
import { pizzaSizes, pizzaToppingConnection } from '../interfaces'
import style from '../style.module.css'
import ToppingItem from '../ToppingItem'

const getTotal = (el: pizzaSizes) => {
  const { basePrice, toppings } = el
  const pricesOfToppings = toppings.map((item) => (item.defaultSelected ? item.topping.price : 0))
  const selectedToppingsTotalPrice = pricesOfToppings.reduce((total, amount) => total + amount)
  return (basePrice + selectedToppingsTotalPrice).toFixed(2)
}

function PizzaItem({ el }: {el: pizzaSizes}) {
  const [state, setState] = useState<pizzaSizes>(el)

  // this is the auxiliary array of selected toppings
  const [count, setCount] = useState<pizzaToppingConnection[]>([])

  const { onAdd } = useOrder()

  useEffect(() => {
    const count1 = el.toppings.filter((item) => item.defaultSelected === true)
    setCount(count1)
    setState({
      ...state,
      maxToppings: state.maxToppings === null
        ? state.maxToppings
        : state.maxToppings - count1.length,
    })
  }, [])

  const handleClick = (id: number) => {
    // if maxToppings is null then the number of toppings is unlimited
    if (state.maxToppings === null) {
      const newTopings = state?.toppings.map((item, i) => {
        if (i === id) {
          return {
            ...item,
            defaultSelected: !item.defaultSelected,
          }
        }
        return item
      })
      setState({
        ...state,
        toppings: newTopings,
      })
    }

    // this is a functional for a limited number of toppings
    if (state.maxToppings! !== 0 && state.maxToppings!) {
      // if a clicked topping is not selected, it can be selected,
      // the number of topping that can be selected decreases
      if (state.toppings[id].defaultSelected === false) {
        setState({
          ...state,
          maxToppings: state.maxToppings - 1,
          toppings: state?.toppings.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                defaultSelected: !item.defaultSelected,
              }
            }
            return item
          }),
        })

        // at this stage, this selected topping is added to end of array
        // this is necessary to track the order of addition,
        // in order to turn off the selected toppings one by one,
        // if you need to select a topping, and the number has reached the limit
        setCount([...count, state.toppings[id]])

        // if a clicked topping is selected, it can be unselected,
        // the number of topping that can be selected increases
      } else {
        setState({
          ...state,
          maxToppings: state.maxToppings + 1,
          toppings: state?.toppings.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                defaultSelected: !item.defaultSelected,
              }
            }
            return item
          }),
        })
        // at this stage, this unselected topping is removed from array
        setCount(count!.filter((item) => item.topping.name !== state.toppings[id].topping.name))
      }

      // if the maxToppings count has reached the limit then this part will be executed
    } else if (state.maxToppings! === 0) {
      // if a clicked topping is selected, it can be unselected,
      // the number of topping that can be selected increases
      if (state.toppings[id].defaultSelected === true) {
        setState({
          ...state,
          maxToppings: state.maxToppings + 1,
          toppings: state?.toppings.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                defaultSelected: !item.defaultSelected,
              }
            }
            return item
          }),
        })
        // at this stage, this unselected topping is removed from array
        setCount(count!.filter((item) => item.topping.name !== state.toppings[id].topping.name))

        // if a clicked topping is not selected, it can be selected
      } else {
        const newTopings = state?.toppings.map((item, i) => {
          if (i === id) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            }
          }
          return item
          // the number of selected toppings is limited,
          // because of this, the first enabled topping will be unselected
        }).map((item) => {
          // here we compare each element with the
          // first element of the array to find and unselect it
          if (item.topping.name === count![0].topping.name) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            }
          }
          return item
        })
        setState({
          ...state,
          toppings: newTopings,
        })
        // since the maxToppings has reached the limit,
        // and the first element was unselected
        // the first added element will be removed from the array
        const add = [...count]
        add.push(state.toppings[id])
        add.splice(0, 1)
        setCount(add)
      }
    }
  }

  return (
    <div className={style.container}>
      <div className={style.title}>{state?.name}</div>
      <div className={style.tag_container}>
        {state?.toppings.map((item, i) => <ToppingItem el={item} key={i} onClick={handleClick} id={i} />)}
      </div>
      <div className={style.title_container}>
        <div className={style.price}>
          $
          {getTotal(state)}
        </div>
        <div className={style.button} onClick={() => { onAdd(state) }}>add to card</div>
      </div>
    </div>
  )
}

export default PizzaItem

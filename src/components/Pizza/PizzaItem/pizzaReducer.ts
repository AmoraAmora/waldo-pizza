import { pizzaToppingConnection } from '../interfaces'

export const UNLIMITED_CHANGE: 'UNLIMITED_CHANGE' = 'UNLIMITED_CHANGE'
export const UNSELECT_WITH_LIMIT: 'UNSELECT_WITH_LIMIT' = 'UNSELECT_WITH_LIMIT'
export const SELECT_WITH_LIMIT: 'SELECT_WITH_LIMIT' = 'SELECT_WITH_LIMIT'
export const UNSELECT_WITH_EMPTY_LIMIT: 'UNSELECT_WITH_EMPTY_LIMIT' = 'UNSELECT_WITH_EMPTY_LIMIT'
export const SELECT_WITH_EMPTY_LIMIT: 'SELECT_WITH_EMPTY_LIMIT' = 'SELECT_WITH_EMPTY_LIMIT'

interface IState {
    name: string
    maxToppings: number
    basePrice: number
    toppings: pizzaToppingConnection[]
    count: pizzaToppingConnection[]
}

interface IAction {
    type: string
    id: number
}

export const pizzaReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case UNLIMITED_CHANGE: {
      const newTopings = state?.toppings.map((item, i) => {
        if (i === action.id) {
          return {
            ...item,
            defaultSelected: !item.defaultSelected,
          }
        }
        return item
      })

      return {
        ...state,
        toppings: newTopings,
        count: [...state.count, state.toppings[action.id]],
      } }

    case SELECT_WITH_LIMIT: {
      return {
        ...state,
        maxToppings: state.maxToppings! - 1,
        toppings: state?.toppings.map((item, i) => {
          if (i === action.id) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            }
          }
          return item
        }),
        count: [...state.count, state.toppings[action.id]],
      }
    }

    case UNSELECT_WITH_LIMIT: {
      return {
        ...state,
        maxToppings: state.maxToppings! + 1,
        toppings: state?.toppings.map((item, i) => {
          if (i === action.id) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            }
          }
          return item
        }),
        count: state
          .count!
          .filter((item) => item.topping.name !== state.toppings[action.id].topping.name),
      }
    }

    case UNSELECT_WITH_EMPTY_LIMIT: {
      return {
        ...state,
        maxToppings: state.maxToppings! + 1,
        toppings: state?.toppings.map((item, i) => {
          if (i === action.id) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            }
          }
          return item
        }),
        count: state
          .count!
          .filter((item) => item.topping.name !== state.toppings[action.id].topping.name),
      }
    }

    case SELECT_WITH_EMPTY_LIMIT: {
      const newTopings = state?.toppings.map((item, i) => {
        if (i === action.id) {
          return {
            ...item,
            defaultSelected: !item.defaultSelected,
          }
        }
        return item
      }).map((item) => {
        if (item.topping.name === state.count![0].topping.name) {
          return {
            ...item,
            defaultSelected: !item.defaultSelected,
          }
        }
        return item
      })
      const add = [...state.count]
      add.push(state.toppings[action.id])
      add.splice(0, 1)
      return {
        ...state,
        toppings: newTopings,
        count: add,
      }
    }

    default: return state
  }
}

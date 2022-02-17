import { gql } from '@apollo/client'

export const GET_PIZZA = gql`
  query getPizza {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }
`
/* eslint-disable no-unused-vars */
import { GetToppingsFieldsFragment } from '../../../generated/graphql'

export interface ToppingItemProps {
    toppingData: GetToppingsFieldsFragment
    onClick: ((i: number) => void)
    id: number
}

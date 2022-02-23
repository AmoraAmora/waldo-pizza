/* eslint-disable no-unused-vars */
import { GetToppingsFieldsFragment } from '../../../generated/graphql'

export interface ToppingItemProps {
    el: GetToppingsFieldsFragment
    onClick: ((i: number) => void)
    id: number
}

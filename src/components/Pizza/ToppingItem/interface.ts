/* eslint-disable no-unused-vars */
import { pizzaToppingConnection } from '../interfaces'

export interface ToppingItemProps {
    el: pizzaToppingConnection
    onClick: ((i: number) => void)
    id: number
}

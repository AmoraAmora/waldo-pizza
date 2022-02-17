import React, { useState } from "react"
import { pizzaSizes, pizzaToppingConnection } from "../interfaces"
import style from "../style.module.css"
import ToppingItem from "../ToppingItem"

const PizzaItem = ({el}: {el: pizzaSizes}) => {
    const [state, setState] = useState<pizzaSizes>(el)
    const [count, setCount] = useState<pizzaToppingConnection[]>([])
    useState(()=>{
        const count1 = el.toppings.filter((el) => el.defaultSelected === true)
        setCount(el.toppings.filter((el) => el.defaultSelected === true))
        setState({...state, maxToppings: state.maxToppings === null ? state.maxToppings : state.maxToppings  - count1.length})
    // @ts-ignore
    }, [])
    console.log(count, state.maxToppings)
    const click = (id: number) => {
        if (state.maxToppings === null) {
            const newTopings = state?.toppings.map((item, i) => {
                if (i === id) {
                    return {
                        ...item,
                        defaultSelected: !item.defaultSelected
                    }
                }
                return item
            })
            setState({...state,
                toppings: newTopings
            })
        }
        if(state.maxToppings! !== 0 && state.maxToppings!){
            if (state.toppings[id].defaultSelected === false) {
                setState({...state,
                    maxToppings: state.maxToppings - 1,
                    toppings: state?.toppings.map((item, i) => {
                        if (i === id) {
                            return {
                                ...item,
                                defaultSelected: !item.defaultSelected
                            }
                        }
                        return item
                    })
                })
                setCount([...count, state.toppings[id]])
            } else
            {
                setState({...state,
                    maxToppings: state.maxToppings + 1,
                    toppings: state?.toppings.map((item, i) => {
                        if (i === id ) {
                            return {
                                ...item,
                                defaultSelected: !item.defaultSelected
                            }
                        }
                        return item
                    })
                })
                setCount(count!.filter((el) => el.topping.name !== state.toppings[id].topping.name))
            } 
        }
        else if (state.maxToppings! === 0) {
            if (state.toppings[id].defaultSelected === true) {
                setState({...state,
                    maxToppings: state.maxToppings + 1,
                    toppings: state?.toppings.map((item, i) => {
                        if (i === id) {
                            return {
                                ...item,
                                defaultSelected: !item.defaultSelected
                            }
                        }
                        return item
                    })
                })
                setCount(count!.filter((el) => el.topping.name !== state.toppings[id].topping.name))
            } else
            {
                const newTopings = state?.toppings.map((item, i) => {
                    if (i === id ) {
                        return {
                            ...item,
                            defaultSelected: !item.defaultSelected
                        }
                    }
                    return item
                }).map((item, i) => {
                    if (item.topping.name === count![0].topping.name) {
                        setCount(count.splice(0,1))
                        return {
                            ...item,
                            defaultSelected: !item.defaultSelected
                        }
                    }
                    return item
                })
                setState({...state,
                    toppings: newTopings
                })
                setCount([...count, state.toppings[id]])
            }
        }
    }
    return (
        <div className={style.container}>
            <div className={style.title}>{state?.name}</div>
            <div className={style.tag_container}>
            {state?.toppings.map((el,i)=>{
                return <ToppingItem el={el} key={i} onClick={click} id={i}/>
            })}
            </div>
            <div className={style.title_container}>
                <div className={style.price}>${(state?.basePrice + state.toppings.map((el)=>el.defaultSelected ? el.topping.price : 0).reduce((total, amount) => total + amount)).toFixed(2)}</div>
                <div className={style.price}>add to card</div>
            </div>
        </div>
    )
}

export default PizzaItem
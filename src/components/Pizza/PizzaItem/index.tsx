import React, { useState } from 'react';
import { useOrder } from '../../OrderContext';
import { pizzaSizes, pizzaToppingConnection } from '../interfaces';
import style from '../style.module.css';
import ToppingItem from '../ToppingItem';

const getTotal = (el: pizzaSizes) => {
  const { basePrice, toppings } = el;
  const pricesOfToppings = toppings.map((item) => (item.defaultSelected ? item.topping.price : 0));
  const selectedToppingsTotalPrice = pricesOfToppings.reduce((total, amount) => total + amount);
  return (basePrice + selectedToppingsTotalPrice).toFixed(2);
};

function PizzaItem({ el }: {el: pizzaSizes}) {
  const [state, setState] = useState<pizzaSizes>(el);
  const [count, setCount] = useState<pizzaToppingConnection[]>([]);
  const { onAdd } = useOrder();
  useState(() => {
    const count1 = el.toppings.filter((item) => item.defaultSelected === true);
    setCount(count1);
    setState({
      ...state,
      maxToppings: state.maxToppings === null
        ? state.maxToppings
        : state.maxToppings - count1.length,
    });
    // @ts-ignore
  }, []);

  const click = (id: number) => {
    if (state.maxToppings === null) {
      const newTopings = state?.toppings.map((item, i) => {
        if (i === id) {
          return {
            ...item,
            defaultSelected: !item.defaultSelected,
          };
        }
        return item;
      });
      setState({
        ...state,
        toppings: newTopings,
      });
    }
    if (state.maxToppings! !== 0 && state.maxToppings!) {
      if (state.toppings[id].defaultSelected === false) {
        setState({
          ...state,
          maxToppings: state.maxToppings - 1,
          toppings: state?.toppings.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                defaultSelected: !item.defaultSelected,
              };
            }
            return item;
          }),
        });
        setCount([...count, state.toppings[id]]);
      } else {
        setState({
          ...state,
          maxToppings: state.maxToppings + 1,
          toppings: state?.toppings.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                defaultSelected: !item.defaultSelected,
              };
            }
            return item;
          }),
        });
        setCount(count!.filter((item) => item.topping.name !== state.toppings[id].topping.name));
      }
    } else if (state.maxToppings! === 0) {
      if (state.toppings[id].defaultSelected === true) {
        setState({
          ...state,
          maxToppings: state.maxToppings + 1,
          toppings: state?.toppings.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                defaultSelected: !item.defaultSelected,
              };
            }
            return item;
          }),
        });
        setCount(count!.filter((item) => item.topping.name !== state.toppings[id].topping.name));
      } else {
        const newTopings = state?.toppings.map((item, i) => {
          if (i === id) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            };
          }
          return item;
        }).map((item) => {
          if (item.topping.name === count![0].topping.name) {
            return {
              ...item,
              defaultSelected: !item.defaultSelected,
            };
          }
          return item;
        });
        setState({
          ...state,
          toppings: newTopings,
        });
        const add = [...count];
        add.push(state.toppings[id]);
        add.splice(0, 1);
        setCount(add);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>{state?.name}</div>
      <div className={style.tag_container}>
        {state?.toppings.map((item, i) => <ToppingItem el={item} key={i} onClick={click} id={i} />)}
      </div>
      <div className={style.title_container}>
        <div className={style.price}>
          $
          {getTotal(state)}
        </div>
        <div className={style.button} onClick={() => { onAdd(state); }}>add to card</div>
      </div>
    </div>
  );
}

export default PizzaItem;

import React from 'react';
import Cart from '../Cart';
import { OrderProvider } from '../OrderContext';
import Pizzas from '../Pizza';
import style from'./style.module.css';

function App() {
  return (
    <div className={style.app}>
      <OrderProvider>
        <div className={style.left}>
          <span className={style.title}>Make your own pizza</span>
          <Pizzas/>
        </div>
        <div className={style.right}>
          <span className={style.title2}>Your Pizza Cart</span>
          <Cart/>
        </div>
      </OrderProvider>
    </div>
  );
}

export default App;

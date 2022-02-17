import React from 'react';
import Pizzas from '../Pizza';
import style from'./style.module.css';

function App() {
  return (
    <div className={style.app}>
      <div className={style.left}>
        <Pizzas/>
      </div>
      <div className={style.right}></div>
    </div>
  );
}

export default App;

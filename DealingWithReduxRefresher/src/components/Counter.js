import classes from './Counter.module.css';
//Allows to select a part of our state managed in the store
import {useSelector, useDispatch} from 'react-redux'

import { counterActions } from '../store/counter';

const Counter = () => {
  //gets the state that handles the counter
  //so currently the value should display 0
  const counter = useSelector(state => state.counter.counter)

  const showCounter = useSelector(state => state.counter.toggled )

  //this will dispatch an action that we have in our store
  const dispatch = useDispatch();

  const incrementHandler = () => {
      dispatch(counterActions.increment())
  }

    const decrementHandler = () => {
      dispatch(counterActions.decrement())
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5))
  }


  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
            <button onClick={incrementHandler}> Increment</button>
            <button onClick={increaseHandler}> Increase by 5</button>
            <button onClick={decrementHandler}> Decrement</button>       
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

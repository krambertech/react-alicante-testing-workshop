import { useState } from 'react';

function Counter({ min = 0, max = 10}) {
  const [count, setCount] = useState(min);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <button aria-label="decrement" onClick={handleDecrement} disabled={count <= min}>-</button>
      <span>Count: {count}</span>
      <button aria-label="increment" onClick={handleIncrement} disabled={count >= max}>+</button>
    </div>
  );
}

export default Counter;

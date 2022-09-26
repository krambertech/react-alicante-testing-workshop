import { useState } from "react";

export default function Counter({ min = 0, max = 10 }) {
  const [count, setCount] = useState(min);

  return (
    <div>
      <h3>Counter</h3>
      <button
        aria-label="decrement"
        disabled={count <= min}
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      <span>Count: {count}</span>
      <button
        aria-label="increment"
        disabled={count >= max}
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}

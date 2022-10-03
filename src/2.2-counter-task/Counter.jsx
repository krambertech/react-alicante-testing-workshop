import { useEffect, useState } from "react";

export default function Counter({ initialValue = 0, min, max }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <h3>Counter</h3>
      <button disabled={count === min} aria-label="decrement" onClick={() => setCount(count - 1)}>
        -
      </button>
      <span>Count: {count}</span>
      <button disabled={count === max} aria-label="increment" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

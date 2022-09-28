import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Counter</h3>
      <button aria-label="decrement" onClick={() => setCount(count - 1)}>
        -
      </button>
      <span>Count: {count}</span>
      <button aria-label="increment" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

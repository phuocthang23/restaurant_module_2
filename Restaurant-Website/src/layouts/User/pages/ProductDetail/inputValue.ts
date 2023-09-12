import { useState } from "react";

export const CounterComponent = () => {
  const [count, setCount] = useState(1);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  return count;
};

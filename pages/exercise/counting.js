import { useState } from "react";

/*┌───────────────────────────────────────────────┒
  │  useState 사용예                              ┃
  ┕━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛*/

export default function CountingEx() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Hello {counter}</h1>
      <button onClick={() => setCounter((i) => i + 1)}>+</button>
    </div>
  );
}

import { useState } from "react";

function DynamicComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          console.log("click");
          setCount((count) => count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}

export default DynamicComponent;

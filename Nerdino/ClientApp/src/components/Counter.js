import React, { useState } from "react";

function Counter() {
  const [currentCount, setCurrentCount] = useState(0);

  return (
    <div>
      <h1>Simple Counter</h1>
      <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>
      <div className="row d-flex justify-content-start">
        <button disabled={currentCount >= 10} className={"btn btn-primary m-2 " + (currentCount >= 9 ? 'btnDisabled' : '')} onClick={() => setCurrentCount(currentCount + 1)}>
            Increment
        </button>
        <button disabled={currentCount <= 0} className={"btn btn-primary m-2 " + (currentCount <= 0 ? 'btnDisabled' : '')} onClick={() => setCurrentCount(currentCount - 1)}>
            Decrement
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setCurrentCount(0)}>
            Reset
        </button>
        </div>
    </div>
  );
}

export default Counter;

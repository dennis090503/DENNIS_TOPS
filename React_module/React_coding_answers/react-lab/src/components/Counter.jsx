import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  const reset = () => {
    setCount(0);
  };
  
  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <h2>Counter Example</h2>
      <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>{count}</p>
      <div>
        <button 
          onClick={decrement} 
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          - Decrement
        </button>
        <button 
          onClick={reset} 
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Reset
        </button>
        <button 
          onClick={increment} 
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          + Increment
        </button>
      </div>
      <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        Click the buttons to change the counter value
      </p>
    </div>
  );
}

export default Counter;
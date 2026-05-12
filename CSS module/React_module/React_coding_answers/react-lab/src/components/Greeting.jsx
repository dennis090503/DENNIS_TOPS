import React from 'react';

function Greeting({ name }) {
  return (
    <div className="greeting-card" style={{
      padding: '15px',
      margin: '10px',
      backgroundColor: '#e3f2fd',
      borderRadius: '8px',
      borderLeft: '4px solid #2196f3'
    }}>
      <h2>Hello, {name}!</h2>
      <p>Welcome to React components tutorial.</p>
      <p>This is a functional component that receives props.</p>
    </div>
  );
}

export default Greeting;
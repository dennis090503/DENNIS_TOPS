import React, { useState } from 'react';

function ButtonToggle() {
  const [buttonText, setButtonText] = useState('Not Clicked');
  
  const handleClick = () => {
    setButtonText('Clicked!');
  };
  
  const handleReset = () => {
    setButtonText('Not Clicked');
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <h3>Event Handling Demo: Button Click</h3>
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginRight: '10px'
        }}
      >
        {buttonText}
      </button>
      <button 
        onClick={handleReset}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Reset
      </button>
      <p style={{ marginTop: '15px' }}>
        Current status: <strong>{buttonText}</strong>
      </p>
    </div>
  );
}

export default ButtonToggle;
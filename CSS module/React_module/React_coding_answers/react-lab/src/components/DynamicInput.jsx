import React, { useState } from 'react';

function DynamicInput() {
  const [inputValue, setInputValue] = useState('');
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const clearInput = () => {
    setInputValue('');
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e8eaf6',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <h3>Event Handling Demo: Dynamic Input</h3>
      <div>
        <label htmlFor="dynamicInput">Type something: </label>
        <input
          id="dynamicInput"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Start typing..."
          style={{
            padding: '8px',
            fontSize: '14px',
            width: '200px',
            marginLeft: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={clearInput}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Clear
        </button>
      </div>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
        <p><strong>You typed:</strong> {inputValue || '(nothing yet)'}</p>
        <p><strong>Character count:</strong> {inputValue.length}</p>
      </div>
    </div>
  );
}

export default DynamicInput;
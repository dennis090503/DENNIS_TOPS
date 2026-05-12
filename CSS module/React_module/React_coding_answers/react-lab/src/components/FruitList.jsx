import React from 'react';

function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes', 'Strawberry', 'Watermelon', 'Kiwi'];
  
  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#fff8e1',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <h3>List Demo: Fruit List</h3>
      <p>We have {fruits.length} delicious fruits:</p>
      <ul style={{ 
        listStyleType: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px'
      }}>
        {fruits.map((fruit, index) => (
          <li key={index} style={{
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #ffe0b2',
            textAlign: 'center'
          }}>
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;
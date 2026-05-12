import React from 'react';

function UserCard({ name, age, location, email, isActive }) {
  return (
    <div className="user-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      backgroundColor: isActive ? '#e8f5e9' : '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '250px',
      display: 'inline-block',
      verticalAlign: 'top'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{name}</h3>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Status:</strong> 
        <span style={{ color: isActive ? '#4caf50' : '#f44336' }}>
          {isActive ? ' Active User' : ' Inactive User'}
        </span>
      </p>
    </div>
  );
}

export default UserCard;
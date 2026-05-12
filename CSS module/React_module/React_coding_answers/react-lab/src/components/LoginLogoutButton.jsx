import React, { useState } from 'react';

function LoginLogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('Guest User');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      margin: '10px',
      textAlign: 'center'
    }}>
      <h3>Conditional Rendering: Login/Logout</h3>
      
      {isLoggedIn ? (
        <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px' }}>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            Welcome back, {username}! You are logged in.
          </p>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#ffebee', padding: '15px', borderRadius: '8px' }}>
          <p style={{ fontSize: '18px', marginBottom: '15px' }}>
            Please log in to continue.
          </p>
          <button 
            onClick={handleLogin}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginLogoutButton;
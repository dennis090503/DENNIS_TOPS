import React from 'react';

function UserList() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', department: 'Sales' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', department: 'IT' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', department: 'HR' }
  ];
  
  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f3e5f5',
      borderRadius: '8px',
     
    }}>
      <h3>List Demo: User List with Unique Keys</h3>
      <p>User count: {users.length}</p>
      
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#9c27b0', color: 'white' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Role</th>
            <th style={tableHeaderStyle}>Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{user.id}</td>
              <td style={tableCellStyle}>{user.name}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: user.role === 'Admin' ? '#ffeb3b' : '#e0e0e0',
                  fontSize: '12px'
                }}>
                  {user.role}
                </span>
              </td>
              <td style={tableCellStyle}>{user.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
  
    </div>
  );
}

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left'
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '10px'
};

export default UserList;
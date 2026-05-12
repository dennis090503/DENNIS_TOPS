import React, { Component } from 'react';

class WelcomeMessage extends Component {
  render() {
    return (
      <div className="welcome-card" style={{
        padding: '15px',
        margin: '10px',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        borderLeft: '4px solid #ff9800'
      }}>
        <h1>Welcome to React!</h1>
        <p>This is a class component example.</p>
        <p>Component type: {this.props.type || 'Standard'}</p>
        <p>Class components use the render() method and can have state.</p>
      </div>
    );
  }
}

export default WelcomeMessage;
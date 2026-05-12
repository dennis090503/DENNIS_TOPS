// src/App.jsx
import React, { useState } from 'react';
import './App.css';

// Import all your components
import Greeting from './components/Greeting';
import WelcomeMessage from './components/WelcomeMessage';
import UserCard from './components/UserCard';
import Counter from './components/Counter';
import ButtonToggle from './components/ButtonToggle';
import DynamicInput from './components/DynamicInput';
import LoginLogoutButton from './components/LoginLogoutButton';
import VotingEligibility from './components/VotingEligibility';
import FruitList from './components/FruitList';
import UserList from './components/UserList';
import RegistrationForm from './components/RegistrationForm';
import ValidatedForm from './components/ValidatedForm';

function App() {
  const [activeComponent, setActiveComponent] = useState('all');

  const components = {
    greeting: <Greeting name="John" />,
    welcome: <WelcomeMessage type="Class Component" />,
    usercard: (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <UserCard name="John Doe" age={25} location="New York" email="john@example.com" isActive={true} />
        <UserCard name="Jane Smith" age={30} location="Los Angeles" email="jane@example.com" isActive={false} />
      </div>
    ),
    counter: <Counter />,
    buttontoggle: <ButtonToggle />,
    dynamicinput: <DynamicInput />,
    loginlogout: <LoginLogoutButton />,
    voting: <VotingEligibility />,
    fruitlist: <FruitList />,
    userlist: <UserList />,
    registration: <RegistrationForm />,
    validated: <ValidatedForm />
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Module 7 - All Components</p>
      </header>

      <nav className="nav-links">
        <button onClick={() => setActiveComponent('greeting')}>Greeting</button>
        <button onClick={() => setActiveComponent('welcome')}>Welcome</button>
        <button onClick={() => setActiveComponent('usercard')}>User Card</button>
        <button onClick={() => setActiveComponent('counter')}>Counter</button>
        <button onClick={() => setActiveComponent('buttontoggle')}>Button Toggle</button>
        <button onClick={() => setActiveComponent('dynamicinput')}>Dynamic Input</button>
        <button onClick={() => setActiveComponent('loginlogout')}>Login/Logout</button>
        <button onClick={() => setActiveComponent('voting')}>Voting</button>
        <button onClick={() => setActiveComponent('fruitlist')}>Fruit List</button>
        <button onClick={() => setActiveComponent('userlist')}>User List</button>
        <button onClick={() => setActiveComponent('registration')}>Registration</button>
        <button onClick={() => setActiveComponent('validated')}>Validated Form</button>
      </nav>

      <main className="main-content">
        {activeComponent === 'all' ? (
          <div>
            <h2>All Components</h2>
            <div className="components-grid">
              {Object.entries(components).map(([key, component]) => (
                <div key={key} className="component-card">
                  <h3>{key}</h3>
                  {component}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="single-component">
            <h2>{activeComponent} Component</h2>
            {components[activeComponent]}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
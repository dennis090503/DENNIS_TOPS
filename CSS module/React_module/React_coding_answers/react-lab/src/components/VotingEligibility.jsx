import React, { useState } from 'react';

function VotingEligibility() {
  const [age, setAge] = useState('');
  const [submittedAge, setSubmittedAge] = useState(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const ageNum = parseInt(age);
    if (!isNaN(ageNum)) {
      setSubmittedAge(ageNum);
    }
  };
  
  const isEligible = submittedAge >= 18;
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '10px'
    }}>
      <h3>Conditional Rendering: Voting Eligibility</h3>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="age">Enter your age: </label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
          style={{ 
            padding: '8px', 
            marginLeft: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            marginLeft: '10px', 
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Check Eligibility
        </button>
      </form>
      
      {submittedAge !== null && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px'
        }}>
          {isEligible ? (
            <div style={{ color: '#4caf50' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                You are eligible to vote!
              </p>
              <p>You are {submittedAge} years old, which meets the voting requirement.</p>
            </div>
          ) : (
            <div style={{ color: '#f44336' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                You are not eligible to vote.
              </p>
              <p>You are {submittedAge} years old. You need to be 18 or older to vote.</p>
              <p>Come back when you turn 18!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VotingEligibility;
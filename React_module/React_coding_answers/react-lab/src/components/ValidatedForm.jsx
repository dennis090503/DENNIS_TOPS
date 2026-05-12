import React, { useState } from 'react';

function ValidatedForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateField = (name, value) => {
    switch(name) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address (e.g., name@domain.com)';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (value.length > 20) return 'Password must be less than 20 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return '';
      default:
        return '';
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };
  
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true
    });
    
    const error = validateField(name, formData[name]);
    setErrors({
      ...errors,
      [name]: error
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };
  
  const isFormValid = () => {
    return Object.values(errors).every(error => error === '') && 
           Object.values(formData).every(value => value !== '');
  };
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fff3e0',
      borderRadius: '8px',
      margin: '10px',
      maxWidth: '500px'
    }}>
      <h3>Validated Registration Form</h3>
      <p style={{ fontSize: '12px', color: '#666' }}>All fields are required with validation</p>
      
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...inputStyle,
              borderColor: touched.name && errors.name ? '#f44336' : 
                          touched.name && !errors.name ? '#4caf50' : '#ddd'
            }}
          />
          {touched.name && errors.name && (
            <p style={errorStyle}>{errors.name}</p>
          )}
          {touched.name && !errors.name && formData.name && (
            <p style={successStyle}>Valid name</p>
          )}
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...inputStyle,
              borderColor: touched.email && errors.email ? '#f44336' : 
                          touched.email && !errors.email ? '#4caf50' : '#ddd'
            }}
          />
          {touched.email && errors.email && (
            <p style={errorStyle}>{errors.email}</p>
          )}
          {touched.email && !errors.email && formData.email && (
            <p style={successStyle}>Valid email format</p>
          )}
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...inputStyle,
              borderColor: touched.password && errors.password ? '#f44336' : 
                          touched.password && !errors.password ? '#4caf50' : '#ddd'
            }}
          />
          {touched.password && errors.password && (
            <p style={errorStyle}>{errors.password}</p>
          )}
          {touched.password && !errors.password && formData.password && (
            <p style={successStyle}>Strong password</p>
          )}
        </div>
        
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isFormValid() ? '#4caf50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            fontSize: '16px'
          }}
          disabled={!isFormValid()}
        >
          Register
        </button>
      </form>
      
      {isSubmitted && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#4caf50',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          Registration successful!
        </div>
      )}
      
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Password Requirements:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>At least 6 characters long</li>
          <li>At most 20 characters long</li>
          <li>Contains at least one uppercase letter (A-Z)</li>
          <li>Contains at least one number (0-9)</li>
        </ul>
      </div>
    </div>
  );
}

const formGroupStyle = {
  marginBottom: '15px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  border: '2px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
  transition: 'borderColor 0.3s'
};

const errorStyle = {
  color: '#f44336',
  fontSize: '12px',
  marginTop: '5px',
  marginBottom: '0'
};

const successStyle = {
  color: '#4caf50',
  fontSize: '12px',
  marginTop: '5px',
  marginBottom: '0'
};

export default ValidatedForm;
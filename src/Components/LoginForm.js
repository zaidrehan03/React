import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setJwtToken } from './UtlisAuth';
import ipik from "../Images/ipik_logo.png";
import '../Styles/Login.css';
import { TextField, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
  
    if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email format');
      return;
    }
  
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Enter a valid password');
      return;
    }
  
    try {
      const response = await fetch(`http://18.197.21.71:8084/ipik/authentication/Authenticate?userEmail=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (data.jwttoken) {
        setJwtToken(data.jwttoken);
        onLoginSuccess(); // Call onLoginSuccess upon successful login
        navigate('/'); // Navigate to the dashboard or desired page
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage('Invalid credentials');
      }
      
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="image-container">
          <img src={ipik} alt="Company Logo" className="login-logo"/>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError && emailErrorMessage}
            className="login-input"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError && passwordErrorMessage}
            className="login-input"
          />
          <Button type="submit" variant="contained" color="primary" className="login-button">Login</Button>
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
  <Alert onClose={() => setSnackbarOpen(false)} severity="error">
    {snackbarMessage}
  </Alert>
</Snackbar>
      </div>
    </div>
  );
};  

export default Login;



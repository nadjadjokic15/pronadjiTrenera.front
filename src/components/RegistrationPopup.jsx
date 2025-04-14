import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';


const LoginPopup = ({ open, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      if (response.data.token) {
        sessionStorage.setItem('authToken', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        login(response.data.token, response.data.user);
        toast.success('Login successful!');
        if (onLoginSuccess) {
          onLoginSuccess(); 
        }
        if (onClose) {
          onClose(); 
        }
        navigate('/trainers'); 
      } else {
        toast.error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError(error?.response?.data?.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setError('');
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, padding: 3, backgroundColor: 'white', borderRadius: '8px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Typography variant="h6" gutterBottom align="center">
          Please Log In
        </Typography>

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Typography color="error" align="center">{error}</Typography>}

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            marginTop: 3,
            backgroundColor: "#b4ff43d2",
            '&:hover': { backgroundColor: "#8dbb0b" },
          }}
          disabled={loading || !email || !password}
        >
          Log In
        </Button>

        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" sx={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginPopup;



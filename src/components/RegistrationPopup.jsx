

import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, FormControl, Select, MenuItem, InputLabel, CircularProgress, Link } from '@mui/material';
import axios from 'axios'; 
import { useAuth } from '../context/AuthContext';

const LoginPopup = () => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [roles, setRoles] = useState([]);  
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  

  const handleClose = () => setOpen(false);
  
  const handleLogin = () => {
    login({ username });
    handleClose();
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/roles'); 
        setRoles(response.data); 
        setLoading(false); 
      } catch (err) {
        setError('Failed to fetch roles');
        setLoading(false); 
      }
    };

    fetchRoles(); 
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: '8px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" gutterBottom align="center">
          Please Log In
        </Typography>

        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={handleRoleChange}
            label="Role"
            disabled={loading} 
          >
            {roles?.map((role, index) => (
              <MenuItem key={index} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress />
          </Box>
        )}

        
        {error && <Typography color="error" align="center">{error}</Typography>}

        
        {selectedRole && !loading && <Typography align="center">You selected: {selectedRole}</Typography>}

        
        <Button 
          variant="contained" 
          onClick={handleLogin} 
          sx={{ marginTop: 2, backgroundColor:"#b4ff43d2"  }} 
          disabled={loading || !username || !password || !selectedRole}
        >
          Log In
        </Button>

        
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" sx={{ textDecoration: 'none' }}>
              SignUp
            </Link>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginPopup;

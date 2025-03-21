import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, FormControl, Select, MenuItem, InputLabel, CircularProgress } from '@mui/material';
import axios from 'axios'; 
import { useAuth } from '../context/AuthContext';

const RegistrationPopup = () => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [roles, setRoles] = useState([]);  
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  

  const handleClose = () => setOpen(false);
  
  const handleRegister = () => {
    
    login({ username });
    handleClose();
  };

  
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/roles'); 
        setRoles(response.data); 
        console.log(response.data);
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
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          top: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Please Register
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

        <FormControl fullWidth>
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


        {error && <Typography color="error">{error}</Typography>}

        
        {selectedRole && <Typography>You selected: {selectedRole}</Typography>}

        <Button variant="contained" onClick={handleRegister} sx={{ marginTop: 2 }}>
          Register
        </Button>
      </Box>
    </Modal>
  );
};

export default RegistrationPopup;

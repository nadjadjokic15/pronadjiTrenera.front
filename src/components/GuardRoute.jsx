import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegistrationPopup from './RegistrationPopup';

const GuardRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setPopupOpen(true); 
    }
  }, [isAuthenticated]); 

  
  if (isAuthenticated) {
    return element;
  }

  
  return (
    <>
      
      <RegistrationPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
    </>
  );
};

export default GuardRoute;

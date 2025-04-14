import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPopup from './RegistrationPopup';

const GuardRoute = ({ element, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();
  const [popupOpen, setPopupOpen] = useState(false);

  
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      setPopupOpen(true); 
    }
  }, [isAuthenticated, loading]);

  
  if (isAuthenticated) {
    return element;
  }

  
  return (
    <>
      {popupOpen && <LoginPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />}
    </>
  );
};


export default GuardRoute;

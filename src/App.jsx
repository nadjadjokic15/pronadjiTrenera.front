import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Treneri from './pages/Treneri';
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import GuardRoute from './components/GuardRoute';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import { ToastContainer } from 'react-toastify';
import Appointments from './pages/Appointments'


import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <Routes> 
            <Route path="/" element={<MainLayout />}> 
              <Route index element={<Home />} />
              
              
              <Route path="/trainers" element={<GuardRoute element={<Treneri />} />} />
              <Route path="/favorites" element={<GuardRoute element={<Favorites />} />} />
              
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="*" element={<div>404 - Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;

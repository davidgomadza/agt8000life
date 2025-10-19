import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import WalletPage from './pages/WalletPage';
import PurchasePage from './pages/PurchasePage';
import SendPage from './pages/SendPage';
import ReceivePage from './pages/ReceivePage';
import TransactionsPage from './pages/TransactionsPage';
import ProofPage from './pages/ProofPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TokenSalePage from './pages/TokenSalePage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('agt_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('agt_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agt_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
        <Route path="/auth" element={user ? <Navigate to="/wallet" /> : <AuthPage onLogin={handleLogin} />} />
        <Route path="/about" element={<AboutPage user={user} onLogout={handleLogout} />} />
        <Route path="/how-it-works" element={<HowItWorksPage user={user} onLogout={handleLogout} />} />
        <Route 
          path="/wallet" 
          element={user ? <WalletPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/purchase" 
          element={user ? <PurchasePage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/send" 
          element={user ? <SendPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/receive" 
          element={user ? <ReceivePage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/transactions" 
          element={user ? <TransactionsPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/proof" 
          element={user ? <ProofPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
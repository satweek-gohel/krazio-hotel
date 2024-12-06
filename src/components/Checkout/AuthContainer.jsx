import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';



export default function AuthContainer({ onAuthSuccess }) {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (data) => {
    // Implement login logic here
    console.log('Login:', data);
    onAuthSuccess();
  };

  const handleSignup = (data) => {
    // Implement signup logic here
    console.log('Signup:', data);
    onAuthSuccess();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      {showLogin ? (
        <LoginForm onSubmit={handleLogin} onSwitchToSignup={() => setShowLogin(false)} />
      ) : (
        <SignupForm onSubmit={handleSignup} onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}
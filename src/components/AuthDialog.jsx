import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginDialog from './LoginDialog';
import SignupDialog from './SignupDialog';

const AuthDialogsManager = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLoginDialog = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignupDialog = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeAllDialogs = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <div>
      <Button onClick={openLoginDialog} > {/**className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" */}
        Login
      </Button>
      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={closeAllDialogs} 
        onSignupClick={openSignupDialog} 
      />
      <SignupDialog 
        isOpen={isSignupOpen} 
        onClose={closeAllDialogs} 
        onLoginClick={openLoginDialog} 
      />
    </div>
  );
};

export default AuthDialogsManager;
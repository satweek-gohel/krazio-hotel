import { useState } from 'react';

export function useModals() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCheckoutAsGuestModalOpen, setIsCheckoutAsGuestModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  const openCheckoutAsGuestModal = () => {
    setIsCheckoutAsGuestModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
  };

  return {
    isLoginModalOpen,
    isSignUpModalOpen,
    isForgotPasswordModalOpen,
    isCheckoutAsGuestModalOpen,
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
    setIsForgotPasswordModalOpen,
    setIsCheckoutAsGuestModalOpen,
    openLoginModal,
    openSignUpModal,
    openForgotPasswordModal,
    openCheckoutAsGuestModal
  };
}
import { useState } from 'react';

export function useModals() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCheckoutAsGuestModalOpen, setIsCheckoutAsGuestModalOpen] = useState(false);
  const [isSignupSuccessModalOpen, setIsSignupSuccessModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
    setIsSignupSuccessModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
    setIsSignupSuccessModalOpen(false);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
    setIsSignupSuccessModalOpen(false);
  };

  const openCheckoutAsGuestModal = () => {
    setIsCheckoutAsGuestModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsSignupSuccessModalOpen(false);
  };

  const openSignupSuccessModal = () => {
    setIsSignupSuccessModalOpen(true);
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsCheckoutAsGuestModalOpen(false);
  };

  return {
    isLoginModalOpen,
    isSignUpModalOpen,
    isForgotPasswordModalOpen,
    isCheckoutAsGuestModalOpen,
    isSignupSuccessModalOpen,
    setIsLoginModalOpen,
    setIsSignUpModalOpen,
    setIsForgotPasswordModalOpen,
    setIsCheckoutAsGuestModalOpen,
    setIsSignupSuccessModalOpen,
    openLoginModal,
    openSignUpModal,
    openForgotPasswordModal,
    openCheckoutAsGuestModal,
    openSignupSuccessModal
  };
}
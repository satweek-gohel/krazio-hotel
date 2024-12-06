import React from 'react';
import LoginModal from '../../components/Comman/LoginModal';
import SignUpModal from '../Comman/SignUpModal';
import ForgotPasswordModal from '../Comman/ForgotPasswordModal';
import CheckoutAsGuestModal from '../Comman/CheckoutAsGuestModal';

function AuthModals({
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
}) {
  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignUpClick={openSignUpModal}
        onForgotPasswordClick={openForgotPasswordModal}
        onCheckoutAsGuestClick={openCheckoutAsGuestModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onLoginClick={openLoginModal}
      />
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
      <CheckoutAsGuestModal
        isOpen={isCheckoutAsGuestModalOpen}
        onClose={() => setIsCheckoutAsGuestModalOpen(false)}
        onLoginClick={openLoginModal}
      />
    </>
  );
}

export default AuthModals;
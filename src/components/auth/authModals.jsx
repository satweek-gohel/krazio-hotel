import React from 'react';
import LoginModal from '../Comman/LoginModal';
import SignUpModal from '../Comman/SignUpModal';
import SignupSuccessModal from '../Comman/SignupSyccessModal';
import ForgotPasswordModal from '../Comman/ForgotPasswordModal';
import CheckoutAsGuestModal from '../Comman/CheckoutAsGuestModal'
function AuthModals({
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
        onSignupSuccess={() => {
          setIsSignUpModalOpen(false);
          setIsSignupSuccessModalOpen(true);
        }}
      />
      <SignupSuccessModal
        isOpen={isSignupSuccessModalOpen}
        onClose={() => setIsSignupSuccessModalOpen(false)}
        onLoginClick={() => {
          setIsSignupSuccessModalOpen(false);
          openLoginModal();
        }}
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
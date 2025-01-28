import React from 'react';
import { useModals } from '../hooks/useModals';
import AuthModals from '../components/auth/authModals';


function AuthPage() {
  const modalProps = useModals();

  return (
    <div>
      {/* Your page content */}
      <AuthModals {...modalProps} />
    </div>
  );
}

export default AuthPage;
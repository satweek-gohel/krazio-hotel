import { useState } from 'react';
import { loginUser } from '../services/api/branchService';
import { checkoutasguest } from '../services/api/authService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await loginUser(email, password);
     
      if (response.STATUS === "1") {
      
        sessionStorage.setItem('token', response.RESULT.token);
        sessionStorage.setItem('userDetails', JSON.stringify(response.RESULT.userDetails));
        sessionStorage.setItem('addresses', JSON.stringify(response.RESULT.addresses));
        
        return response.RESULT;
      } else {
        throw new Error(response.MESSAGE);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = async (first_name,last_name,email_address,password,mobile_number,date_of_birth,gender) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await checkoutasguest(first_name,last_name,email_address,password,mobile_number,date_of_birth,gender);
     
      if (response.STATUS === "1") {
      
        sessionStorage.setItem('token', response.RESULT.token);
        sessionStorage.setItem('userDetails', JSON.stringify(response.RESULT.userDetails));
        sessionStorage.setItem('addresses', JSON.stringify(response.RESULT.addresses || []));
        
        return response.RESULT;
      } else {
        throw new Error(response.MESSAGE);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login,loginAsGuest, isLoading, error };
};
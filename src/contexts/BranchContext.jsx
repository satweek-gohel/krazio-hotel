import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBranchDetails } from '../services/api/branchService';



const BranchContext = createContext(null);

export const BranchProvider= ({ children }) => {
  const [branchDetails, setBranchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranchData = async (restaurantId, branchId) => {
    if (!restaurantId || !branchId) return;

    setLoading(true);
    setError(null);

    try {
      const details = await getBranchDetails(restaurantId, branchId);
      setBranchDetails(details);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    branchDetails,
    loading,
    error,
    setBranchDetails,
    fetchBranchData
  };

  return (
    <BranchContext.Provider value={contextValue}>
      {children}
    </BranchContext.Provider>
  );
};

export const useBranchContext = () => {
  const context = useContext(BranchContext);
  
  if (!context) {
    throw new Error('useBranchContext must be used within a BranchProvider');
  }
  
  return context;
};
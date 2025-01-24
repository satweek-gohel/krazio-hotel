import { useEffect } from 'react';
import { useBranchContext } from '../contexts/BranchContext';

export const useBranchData = () => {
  const { fetchBranchData, branchDetails, loading, error } = useBranchContext();

  useEffect(() => {
    fetchBranchData(2, 3);
  }, []);

  return { branchDetails, loading, error };
};
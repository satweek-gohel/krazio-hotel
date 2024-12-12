import { useEffect } from 'react';
import { useBranchContext } from '../contexts/BranchContext';


export const useBranchData = (restaurantId, branchId) => {
  const { fetchBranchData, branchDetails, loading, error } = useBranchContext();

  useEffect(() => {
    if (restaurantId && branchId) {
      fetchBranchData(restaurantId, branchId);
    }
  }, [restaurantId, branchId]);

  return { branchDetails, loading, error };
};
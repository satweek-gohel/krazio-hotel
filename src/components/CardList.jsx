import React, { useEffect, useState } from 'react';
import BaseCard from '../components/Base/BaseCard';
import { useNavigate } from 'react-router-dom';
import { getBranches } from '../services/api/branchService';

const CardList = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranches();
        setBranches(data.branchDetails);
        console.log(data.branchDetails);
      } catch (error) {
        console.error('Failed to fetch branch data:', error);
      }
    };

    fetchBranches();
  }, []);

  const handlePickup = (restaurant) => {
    navigate(`/branch-menu/${restaurant.restaurant_id}/${restaurant.branch_id}`);
  };

  const handleDelivery = (restaurant) => {
    navigate(`/branch-menu/${restaurant.restaurant_id}/${restaurant.branch_id}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Title and Subtitle */}
      <div className="p-4 text-center">
        <h1 className="text-2xl font-semibold text-black-600"><span className='text-primary font-bold'>Hungry?</span> Let's Bring the Restaurant to You!</h1>
        <p className="text-sm text-gray-500">Explore the top dishes from local restaurants, delivered straight to your door.</p>
      </div>
      <div className="container flex align-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-3 lg:w-2/3 ">
          {branches.map((restaurant) => (
            <BaseCard
              key={restaurant.branch_id}
              name={restaurant.branch_name}
              address={restaurant.branch_street1 || '456 Pizza Avenue, Foodville, FV 67890'}
              hours={restaurant.branch_street2 || '10:00 AM - 12:00 AM'}
              onPickup={() => handlePickup(restaurant)}
              onDelivery={() => handleDelivery(restaurant)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
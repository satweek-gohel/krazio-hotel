import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBranches } from '../services/api/branchService';

const CardList = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranches();
        setBranches(data.branchDetails);
      } catch (error) {
        console.error('Failed to fetch branch data:', error);
      } finally {
        setLoading(false);
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

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-lg shadow-slate-300 overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="grid grid-cols-2 divide-x divide-gray-200 gap-4 p-3">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Regular Card Component
  const Card = ({ restaurant }) => (
    <div className="bg-white rounded-lg shadow-lg shadow-slate-300 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="img shadow-lg rounded-lg p-2">
            <img src="/res-icon.svg" alt="" className="w-8 h-8 shadow-lg rounded-lg"/>
          </div>
          <h2 className="text-lg font-bold uppercase text-black">{restaurant.branch_name}</h2>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <img src="/home-location-dark.svg" alt="" className="w-5 h-5"/>
          <p className="text-gray-600">{restaurant.branch_street1 || '456 Pizza Avenue, Foodville, FV 67890'}</p>
        </div>
        <div className="flex items-center gap-3">
          <img src="/home-time-dark.svg" alt="" className="w-5 h-5"/>
          <p className="text-gray-600">{restaurant.branch_street2 || '10:00 AM - 12:00 AM'}</p>
        </div>
      </div>
      <hr className="border-gray-200" />
      <div className="grid grid-cols-2 divide-x divide-gray-200 gap-4 p-3 rounded">
        <button 
          onClick={() => handlePickup(restaurant)}
          className="flex items-center justify-center gap-2 p-2 bg-primary text-white hover:bg-red-600 transition-colors rounded"
        >
          <span className="font-medium">Pickup</span>
        </button>
        <button 
          onClick={() => handleDelivery(restaurant)}
          className="flex items-center justify-center gap-2 p-2 bg-primary text-white hover:bg-red-600 transition-colors rounded"
        >
          <span className="font-medium">Delivery</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="p-4 text-center">
        <h1 className="text-2xl font-semibold text-black-600">
          <span className='text-primary font-bold'>Hungry?</span> Let's Bring the Restaurant to You!
        </h1>
        <p className="text-sm text-gray-500">
          Explore the top dishes from local restaurants, delivered straight to your door.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="container flex align-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-3 lg:w-2/3">
          {loading
            ? Array(4).fill(null).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            : branches.map((restaurant) => (
                <Card 
                  key={restaurant.branch_id} 
                  restaurant={restaurant}
                />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default CardList;
import React, { useEffect, useState } from 'react';
import BaseCard from '../components/Base/BaseCard';
import { useNavigate } from 'react-router-dom';
import { getBranches } from '../services/api/branchService';
const CardList = () => {
  const navigate = useNavigate();
const [branches, setBranches] = useState([]);
  useEffect(() => {
    const fetchBranches= async () => {
      try {
        const data = await getBranches(2);
       setBranches(data.branchDetails);
        console.log(data.branchDetails);
      } catch (error) {
        console.error('Failed to fetch branch data:', error);
      } finally {
        
      }
    };

    fetchBranches();
  }, []);
  const restaurantData = [
    {
      id: 1,
      name: "Sushi Home",
      address: "123 Sushi Street, Foodtown, FT 12345",
      hours: "9:00 AM - 10:00 PM",
    },
    {
      id: 2,
      name: "Pizza Palace",
      address: "456 Pizza Avenue, Foodville, FV 67890",
      hours: "11:00 AM - 11:00 PM",
    },
    {
      id: 3,
      name: "Burger Baron",
      address: "789 Burger Boulevard, Munchtown, MT 13579",
      hours: "10:00 AM - 12:00 AM",
    },
    {
        id: 4,
        name: "Burger Baron",
        address: "789 Burger Boulevard, Munchtown, MT 13579",
        hours: "10:00 AM - 12:00 AM",
      }
  ];

  const handlePickup = (name) => {
    console.log(`Pickup selected for ${name}`);
    navigate('/branch-menu');
  };

  const handleDelivery = (name) => {
    console.log(`Delivery selected for ${name}`);
    navigate('/branch-menu');
  };

  return (
    <div className="container mx-auto p-4">
         {/* Title and Subtitle */}
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-black-600"><span className='text-red-600 font-black'>Hungry?</span> Let's Bring the Restaurant to You!</h1>
        <p className="text-sm text-gray-500">Explore the top dishes from local restaurants, delivered straight to your door.</p>
      </div>
      <div className="cotainer flex align-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-3 lg:w-2/3 ">
  {branches.map((restaurant) => (
    <BaseCard
      key={restaurant.branch_id}
      name={restaurant.branch_name}
      address={restaurant.branch_street1 || '456 Pizza Avenue, Foodville, FV 67890'}
      hours={restaurant.branch_street2|| '10:00 AM - 12:00 AM' }
      onPickup={() => handlePickup(restaurant.name)}
      onDelivery={() => handleDelivery(restaurant.name)}
    />
  ))}
</div>
</div>

    </div>
  );
};

export default CardList;
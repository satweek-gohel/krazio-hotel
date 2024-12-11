import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getBranchDetails } from '../services/api/branchService';
import PromotionalSlider from '../components/Base/BasePromotionSlider';
import Category from '../components/Base/BaseCategory';
import CartSidebar from '../components/Cart/CartSidebar';
import BranchHeader from '../components/Branch/BranchHeader';
import MenuGrid from '../components/Menu/MenuGrid';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import ItemCustomizationModal from '../components/ItemCustomization/ItemCustomizationModal';
import { images2 } from '../components/Enumes/Enumes';
import RestaurantHeader from '../components/Branch/ResHeader';
import { useBranchContext } from '../contexts/BranchContext';

function BranchPage() {
  const { restaurantId , branchId} = useParams();
  console.log(branchId,restaurantId);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [RecommendedItems,setRecommendedItems] = useState([]);
  
  const { addItem } = useCart();
 
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const data = await getBranchDetails(restaurantId, branchId);
        setBranchData(data);
        
        // Transform and set categories
        const transformedCategories = data?.category_details.map(category => ({
          category_name: category.category_name,
          category_image: category.category_image || '/coffe.png',
          category_id: category.category_id 
        })) || [];
        
        // Filter recommended items
        const recommendedItems = data?.item_details.filter(
          item => item.is_recommended_item === "1"
        ) || [];
        
        setCategories(transformedCategories);
        setRecommendedItems(recommendedItems); // Assuming you have a state for recommended items
      } catch (error) {
        console.error('Failed to fetch branch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [restaurantId, branchId]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(prevCategory => 
      prevCategory?.category_id === category.category_id ? null : category
    );
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (customizedItem) => {
    addItem({
      ...customizedItem,
      id: customizedItem.item_id,
      item_name: customizedItem.item_name,
      price: customizedItem.price,
      item_image: customizedItem.item_image
    });
    setSelectedItem(null);
  };

  const filteredItems = selectedCategory
    ? branchData?.item_details.filter(item => item.category_id === selectedCategory.category_id)
    : branchData?.item_details;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-2 lg:px-20 py-8 lg:py-5 branch-page">
      <CartSidebar />

      <div className="base mt-20">
      <RestaurantHeader 
        name="SUSHI HOUSE"
        address="1901 Thornridge Cir, Shiloh, Hawaii 81063"
        hours="9:00AM - 10:00PM"
      />
      </div>
      
      <PromotionalSlider title="Deals For You" images={images2} />
      <div className="recmandtions mt-5">
        <div className="title">
      <BranchHeader branchName={'Top Recommendations'} />
      </div>
      <div className="items">
      <MenuGrid 
          items={RecommendedItems} 
          onAddToCart={handleItemClick}
        />
        </div>
        </div>
      
      {categories.length > 0 && (
        <Category 
          title="Food Categories" 
          categories={categories} 
          onSelect={handleCategorySelect} 
        />
      )}

      {branchData?.branch_details?.[0] && (
        <BranchHeader branchName={branchData.branch_details[0].branch_name} />
      )}

      {filteredItems && (
        <MenuGrid 
          items={filteredItems} 
          onAddToCart={handleItemClick}
        />
      )}

      <ItemCustomizationModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default BranchPage;
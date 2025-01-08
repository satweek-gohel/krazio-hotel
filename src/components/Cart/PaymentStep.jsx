import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';

const PaymentStep = ({ onNext }) => {
  const { setPaymentMethod, placeOrder } = useCart();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem('cart_items'));
        const restaurantId = cartItems[0].restaurant_id; // Adjust based on your local storage structure
        const branchId = cartItems[0].branch_id; // Adjust based on your local storage structure

        const response = await fetch('https://sandbox.vovpos.com:3002/web/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurant_id: restaurantId,
            branch_id: branchId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }

        const data = await response.json();
        if (data.STATUS === "1") {
          setPaymentMethods(data.RESULT);
        } else {
          setError(data.MESSAGE);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handlePaymentSelect = (methodId) => {
    setPaymentMethod(methodId);
  };

  const handlePlaceOrder = () => {
    const orderData = placeOrder();
    onNext();
  };

  if (loading) {
    return <div>Loading payment methods...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="par flex items-center justify-evenly mb-5">
          <div className="image">
            <img src="/payment-pick-drop.svg" alt="" />
          </div>
          <div className="bg-white">
            <div className="flex items-center justify-between">
              <span className="text-black font-bold">
                SUSHI HOUSE <span className="text-gray-600 font-medium">| Delivery in: 20 Mins</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black font-bold">
                Home<span className="text-gray-600 font-medium">| SG Highway, Ahmedabad, Gujarat, India</span>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.branch_payment_id} // Use a unique key from the API response
              onClick={() => handlePaymentSelect(method.payment_mode)} // Use payment_mode or reference_name as needed
              className="w-full p-4 border rounded-lg flex items-center gap-3 hover:border-red-500"
            >
              <img src={method.reference_name === "Cash" ? "/currency.svg" : method.reference_name === "Credit card" ? "/credit-card.svg" : "/gift-card.svg"} alt={method.reference_name} className="w-10 h-10 text-gray-400 shadow-lg border rounded p-2" />
              <span className="flex-1 text-left font-bold text-black">{method.reference_name}</span>
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            </button>
          ))}
        </div>
      </div>

      <div className="border-t p-4">
        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
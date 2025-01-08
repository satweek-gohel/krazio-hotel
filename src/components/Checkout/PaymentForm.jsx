import React, { useState, useEffect } from 'react';
import { Banknote, CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import PaymentOption from './PaymentOption';
import DeliveryInfo from './DeliveryInfo';

export default function PaymentForm({ onSubmit }) {
  const { setPaymentMethod, selectedAddress } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const address = selectedAddress.location_name + selectedAddress.address;
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const restaurantId = cartItems[0]?.restaurant_id;
  const branchId = cartItems[0]?.branch_id;

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('https://sandbox.vovpos.com:3002/web/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurant_id: restaurantId,
            branch_id: branchId
          })
        });

        const data = await response.json();
        
        if (data.STATUS === "1") {
          // Filter unique payment modes and active payments
          const uniqueMethods = data.RESULT.filter(
            (method, index, self) =>
              method.is_active === "1" &&
              index === self.findIndex(m => m.payment_mode === method.payment_mode)
          );
          setPaymentMethods(uniqueMethods);
        } else {
          setError('Failed to load payment methods');
        }
      } catch (err) {
        setError('Failed to fetch payment methods');
        console.error('Error fetching payment methods:', err);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId && branchId) {
      fetchPaymentMethods();
    }
  }, [restaurantId, branchId]);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentMethod({ method });
  };

  const getPaymentIcon = (paymentMode) => {
    switch (paymentMode.toLowerCase()) {
      case 'cash':
        return <Banknote className="w-6 h-6 text-green-500" />;
      case 'credit card':
        return <CreditCard className="w-6 h-6 text-blue-500" />;
      default:
        return <CreditCard className="w-6 h-6 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      
      <DeliveryInfo 
        restaurantName="SUSHI HOUSE"
        deliveryTime="20 Mins"
        address={address}
      />

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Select Your Payment Preference</h2>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <PaymentOption
              key={method.branch_payment_id}
              icon={getPaymentIcon(method.payment_mode)}
              label={method.reference_name}
              selected={selectedMethod === method.payment_mode}
              onClick={() => handleMethodSelect(method.payment_mode)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StepIndicator from './StepIndicator';
import AuthContainer from './AuthContainer';
import AddressStep from './AddressStep';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { userDetails, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNextStep = () => {
    if (!isAuthenticated && currentStep === 1) {
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return !isAuthenticated() ? (
          <AuthContainer onAuthSuccess={() => handleNextStep()} />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Logged in as {userDetails?.first_name}</p>
              <p className="text-gray-600">{userDetails?.email_address}</p>
            </div>
            <button
              onClick={handleNextStep}
              className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600"
            >
              Continue to Delivery
            </button>
          </div>
        );
      case 2:
        return (
          <AddressStep
            onAddNewAddress={handleNextStep}
            onNext={handleNextStep}
            onSelectAddress={handleNextStep}
          />
        );
      case 3:
        return <PaymentForm onSubmit={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      
      <div className="w-full mt-20" >
        
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 ">
          <div className="steps p-4">
          <StepIndicator currentStep={currentStep} />
          </div>
            <div className="rounded-lg p-7">
            
              {renderStepContent()}
            </div>
           

            <div className="flex justify-between p-10">
              {currentStep > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 p-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import StepIndicator from "./StepIndicator";

import AddressStep from './Address/AddressStep';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import AuthCard from './Auth/AuthContainer';
import { useCart } from '../../contexts/CartContext';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { userDetails, isAuthenticated } = useAuth();
  const navigate = useNavigate();
    const {items} = useCart();
    console.log(items)
  useEffect(() => {
    if (isAuthenticated()) {
      setCurrentStep(2); // Directly go to Address Step if authenticated
    }
  }, [isAuthenticated]);

  const handleNextStep = () => {
    if (!isAuthenticated() && currentStep === 1) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return !isAuthenticated() ? <AuthCard /> : null; // No need to show anything if authenticated and on step 1
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
      <div className="w-full mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 ">
            <div className="steps p-4 mt-5">
              <StepIndicator currentStep={currentStep} />
            </div>
            <div className="rounded-lg p-7">{renderStepContent()}</div>

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

          <div className="w-full lg:w-1/3 p-5 lg:me-20 mx-auto">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

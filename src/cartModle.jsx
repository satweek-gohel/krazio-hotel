import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    window.location.reload();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-8 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cart</h2>

        <p className="text-gray-600 mb-6">
          It looks like you have items in your cart. If you proceed, your cart
          will be emptied.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 p-3 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors rounded-lg shadow-md"
          >
            <span className="font-medium">Cancel</span>
          </button>

          <button
            onClick={handleClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 p-3 bg-primary text-white hover:bg-primary-dark transition-colors rounded-lg shadow-md"
          >
            <span className="font-medium">Ok</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;

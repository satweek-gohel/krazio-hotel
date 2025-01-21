import { X } from "lucide-react";

function CartModal({ isOpen, onClose, onOk }) {
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

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave Page?</h2>

        <p className="text-gray-600 mb-8">
          You have items in your cart. Going back will clear your cart. Do you want to proceed?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
          >
            Stay Here
          </button>
          <button
            onClick={onOk}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            Leave & Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
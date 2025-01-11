export default function AddressCard({
  address,
  onSelect,
  isSelectable = true,
}) {
  return (
    <div className="border rounded-lg p-3 hover:border-primary cursor-pointer">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{address.user_name}</h3>
            <span className="text-sm text-gray-500">
              {address.mobile_number}
            </span>
          </div>
          <p className="text-sm mt-1">
            {address.address}
            {address.street_1 && `, ${address.street_1}`}
            {address.street_2 && `, ${address.street_2}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {address.landmark && `Near ${address.landmark}, `}
            {address.city_name}, {address.state_name} {address.pincode}
          </p>
          {address.customer_notes && (
            <p className="text-xs text-gray-400 mt-1">
              Note: {address.customer_notes}
            </p>
          )}
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1">•••</button>
      </div>
      {isSelectable && (
        <button
          onClick={() => onSelect(address)}
          className="w-full mt-3 bg-primary text-white py-1.5 text-sm rounded-md hover:bg-red-700"
        >
          Deliver Here
        </button>
      )}
    </div>
  );
}

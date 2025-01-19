import React, { useState, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Search, Filter, MoreHorizontal, Loader } from 'lucide-react';

// Payment status badge component
const PaymentStatusBadge = ({ status }) => {
  const statusConfig = {
    1: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
    2: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    3: { bg: 'bg-red-100', text: 'text-red-800', label: 'Unpaid' }
  }[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
      {statusConfig.label}
    </span>
  );
};

// Order type badge component
const OrderTypeBadge = ({ type }) => {
  const typeConfig = {
    'Take Away Delivery Order': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'Dine In': { bg: 'bg-purple-100', text: 'text-purple-800' },
    'Take Away': { bg: 'bg-indigo-100', text: 'text-indigo-800' }
  }[type] || { bg: 'bg-gray-100', text: 'text-gray-800' };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
      {type}
    </span>
  );
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('order_id', {
    header: 'Order ID',
    cell: (info) => <span className="font-medium">#{info.getValue()}</span>,
  }),
  columnHelper.accessor('order_date', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('order_items', {
    header: 'Items',
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor('order_type', {
    header: 'Order Type',
    cell: (info) => <OrderTypeBadge type={info.getValue()} />,
  }),
  columnHelper.accessor('total_bill', {
    header: 'Total Bill',
    cell: (info) => (
      <span className="font-medium">${Number(info.getValue()).toFixed(2)}</span>
    ),
  }),
  columnHelper.accessor('payment_status', {
    header: 'Payment Status',
    cell: (info) => <PaymentStatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('session_id', {
    header: 'Session ID',
    cell: (info) => (
      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
        {info.getValue()}
      </span>
    ),
  }),
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');

      const response = await fetch('https://sandbox.vovpos.com:3002/web/getUserOrderDetails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          restaurant_id: 3,
          user_id: 3
        })
      });

      const data = await response.json();

      if (data.STATUS === "1") {
        setOrders(data.RESULT);
        setError(null);
      } else {
        setError(data.MESSAGE || 'Failed to fetch orders');
        setOrders([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = React.useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.order_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.order_items.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.session_id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filterType === 'all' || order.order_type === filterType;
      const matchesPaymentStatus = filterPaymentStatus === 'all' || 
        order.payment_status.toString() === filterPaymentStatus;

      return matchesSearch && matchesType && matchesPaymentStatus;
    });
  }, [orders, searchQuery, filterType, filterPaymentStatus]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto mt-[80px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <button 
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="Take Away Delivery Order">Take Away Delivery</option>
                      <option value="Dine In">Dine In</option>
                      <option value="Take Away">Take Away</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterPaymentStatus}
                      onChange={(e) => setFilterPaymentStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="1">Paid</option>
                      <option value="2">Pending</option>
                      <option value="3">Unpaid</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                    <th className="px-6 py-4"></th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 text-sm">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <button className="hover:bg-gray-100 p-1 rounded">
                          <MoreHorizontal className="h-5 w-5 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
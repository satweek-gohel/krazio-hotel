import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Search, Filter, MoreHorizontal } from 'lucide-react';



const data = [
  {
    items: 'Pizza, French Fries, Cold Drinks',
    date: '8/2/19',
    address: '6391 Elgin St. Celina, Delaware 10299',
    orderType: 'Delivery',
    amount: '$200',
    paymentType: 'Cash',
  },
  {
    items: 'Pizza, French Fries',
    date: '7/18/17',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
    orderType: 'Pick Up',
    amount: '$100',
    paymentType: 'Card',
  },
  {
    items: 'Pizza, French Fries',
    date: '1/28/17',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    orderType: 'Delivery',
    amount: '$150',
    paymentType: 'Card',
  },
  {
    items: 'Pizza, French Fries',
    date: '4/21/12',
    address: '3891 Ranchview Dr. Richardson, California 62639',
    orderType: 'Pick Up',
    amount: '$450',
    paymentType: 'Gift Card',
  },
  {
    items: 'Pizza, French Fries',
    date: '8/30/14',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    orderType: 'Pick Up',
    amount: '$250',
    paymentType: 'Cash',
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('items', {
    header: 'Items',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('orderType', {
    header: 'Order Type',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('paymentType', {
    header: 'Payment Type',
    cell: (info) => info.getValue(),
  }),
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-8">
          {['All', 'Pick Up', 'Delivery'].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search Orders"
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b last:border-b-0">
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
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <button
            className="flex items-center space-x-1 text-sm text-gray-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span>Prev</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {[1, 2, '...', 5, 6].map((page, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  page === 5 ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            className="flex items-center space-x-1 text-sm text-gray-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Card, Title, Button } from '@tremor/react';

const products = [
  { id: 1, name: 'Laptop Pro', stock: 23, price: 1299 },
  { id: 2, name: 'Wireless Mouse', stock: 45, price: 49 },
  { id: 3, name: 'HD Monitor', stock: 12, price: 299 },
];

function Navbar() {
  return (
    <nav className="bg-[#dc7cae] shadow-lg fixed w-full z-30 top-0 transition-transform hover:scale-[1.01] active:scale-105">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button className="lg:hidden mr-2">
              <Menu className="w-6 h-6 text-white" />
            </button>
            <span className="text-xl font-semibold text-white animate-pulse drop-shadow-[0_0_10px_#ffffff]">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex items-center mr-4 bg-white rounded-lg px-3 py-2 shadow-md border border-gray-300 focus-within:border-[#dc7cae] focus-within:ring-2 focus-within:ring-[#dc7cae] transition-transform hover:scale-[1.02] active:scale-105">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 w-48"
              />
            </div>
            <button className="p-2 relative">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ProductsTable() {
  return (
    <Card className="p-6 bg-white shadow-xl rounded-lg border border-gray-200 transition-transform duration-200 hover:scale-[1.02] active:scale-105">
      <div className="flex justify-between items-center mb-4">
        <Title className="text-lg font-semibold text-gray-800">Products Status</Title>
        <Button className="bg-[#dc7cae] text-white hover:bg-pink-700 transition duration-300 shadow-md">
          Restock Item
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition cursor-pointer hover:scale-[1.01] active:scale-105">
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.stock}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      product.stock > 20
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 20 ? 'In Stock' : 'Low Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export { Navbar, ProductsTable };
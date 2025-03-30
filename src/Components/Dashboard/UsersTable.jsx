import React, { useState } from 'react';
import { Card, Title } from '@tremor/react';
import UserOrdersModal from './UserOrdersModal';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, lastOrder: '2024-03-10' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, lastOrder: '2024-03-09' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 7, lastOrder: '2024-03-08' },
];

function UsersTable() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <Card>
        <Title>Recent Users</Title>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        View Orders
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      {selectedUser && <UserOrdersModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
}

export default UsersTable;  
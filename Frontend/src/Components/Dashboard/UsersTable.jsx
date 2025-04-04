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
      <style>
        {`
          .users-table {
            background: #f4f4f4; /* Light gray background */
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .users-table table {
            width: 100%;
            border-collapse: collapse;
            color: #333; /* Dark text for readability */
          }

          .users-table th, .users-table td {
            padding: 12px;
            text-align: left;
            font-size: 14px;
            border-bottom: 1px solid #ddd;
          }

          .users-table thead {
            background: #eaeaea; /* Slightly darker for contrast */
          }

          .users-table tbody tr {
            transition: background 0.3s ease;
          }

          .users-table tbody tr:hover {
            background: #dcdcdc; /* Light hover effect */
          }

          .view-orders-btn {
            padding: 6px 12px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 6px;
            transition: background 0.3s ease, transform 0.2s ease;
            background: #ff4d4d;
            color: white;
            cursor: pointer;
          }

          .view-orders-btn:hover {
            background: #e60000;
            transform: scale(1.05);
          }
        `}
      </style>

      <Card className="users-table">
        <Title className="text-gray-800 text-lg font-semibold">Recent Users</Title>
        <div className="mt-4 overflow-x-auto">
          <table>
            <thead>
              <tr className="text-gray-700 text-sm uppercase border-b border-gray-400">
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Last Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-gray-800">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.orders}</td>
                  <td>{user.lastOrder}</td>
                  <td>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="view-orders-btn"
                    >
                      View Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedUser && <UserOrdersModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
}

export default UsersTable;

import React from 'react';

function UserOrdersModal({ user, onClose }) {
  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }

          .modal-bg {
            backdrop-filter: blur(10px);
            background: rgba(0, 0, 0, 0.6);
          }

          .modal-container {
            animation: fadeIn 0.3s ease-out;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border-radius: 12px;
            padding: 20px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
          }

          .close-btn {
            transition: transform 0.2s ease, color 0.2s ease;
          }

          .close-btn:hover {
            transform: rotate(90deg);
            color: #ff4d4d;
          }

          .order-table th, .order-table td {
            padding: 12px;
            text-align: left;
            font-size: 14px;
          }

          .order-table tbody tr:hover {
            background: rgba(255, 255, 255, 0.1);
            transition: background 0.2s ease;
          }

          .status-badge {
            padding: 4px 8px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 6px;
            display: inline-block;
          }

          .status-delivered { background: #d1fadf; color: #256029; }
          .status-pending { background: #fff3cd; color: #856404; }
          .status-cancelled { background: #f8d7da; color: #721c24; }
        `}
      </style>

      <div className="fixed inset-0 flex items-center justify-center modal-bg z-50">
        <div className="modal-container mx-4 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Orders for <span className="text-blue-300">{user.name}</span>
            </h3>
            <button onClick={onClose} className="text-white close-btn text-xl">
              ✕
            </button>
          </div>

          {/* Order Table */}
          <div className="overflow-x-auto">
            <table className="order-table w-full text-white">
              <thead className="border-b border-gray-400">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>2024-03-10</td>
                  <td>₹299</td>
                  <td>
                    <span className="status-badge status-delivered">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>2024-03-15</td>
                  <td>₹450</td>
                  <td>
                    <span className="status-badge status-pending">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-003</td>
                  <td>2024-03-18</td>
                  <td>₹120</td>
                  <td>
                    <span className="status-badge status-cancelled">
                      Cancelled
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOrdersModal;

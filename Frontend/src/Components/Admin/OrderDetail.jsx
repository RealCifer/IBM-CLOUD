import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder, deleteProduct } = context;

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      {/* 🔥 Title */}
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-lg mb-6">
        🔥 All Orders
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white/60 backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-800">
              {[
                "S.No.", "Order ID", "Image", "Title", "Category", "Price", "Quantity",
                "Total", "Status", "Name", "Address", "Pincode", "Phone", "Email", "Date", "Action"
              ].map((heading, index) => (
                <th key={index} className="px-4 py-3 text-sm font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {getAllOrder.map((order, orderIndex) =>
              order.cartItems.map((item, index) => {
                const { id, productImageUrl, title, category, price, quantity } = item;
                return (
                  <tr key={index} className="border-t border-gray-200 hover:bg-pink-50 transition">
                    <td className="px-4 py-3">{orderIndex + 1}</td>
                    <td className="px-4 py-3">{id}</td>
                    <td className="px-4 py-3">
                      <img src={productImageUrl} alt="Product" className="w-12 h-12 object-cover rounded-lg shadow-md" />
                    </td>
                    <td className="px-4 py-3">{title}</td>
                    <td className="px-4 py-3">{category}</td>
                    <td className="px-4 py-3 text-green-600 font-bold">₹{price}</td>
                    <td className="px-4 py-3">{quantity}</td>
                    <td className="px-4 py-3 text-blue-600 font-bold">₹{price * quantity}</td>
                    <td className={`px-4 py-3 font-semibold ${order.status === "Delivered" ? "text-green-600" : "text-red-500"}`}>
                      {order.status}
                    </td>
                    <td className="px-4 py-3">{order.addressInfo.name}</td>
                    <td className="px-4 py-3">{order.addressInfo.address}</td>
                    <td className="px-4 py-3">{order.addressInfo.pincode}</td>
                    <td className="px-4 py-3">{order.addressInfo.mobileNumber}</td>
                    <td className="px-4 py-3">{order.email}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3 text-red-500 cursor-pointer hover:scale-105 transition transform" 
                      onClick={() => deleteProduct(order.id)}>
                      ❌ Delete
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderDetail;

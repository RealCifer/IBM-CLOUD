import { useContext } from "react";
import Layout from "../../Components/Layout/layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    console.log("UserDashboard Loaded"); // Debugging check

    // Get user from localStorage safely
    const storedUser = localStorage.getItem('users');
    const user = storedUser ? JSON.parse(storedUser) : {};

    // Get context
    const context = useContext(myContext);
    if (!context) {
        console.error("myContext is undefined");
        return <p>Error: Context not available</p>;
    }

    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* Top Section */}
                <div className="top">
                    <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
                        <div className="flex justify-center">
                            <img 
                                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" 
                                alt="User Avatar" 
                            />
                        </div>
                        <div className="text-center">
                            <h1 className="text-lg font-bold">Name: <span className="font-normal">{user?.name || "N/A"}</span></h1>
                            <h1 className="text-lg font-bold">Email: <span className="font-normal">{user?.email || "N/A"}</span></h1>
                            <h1 className="text-lg font-bold">Date: <span className="font-normal">{user?.date || "N/A"}</span></h1>
                            <h1 className="text-lg font-bold">Role: <span className="font-normal">{user?.role || "N/A"}</span></h1>
                        </div>
                    </div>
                </div>

                {/* Order Details Section */}
                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

                        {/* Loader */}
                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>

                        {/* Orders List */}
                        {getAllOrder && getAllOrder.length > 0 ? (
                            getAllOrder.filter(order => order.userid === user?.uid)?.map((order, index) => (
                                <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                                    {/* Order Info */}
                                    <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs p-8">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                            <div className="mb-4">
                                                <div className="text-sm font-semibold text-black">Order Id</div>
                                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-sm font-semibold">Date</div>
                                                <div className="text-sm font-medium text-gray-900">{order.date}</div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-sm font-semibold">Total Amount</div>
                                                <div className="text-sm font-medium text-gray-900">₹ {order.cartItems?.reduce((total, item) => total + item.price * item.quantity, 0)}</div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-sm font-semibold">Order Status</div>
                                                <div className="text-sm font-medium text-green-800 uppercase">{order.status}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ordered Items */}
                                    <div className="flex-1 p-8">
                                        <ul className="-my-7 divide-y divide-gray-200">
                                            {order.cartItems?.map((item, index) => (
                                                <li key={index} className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                    <div className="flex flex-1 items-stretch">
                                                        <div className="flex-shrink-0">
                                                            <img 
                                                                className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                src={item.productImageUrl}
                                                                alt={item.title}
                                                            />
                                                        </div>
                                                        <div className="ml-5 flex flex-col justify-between">
                                                            <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{item.category}</p>
                                                            <p className="mt-4 text-sm font-medium text-gray-500">x {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto flex flex-col items-end justify-between">
                                                        <p className="text-right text-sm font-bold text-gray-900">₹ {item.price}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-lg font-semibold mt-10">No orders found</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;

import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout/layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../Components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart!");
    };

    const handleIncrement = (id) => dispatch(incrementQuantity(id));
    const handleDecrement = (id) => dispatch(decrementQuantity(id));

    const cartItemTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short", day: "2-digit", year: "numeric",
        })
    });

    const buyNowFunction = () => {
        if (!addressInfo.name || !addressInfo.address || !addressInfo.pincode || !addressInfo.mobileNumber) {
            return toast.error("All Fields are required");
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short", day: "2-digit", year: "numeric",
            })
        };

        try {
            addDoc(collection(fireDB, 'order'), orderInfo);
            setAddressInfo({ name: "", address: "", pincode: "", mobileNumber: "" });
            toast.success("Order Placed Successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto max-w-7xl px-4 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-4xl font-extrabold text-gray-900">🛒 Shopping Cart</h1>

                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                        {/* Cart Items Section */}
                        <section className="rounded-lg bg-white p-6 shadow-lg lg:col-span-8">
                            {cartItems.length > 0 ? (
                                <ul role="list" className="divide-y divide-gray-200">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex items-center py-6">
                                            <img src={item.productImageUrl} alt="img"
                                                 className="h-28 w-28 rounded-lg object-cover border border-gray-300 shadow-md"/>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                                <p className="text-lg font-bold text-gray-900 mt-2">₹{item.price}</p>

                                                {/* Quantity & Remove Buttons */}
                                                <div className="mt-3 flex items-center space-x-4">
                                                    <button onClick={() => handleDecrement(item.id)}
                                                            className="px-3 py-1 text-lg font-bold border border-gray-400 rounded-md hover:bg-gray-200">-</button>
                                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                                    <button onClick={() => handleIncrement(item.id)}
                                                            className="px-3 py-1 text-lg font-bold border border-gray-400 rounded-md hover:bg-gray-200">+</button>

                                                    <button onClick={() => deleteCart(item)}
                                                            className="flex items-center space-x-1 px-3 py-1 text-sm text-red-500 font-semibold border border-red-500 rounded-md hover:bg-red-100">
                                                        <Trash size={16}/>
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10">
                                    <h2 className="text-2xl font-semibold text-gray-500">Your cart is empty 😔</h2>
                                    <p className="text-gray-400 mt-2">Start shopping to add items to your cart.</p>
                                </div>
                            )}
                        </section>

                        {/* Order Summary Section */}
                        <section className="mt-16 rounded-lg bg-white p-6 shadow-lg lg:col-span-4 lg:mt-0">
                            <h2 className="border-b border-gray-200 pb-3 text-xl font-semibold text-gray-900">
                                🏷️ Price Details
                            </h2>
                            <div className="space-y-4 py-6">
                                <div className="flex justify-between text-lg">
                                    <span>Items ({cartItemTotal})</span>
                                    <span className="font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-700 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-lg border-t pt-4 font-bold">
                                    <span>Total Amount</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <div className="flex justify-center">
                                {user ? (
                                    <BuyNowModal addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNowFunction={buyNowFunction}/>
                                ) : (
                                    <Navigate to={'/login'}/>
                                )}
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;

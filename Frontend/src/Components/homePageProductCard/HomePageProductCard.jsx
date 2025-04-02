import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import useMyStore from "../../context/myContext2";
import axios from "axios";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const [getAllProduct, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() { 
            try {
                const res = await axios.get("http://localhost:3000/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
    }, []);

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart!");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart!");
    };

    return (
        <div className="mt-24 px-5 relative font-[Poppins]"> 
            {/* Title */}
            <h1 className="text-center mb-5 pb-4 font-extrabold text-4xl text-gray-900 drop-shadow-lg animate-pulse">
                Our Best-Selling Products
            </h1>

            <section className="text-gray-600 body-font">
                <div className="container mx-auto px-5 py-5">
                    <div className="flex flex-wrap justify-center -m-4">
                        {getAllProduct.slice(0, 8).map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full bg-gray-100 border border-gray-300 rounded-xl overflow-hidden 
                                                    shadow-lg cursor-pointer transition-transform duration-300 ease-in-out 
                                                    hover:scale-105 hover:shadow-2xl">
                                        <img
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="lg:h-80 h-96 w-full object-cover transform transition-transform duration-300 hover:scale-110"
                                            src={productImageUrl}
                                            alt={title}
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs font-medium text-gray-500 uppercase">
                                                Cloud-Store
                                            </h2>
                                            
                                            {/* Stylish Product Title */}
                                            <h1 className="text-xl font-semibold text-gray-800 mt-2 shadow-md hover:text-blue-500 transition-all duration-300">
                                                {title.substring(0, 25)}
                                            </h1>
                                            
                                            <p className="text-gray-600 mt-1 text-lg font-bold hover:text-blue-500 transition-all duration-300">
                                                ₹{price}
                                            </p>

                                            {/* Add/Remove Cart Button */}
                                            <div className="flex justify-center mt-3">
                                                {cartItems?.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 
                                                                   rounded-lg font-bold transition-all duration-300 
                                                                   transform hover:scale-105 shadow-md hover:shadow-red-500"
                                                    >
                                                        Remove From Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 
                                                                   rounded-lg font-bold transition-all duration-300 
                                                                   transform hover:scale-105 shadow-md hover:shadow-blue-500"
                                                    >
                                                        Add To Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;

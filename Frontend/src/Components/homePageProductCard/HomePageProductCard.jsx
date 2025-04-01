import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import useMyStore from "../../context/myContext2";
import axios from "axios";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useMyStore();
    const [ getAllProduct, setProducts ] = useState([]);

    useEffect(() => {
        // context.getAllProductFunction();

        async function fetchProducts() { 
            const res = await axios.get("http://localhost:3000/products").then((res) => {
                setProducts(res.data);
                console.log(res);
            }
            ).catch((err) => {
                console.log(err);
            });
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
        <div className="mt-24 px-5 relative"> {/* Increased top margin for better spacing */}
            {/* Fancy Title with More Space */}
            <h1 className="text-center mb-5 pb-4 font-extrabold text-4xl bg-gradient-to-r from-blue-500 to-purple-600 
                           text-transparent bg-clip-text">
                ✨ Our Best-Selling Products ✨
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
                                                    hover:scale-105 hover:shadow-2xl hover:rotate-1">
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
                                            
                                            {/* Fancy Product Title */}
                                            <h1 className="text-xl font-serif italic font-semibold text-gray-800 mt-2 shadow-sm">
                                                {title.substring(0, 25)}
                                            </h1>
                                            
                                            <p className="text-gray-600 mt-1 text-lg font-bold">₹{price}</p>

                                            {/* Add/Remove Cart Button */}
                                            <div className="flex justify-center mt-3">
                                                {cartItems?.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 
                                                                   rounded-lg font-bold transition-all duration-300 
                                                                   transform hover:scale-105 shadow-md"
                                                    >
                                                        Remove From Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 
                                                                   rounded-lg font-bold transition-all duration-300 
                                                                   transform hover:scale-105 shadow-md"
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

import { useNavigate, useParams } from "react-router";
import Layout from "../../Components/Layout/layout";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/${categoryname}Products,ElectronicProducts`);
               
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryname]);  

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart!");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart!");
    };

   
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="mt-12 px-5">
                <h1 className="text-center text-4xl font-bold text-gray-800 capitalize">{categoryname}</h1>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader />
                    </div>
                ) : (
                    <section className="container mx-auto py-8">
                        <div className="flex flex-wrap justify-center gap-6">
                            {products.length > 0 ? (
                                products.map((item, index) => {
                                    const { _id, title, price, productImageUrl } = item;
                                    return (
                                        <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-4">
                                            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 bg-white transform transition duration-300 hover:scale-105">
                                                <img 
                                                    onClick={() => navigate(`/productinfo/${_id}`)}
                                                    className="h-72 w-full object-cover cursor-pointer"
                                                    src={productImageUrl} 
                                                    alt={title} 
                                                />
                                                <div className="p-4 text-center">
                                                    <h2 className="text-gray-500 text-sm uppercase tracking-wide">Cloud Store</h2>
                                                    <h1 className="text-xl font-semibold text-gray-900 mt-2 truncate">{title}</h1>
                                                    <h1 className="text-lg font-bold text-gray-700 mt-2">₹{price}</h1>
                                                    <div className="mt-4">
                                                        {cartItems.some((p) => p._id === item._id) ? (
                                                            <button onClick={() => deleteCart(item)}
                                                                className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-semibold shadow-md transition-all">
                                                                Remove from Cart
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => addCart(item)}
                                                                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 text-white py-2 rounded-lg font-semibold shadow-md transition-all">
                                                                Add to Cart
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <img className="mb-4 w-16" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No products" />
                                    <h1 className="text-xl font-semibold text-gray-600">No {categoryname} products found</h1>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;

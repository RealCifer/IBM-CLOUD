import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Layout from "../../Components/Layout/layout";

const FashionCategoryPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/Products")
            .then((res) => {
                console.log("📦 Fashion Products:", res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Error fetching fashion products:", error);
                setError("Failed to load fashion products.");
                setLoading(false);
            });
    }, []);

    const addToCart = async (productId) => {
        const { email } = JSON.parse(localStorage.getItem("users"));
        axios.post("http://localhost:3000/addToCart", {
            email,
            productId,
            quantity: 1,
        })
            .then((res) => {
                console.log("✅ Item added to cart:", res.data);
                alert("Item added to cart successfully!");
            })
            .catch((error) => {
                console.error("❌ Error adding item to cart:", error);
                alert("Failed to add item to cart.");
            });
    }

    return (
        <Layout>
            <style>
                {`
                    @keyframes glow {
                        0% { text-shadow: 0 0 5px #fff, 0 0 10px #ff69b4, 0 0 20px #ff69b4; }
                        50% { text-shadow: 0 0 10px #fff, 0 0 20px #ff1493, 0 0 30px #ff1493; }
                        100% { text-shadow: 0 0 5px #fff, 0 0 10px #ff69b4, 0 0 20px #ff69b4; }
                    }
                    .glowing-text {
                        color: #fff;
                        font-weight: normal;
                        font-size: 1.5rem;
                        animation: glow 1.5s infinite alternate;
                    }
                `}
            </style>

            <header className="text-white text-center py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-2xl font-semibold font-poppins tracking-wide shadow-lg">
                ✨ Cloud Store - <span className="glowing-text">SHOES</span> ✨
            </header>

            <div className="container mx-auto px-5 py-10">
                <h2 className="text-center text-3xl font-bold font-poppins mb-8 text-gray-900 drop-shadow-lg">
                    🔥 Discover Trendy Shoes 🔥
                </h2>

                {loading && <p className="text-center text-gray-500">Loading Shoes products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="relative bg-white backdrop-blur-md bg-opacity-30 border border-gray-200 shadow-lg p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="relative">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                        🔥 Trending
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold mt-3 text-gray-900 font-poppins tracking-wide">
                                    {product.title}
                                </h3>
                                <p className="text-gray-600 text-sm font-medium">{product.description}</p>
                                <p className="text-pink-600 font-extrabold text-lg mt-2">₹{product.price}</p>

                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-blue-500 text-white py-1.5 px-3 text-sm rounded-md hover:bg-blue-600 transition shadow-md"
                                        onClick={() => navigate(`/productinfo/${product._id}`)}
                                    >
                                        💳 Buy Now
                                    </button>
                                    <button
                                        onClick={() => addToCart(product._id)}
                                        className="bg-green-500 text-white py-1.5 px-3 text-sm rounded-md hover:bg-green-600 transition shadow-md"
                                    >
                                        🛒 Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && !error && <p className="text-center text-gray-500">No Shoe products found.</p>
                )}
            </div>
        </Layout>
    );
};

export default FashionCategoryPage;

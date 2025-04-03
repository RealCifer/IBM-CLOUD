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
        // Fetch only fashion products from the backend
        axios.get("http://localhost:3000/fashionProducts")
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

    return (
        <Layout>
            {/* Header */}
            <header className="text-white text-center py-5 bg-[#dc7cae] text-3xl font-bold font-poppins">
                Cloud Store - Fashion
            </header>

            {/* Product Grid */}
            <div className="container mx-auto px-5 py-10">
                <h2 className="text-center text-2xl font-semibold font-poppins mb-8">
                    Explore Fashion Trends
                </h2>

                {/* Loading State */}
                {loading && <p className="text-center text-gray-500">Loading fashion products...</p>}
                
                {/* Error State */}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Products Grid */}
                {!loading && !error && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white p-5 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition duration-300"
                            >
                                <img
                                    src={product.productImageUrl} // Ensure MongoDB field matches
                                    alt={product.title}
                                    className="w-full h-60 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-medium mt-3">{product.title}</h3>
                                <p className="text-gray-500">{product.description}</p>
                                <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>

                                {/* Buttons */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/productinfo/${product._id}`)}
                                    >
                                        Buy Now
                                    </button>
                                    <button
                                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && !error && <p className="text-center text-gray-500">No fashion products found.</p>
                )}
            </div>

            {/* Footer */}
            <footer className="text-center text-black py-5 bg-[#dc7cae] font-poppins">
                Cloud Store © 2025
            </footer>
        </Layout>
    );
};

export default FashionCategoryPage;

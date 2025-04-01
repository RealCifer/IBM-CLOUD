import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState('')
    const { id } = useParams()

    // getProductData
    const getProductData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            setProduct({...productTemp.data(), id : productTemp.id})
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart")
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        getProductData()
    }, [])
    
    return (
        <Layout>
            <section className="py-5 lg:py-16 font-[cursive] dark:bg-gray-800">
                {loading ?
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                    :
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <img
                                    className="w-full lg:h-[39em] rounded-lg"
                                    src={product?.productImageUrl}
                                    alt=""
                                />
                            </div>
                            <div className="w-full px-4 md:w-1/2 lg:pl-20">
                                <h2 className="max-w-xl mb-6 text-xl font-bold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                    {product?.title}
                                </h2>
                                <p className="inline-block text-2xl font-bold text-gray-700 dark:text-gray-400">
                                    ₹ {product?.price}
                                </p>
                                <div className="flex flex-wrap items-center mt-6">
                                    {cartItems.some((p) => p.id === product.id)
                                        ? <button
                                            onClick={() => deleteCart(product)}
                                            className="w-full px-4 py-3 text-center text-white bg-red-500 border border--600 hover:bg-red-600 hover:text-gray-100 rounded-xl">
                                            Remove from cart
                                        </button>
                                        : <button
                                            onClick={() => addCart(product)}
                                            className="w-full px-4 py-3 text-center text-pink-600 bg-pink-100 border border-pink-600 hover:bg-pink-600 hover:text-gray-100 rounded-xl">
                                            Add to cart
                                        </button>
                                    }
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button
                                        className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl">
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Layout>
    );
}

export default ProductInfo;

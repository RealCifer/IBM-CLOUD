import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'products', id));
      toast.success('Product Deleted successfully');
      getAllProductFunction();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
    setLoading(false);
  };

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-lg">
          🛍️ All Products
        </h1>
        <Link to={'/addproduct'}>
          <button className="px-5 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition">
            ➕ Add Product
          </button>
        </Link>
      </div>

      {loading && <div className="flex justify-center"><Loader /></div>}

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white/80 backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-800">
              {['S.No.', 'Image', 'Title', 'Price', 'Category', 'Date', 'Edit', 'Delete'].map((heading, index) => (
                <th key={index} className="px-4 py-3 text-sm font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageUrl } = item;
              return (
                <tr key={id} className="border-t border-gray-200 hover:bg-pink-50 transition">
                  <td className="px-4 py-3">{index + 1}.</td>
                  <td className="px-4 py-3">
                    <img src={productImageUrl} alt="Product" className="w-16 h-16 object-cover rounded-lg shadow-md" />
                  </td>
                  <td className="px-4 py-3">{title}</td>
                  <td className="px-4 py-3 text-green-600 font-bold">₹{price}</td>
                  <td className="px-4 py-3">{category}</td>
                  <td className="px-4 py-3">{date}</td>
                  <td className="px-4 py-3 text-blue-500 cursor-pointer hover:scale-105 transition" onClick={() => navigate(`/updateproduct/${id}`)}>
                    ✏️ Edit
                  </td>
                  <td className="px-4 py-3 text-red-500 cursor-pointer hover:scale-105 transition" onClick={() => deleteProduct(id)}>
                    ❌ Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductDetail;
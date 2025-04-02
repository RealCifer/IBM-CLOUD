import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filterSearchData = getAllProduct
        .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 8);

    return (
        <div className="relative flex justify-center items-center mt-4">
            <div className="relative w-96">
                <input
                    type="text"
                    placeholder="Search for products..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 rounded-full shadow-md outline-none transition-all duration-300 focus:ring-2 focus:ring-red-400 focus:shadow-lg text-black bg-gray-100 placeholder-gray-500"
                />
                <FaSearch className="absolute right-4 top-3 text-gray-500" />
            </div>

            {search && (
                <div className="absolute top-12 bg-white w-96 z-50 mt-2 rounded-lg shadow-lg overflow-hidden">
                    {filterSearchData.length > 0 ? (
                        <>
                            {filterSearchData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                                    onClick={() => navigate(`/productinfo/${item.id}`)}
                                >
                                    <img className="w-10 h-10 object-cover rounded-md" src={item.productImageUrl} alt={item.title} />
                                    <span className="text-black font-medium">{item.title}</span>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="flex justify-center items-center p-4">
                            <img className="w-16" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="No results" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

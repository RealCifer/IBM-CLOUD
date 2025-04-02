import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
    }

    const cartItems = useSelector((state) => state.cart);

    return (
        <nav className="bg-[#dc7cae] sticky top-0 shadow-xl">
            <style>
                {`
                    .glow-effect {
                        text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff;
                    }
                `}
            </style>
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-5">
                <div className="left py-2 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-black text-2xl text-center font-[Poppins] drop-shadow-2xl tracking-wide transform transition-all duration-300 hover:scale-110 uppercase glow-effect">
                            CLOUD-STORE
                        </h2>
                    </Link>
                </div>
                <div className="right flex justify-center mb-3 lg:mb-0">
                    <ul className="flex space-x-2 text-black font-medium text-xs px-4">
                        <li>
                            <Link to={'/'} className="px-3 py-1 border border-gray-400 rounded-md shadow-md hover:bg-gray-300 hover:border-gray-500 transition-all duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to={'/allproduct'} className="px-3 py-1 border border-gray-400 rounded-md shadow-md hover:bg-gray-300 hover:border-gray-500 transition-all duration-300">Listed Product</Link>
                        </li>
                        {!user && <li>
                            <Link to={'/signup'} className="px-3 py-1 border border-blue-600 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 hover:border-blue-700 transition-all duration-300">Signup</Link>
                        </li>}
                        {!user && <li>
                            <Link to={'/admin'} className="px-3 py-1 border border-red-600 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 hover:border-red-700 transition-all duration-300">Admin</Link>
                        </li>}
                        {!user && <li>
                            <Link to={'/login'} className="px-3 py-1 border border-green-600 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 hover:border-green-700 transition-all duration-300">Login</Link>
                        </li>}
                        {user?.role === "user" && <li>
                            <Link to={'/user-dashboard'} className="px-3 py-1 border border-yellow-600 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 hover:border-yellow-700 transition-all duration-300">User Dashboard</Link>
                        </li>}
                        {user?.role === "admin" && <li>
                            <Link to={'/admin-dashboard'} className="px-3 py-1 border border-purple-600 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 hover:border-purple-700 transition-all duration-300">Admin Dashboard</Link>
                        </li>}
                        {user && <li>
                            <button onClick={logout} className="px-3 py-1 border border-gray-500 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500 hover:border-gray-600 transition-all duration-300">Logout</button>
                        </li>}
                        <li>
                            <Link to={'/cart'} className="px-3 py-1 border border-orange-600 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 hover:border-orange-700 transition-all duration-300">Cart ({cartItems.length})</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="text" placeholder="Search..." className="w-32 px-3 py-1 border border-gray-400 rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-600 transition-all duration-300" />
                    <button className="px-3 py-1 border border-blue-600 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 hover:border-blue-700 transition-all duration-300">Search</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

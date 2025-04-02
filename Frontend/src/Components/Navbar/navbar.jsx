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
        <nav className="bg-[#dc7cae]  top-0 shadow-xl">
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
                            <Link to={'/'} className="px-3 py-1 border border-[#e89bc2] bg-[#f3c1e0] rounded-md shadow-md hover:bg-[#e89bc2] hover:border-[#d478a3] transition-all duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to={'/allproduct'} className="px-3 py-1 border border-[#e89bc2] bg-[#f3c1e0] rounded-md shadow-md hover:bg-[#e89bc2] hover:border-[#d478a3] transition-all duration-300">Listed Product</Link>
                        </li>
                        {!user && <li>
                            <Link to={'/signup'} className="px-3 py-1 border border-[#388E3C] bg-[#4CAF50] text-white rounded-md shadow-md hover:bg-[#388E3C] hover:border-[#2E7D32] transition-all duration-300">Signup</Link>
                        </li>}
                        {!user && <li>
                            <Link to={'/admin'} className="px-3 py-1 border border-[#C62828] bg-[#E53935] text-white rounded-md shadow-md hover:bg-[#C62828] hover:border-[#B71C1C] transition-all duration-300">Admin</Link>
                        </li>}
                        {!user && <li>
                            <Link to={'/login'} className="px-3 py-1 border border-[#1976D2] bg-[#2196F3] text-white rounded-md shadow-md hover:bg-[#1976D2] hover:border-[#1565C0] transition-all duration-300">Login</Link>
                        </li>}
                        {user?.role === "user" && <li>
                            <Link to={'/user-dashboard'} className="px-3 py-1 border border-[#F57C00] bg-[#FF9800] text-white rounded-md shadow-md hover:bg-[#F57C00] hover:border-[#E65100] transition-all duration-300">User Dashboard</Link>
                        </li>}
                        {user?.role === "admin" && <li>
                            <Link to={'/admin-dashboard'} className="px-3 py-1 border border-[#7B1FA2] bg-[#9C27B0] text-white rounded-md shadow-md hover:bg-[#7B1FA2] hover:border-[#6A1B9A] transition-all duration-300">Admin Dashboard</Link>
                        </li>}
                        {user && <li>
                            <button onClick={logout} className="px-3 py-1 border border-gray-500 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500 hover:border-gray-600 transition-all duration-300">Logout</button>
                        </li>}
                        <li>
                            <Link to={'/cart'} className="px-3 py-1 border border-[#F57C00] bg-[#FF9800] text-white rounded-md shadow-md hover:bg-[#F57C00] hover:border-[#E65100] transition-all duration-300">Cart ({cartItems.length})</Link>
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

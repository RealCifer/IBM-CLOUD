import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../Components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user));
                    
                    setUserLogin({ email: "", password: "" });
                    toast.success("Login Successfully");
                    setLoading(false);

                    if (user.role === "user") {
                        navigate('/user-dashboard');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen animated-gradient'>
            {loading && <Loader />}

            <style>
                {`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes cardGlow {
                    0% { box-shadow: 0 0 10px rgba(255, 255, 0, 0.3); }
                    50% { box-shadow: 0 0 20px rgba(255, 255, 0, 0.6); }
                    100% { box-shadow: 0 0 10px rgba(255, 255, 0, 0.3); }
                }

                .animated-gradient {
                    background: linear-gradient(270deg, #ff0000, #ff7300, #fffa00, #48ff00, #00ffee, #0000ff, #7a00ff, #ff00c8);
                    background-size: 400% 400%;
                    animation: gradientAnimation 6s ease infinite;
                }

                .glowing-card {
                    animation: cardGlow 3s infinite alternate;
                }
                `}
            </style>

            <div className="glowing-card bg-black bg-opacity-80 px-8 py-6 border border-yellow-500 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-yellow-400'>
                        Login
                    </h2>
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                        className='bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                        className='bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                    />
                </div>

                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userLoginFunction}
                        className='bg-yellow-500 hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md transition-all duration-300 transform hover:scale-105'
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-white'>
                        Don't Have an account? <Link className='text-yellow-400 font-bold' to={'/signup'}>Signup</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Login;

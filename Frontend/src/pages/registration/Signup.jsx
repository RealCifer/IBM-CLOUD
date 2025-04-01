import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../Components/loader/Loader";
import "../../gradient.css";  // Import the CSS file for animations

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);

        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            }

            const userReference = collection(fireDB, "user");
            addDoc(userReference, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gradient'>
            {loading && <Loader />}

            {/* Signup Form */}
            <div className="signup_Form bg-white bg-opacity-80 px-6 lg:px-8 py-6 border border-gray-300 rounded-xl shadow-lg">
                
                {/* Top Heading */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-gray-800'>
                        Signup
                    </h2>
                </div>

                {/* Input Fields */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-600'
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-600'
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-600'
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 w-full text-white text-center py-2 font-bold rounded-md transition duration-300'
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account? <Link className='text-purple-700 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;

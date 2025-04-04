import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import myContext from "../../context/myContext";
import "../../gradient.css";
import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";

const Signup = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setUserSignup({ ...userSignup, [e.target.name]: e.target.value });
  };

  // Handle manual signup
  const userSignupFunction = async () => {
    if (!userSignup.name || !userSignup.email || !userSignup.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
      `http://localhost:5000/api/auth/register`,
        userSignup
      );

      const { token, user } = response.data;

      // Store user session in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Reset state
      setUserSignup({ name: "", email: "", password: "", role: "user" });

      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = () => {
    window.location.href = `http://localhost:5000/api/auth/google`;
  };

  // Handle token redirection after Google Signup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // Redirect after Google login
    }
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      <BackgroundGradientAnimation className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 px-8 py-6 border border-yellow-500 rounded-xl shadow-md w-[400px] text-center z-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-5">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userSignup.name}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userSignup.email}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userSignup.password}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-5"
        />

        <button
          type="button"
          onClick={userSignupFunction}
          className="bg-yellow-500 hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md transition-all duration-300 transform hover:scale-105"
        >
          Signup
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="bg-white hover:bg-gray-100 w-full text-gray-800 text-center py-2 font-bold rounded-md transition duration-300 flex items-center justify-center border border-gray-300 mt-3 transform hover:scale-105"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <p className="text-white mt-4">
          Already have an account? <Link className="text-yellow-400 font-bold" to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

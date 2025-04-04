import { useContext, useState, useEffect } from "react";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import "../../gradient.css";
import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";

const Login = () => {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/"); // Redirect after login
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const userLoginFunction = async () => {
    if (!userLogin.email || !userLogin.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        userLogin
      );

      const { token, user } = response.data;

      // Store credentials
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Reset fields
      setUserLogin({ email: "", password: "" });

      toast.success("Login Successful ✅");

      // Redirect user based on role
      navigate(user.role === "admin" ? "/admin-dashboard" : "/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      window.location.href = "http://localhost:5000/api/auth/google";
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      <BackgroundGradientAnimation className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 px-8 py-6 border border-yellow-500 rounded-xl shadow-md w-[400px] text-center z-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-5">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userLogin.email}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userLogin.password}
          onChange={handleInputChange}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-5"
        />

        <button
          type="button"
          onClick={userLoginFunction}
          className="bg-yellow-500 hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md transition-all duration-300 transform hover:scale-105 mb-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-white hover:bg-gray-100 w-full text-gray-800 text-center py-2 font-bold rounded-md transition duration-300 flex items-center justify-center border border-gray-300 transform hover:scale-105 mb-3"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <h2 className="text-white mt-3">
          Don't have an account?{" "}
          <Link className="text-yellow-400 font-bold" to={"/signup"}>
            Signup
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;

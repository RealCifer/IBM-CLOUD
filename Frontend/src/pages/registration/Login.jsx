import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../Components/loader/Loader";
import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";
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
          QuerySnapshot.forEach((doc) => (user = doc.data()));
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
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      {/* Background Animation */}
      <BackgroundGradientAnimation className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Login Box Positioned Over Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 px-8 py-6 border border-yellow-500 rounded-xl shadow-md w-[400px] text-center z-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-5">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userLogin.email}
          onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={userLogin.password}
          onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-5"
        />

        <button
          type="button"
          onClick={userLoginFunction}
          className="bg-yellow-500 hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md transition-all duration-300 transform hover:scale-105"
        >
          Login
        </button>

        <h2 className="text-white mt-3">
          Don't Have an account? <Link className="text-yellow-400 font-bold" to={'/signup'}>Signup</Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;

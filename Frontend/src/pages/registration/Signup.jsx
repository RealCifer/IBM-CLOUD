import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../Components/loader/Loader";
import "../../gradient.css";  // Import the CSS file for animations
import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";

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
      };

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
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900">
      {/* Background Animation */}
      <BackgroundGradientAnimation className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Signup Box Positioned Over Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 px-8 py-6 border border-yellow-500 rounded-xl shadow-md w-[400px] text-center z-10">
        <h2 className="text-2xl font-bold text-yellow-400 mb-5">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userSignup.name}
          onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={userSignup.email}
          onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={userSignup.password}
          onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
          className="bg-gray-800 text-white border border-yellow-400 px-2 py-2 w-full rounded-md outline-none placeholder-gray-400 mb-5"
        />

        <button
          type="button"
          onClick={userSignupFunction}
          className="bg-yellow-500 hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md transition-all duration-300 transform hover:scale-105"
        >
          Signup
        </button>

        <h2 className="text-white mt-3">
          Already have an account? <Link className="text-yellow-400 font-bold" to={'/login'}>Login</Link>
        </h2>
      </div>
    </div>
  );
}

export default Signup;

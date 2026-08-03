import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiMusic,
  FiEye,
  FiEyeOff,
  FiUser,
} from "react-icons/fi";
import API from "../../api/axios";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await API.post("/auth/google", {
          token: tokenResponse.access_token,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");

      } catch (err) {
        setMessage(
          err.response?.data?.message || "Google login failed"
        );
      }
    },

    onError: () => {
      setMessage("Google Login Failed");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-orange-100 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-lg">
            <FiMusic size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join us and start your music journey
        </p>

        {message && (
          <div className="bg-red-50 text-red-500 text-center p-3 rounded-xl mb-5">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div className="relative">
            <FiUser className="absolute left-4 top-4 text-orange-500" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          {/* Username */}
          <div className="relative">
            <FiUser className="absolute left-4 top-4 text-orange-500" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-4 top-4 text-orange-500" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-4 text-orange-500" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500 hover:text-orange-500 transition"
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-200 hover:from-orange-600 hover:to-orange-700 transition duration-300"
          >
            Create Account
          </button>

        </form>

        <button
          onClick={() => googleLogin()}
          className="
    w-full h-14 rounded-2xl
    bg-white text-gray-800
    border border-gray-200
    shadow-lg
    flex items-center justify-center gap-3
    font-semibold text-lg
    transition-all duration-300
    hover:shadow-xl hover:-translate-y-1
    active:scale-95
  "
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6"
          />

          Sign Up with Google
        </button>

        <p className="text-center text-gray-500 mt-7">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-orange-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
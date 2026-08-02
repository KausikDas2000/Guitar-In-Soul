import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiMusic } from "react-icons/fi";
import API from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await API.post(`/auth/reset-password/${token}`, {
        password,
      });

      setMessage(res.data.message || "Password updated successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-orange-100 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-lg">
            <FiMusic size={30} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create a new secure password for your account.
        </p>

        {message && (
          <div
            className={`mb-5 rounded-xl p-3 text-center ${
              message.toLowerCase().includes("success") ||
              message.toLowerCase().includes("updated")
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-4 text-orange-500" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500 hover:text-orange-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-30"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-100"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
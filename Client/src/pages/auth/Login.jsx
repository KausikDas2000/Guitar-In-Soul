import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiMusic,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import API from "../../api/axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });


  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);





  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        form
      );


      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      navigate("/");


    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };



  return (

    <div className="
      min-h-screen 
      flex 
      items-center 
      justify-center
      bg-gradient-to-br 
      from-orange-50 
      via-white 
      to-orange-100
      px-4
    ">


      <div className="
        w-full 
        max-w-md
        bg-white
        rounded-3xl
        shadow-2xl
        border
        border-orange-100
        p-8
      ">


        {/* Logo */}

        <div className="flex justify-center mb-6">

          <div className="
            bg-orange-500
            text-white
            p-4
            rounded-2xl
            shadow-lg
          ">
            <FiMusic size={32} />
          </div>

        </div>



        <h1 className="
          text-3xl
          font-bold
          text-center
          text-gray-900
        ">
          Welcome Back
        </h1>


        <p className="
          text-center
          text-gray-500
          mt-2
          mb-8
        ">
          Login to continue your music journey
        </p>



        {
          message &&

          <div className="
            bg-red-50
            text-red-500
            text-center
            p-3
            rounded-xl
            mb-5
          ">
            {message}
          </div>

        }




        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          {/* Email */}

          <div className="relative">

            <FiMail
              className="
                absolute
                left-4
                top-4
                text-orange-500
              "
            />

            <input

              type="email"
              name="email"
              placeholder="Email address"

              value={form.email}

              onChange={handleChange}

              className="
                w-full
                pl-12
                pr-4
                py-3.5
                rounded-xl
                border
                border-gray-200
                outline-none
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-200
                transition
              "

            />

          </div>







          {/* Password */}

          <div className="relative">
            <FiLock
              className="
      absolute
      left-4
      top-4
      text-orange-500
    "
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="
      w-full
      pl-12
      pr-12
      py-3.5
      rounded-xl
      border
      border-gray-200
      outline-none
      focus:border-orange-500
      focus:ring-2
      focus:ring-orange-200
      transition
    "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
      absolute
      right-4
      top-4
      text-gray-500
      hover:text-orange-500
      transition
    "
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>





          <div className="
            flex
            justify-end
          ">

            <Link
              to="/forgot-password"
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              Forgot password?
            </Link>

          </div>





          <button

            className="
              w-full
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              text-white
              py-3.5
              rounded-xl
              font-semibold
              shadow-lg
              shadow-orange-200
              hover:from-orange-600
              hover:to-orange-700
              transition
              duration-300
            "

          >

            Login

          </button>




        </form>

        <div className="google-login-full w-full mt-6">
          <div className="w-full rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <GoogleLogin
              theme="outline"
              size="large"
              shape="pill"
              width="400"
              text="signin_with"
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await API.post("/auth/google", {
                    token: credentialResponse.credential,
                  });

                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                  );

                  navigate("/");

                } catch (err) {
                  setMessage(
                    err.response?.data?.message || "Google login failed"
                  );
                }
              }}
              onError={() => {
                setMessage("Google Login Failed");
              }}
            />
          </div>
        </div>




        <p className="
          text-center
          text-gray-500
          mt-7
        ">

          Don't have an account?


          <Link

            to="/register"

            className="
              ml-2
              text-orange-600
              font-semibold
              hover:underline
            "

          >

            Create account

          </Link>


        </p>



      </div>


    </div>

  );

};


export default Login;
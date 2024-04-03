import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  const changeHandler = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
    console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/signin", formData);
      if (data.message.token) {
        setUser(data.message.token);
        localStorage.setItem("token", data.message.token);
        if (data.chatId) {
          localStorage.setItem("chatId1", data.chatId.chatId1);
          localStorage.setItem("chatId2", data.chatId.chatId2);
        }
        navigate("/");
      }
    } catch (e) {
      console.log(`error signing up : ${e.message}`);
      return;
    }
  };
  return (
    <div className=" center-div min-h-screen">
      <div className=" rounded-lg border px-6  py-3">
        <form
          onSubmit={submitHandler}
          className="   flex w-80  flex-col items-center justify-center"
        >
          <p className=" mt-2 text-4xl font-bold text-gray-700 ">
            Welcome Back!
          </p>
          <p className=" mb-5 text-base font-light text-gray-500">
            Please enter your login details below
          </p>
          <input
            className="input-fiel mb-4 h-12  w-full rounded-md border border-boxborder p-2"
            type="email"
            value={formData.email}
            name="email"
            onChange={changeHandler}
            placeholder="Email"
            required
          />
          <div className="relative w-full">
            <input
              className="input-field mb-1 h-12 w-80  rounded-md  border border-boxborder p-2"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              onChange={changeHandler}
              placeholder="Password"
              required
            />
            <span
              className="absolute right-2 top-4 z-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </span>
          </div>
          <Link className=" w-full text-right text-sm" to="#">
            Forgot password ?
          </Link>
          <button
            type="submit"
            className="  my-2 mt-4 w-full rounded-md bg-primary py-2 text-white"
          >
            Sign in
          </button>

          <p className="font-light text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-gray-700 hover:underline "
            >
              Sign Up
            </Link>
          </p>
        </form>

        {/* Right side (Image) */}
        {/* <div className="flex-1">

        <div className="bg-primary absolute bottom-2 z-0 h-[350px] w-1/3 translate-x-[18%] rounded-full blur-[250px]"></div>

          <img src="./login1.png" className="object-cover h-screen px-20 py-20" alt="Your Image" />
        </div> */}
      </div>
    </div>
  );
};

export default Login;

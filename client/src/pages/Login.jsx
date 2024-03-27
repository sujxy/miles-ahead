import React from "react";
import { toast } from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  function changeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
    console.log(formData);
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("login success");
    // toast.success("login success");
    navigate("/home");
  }
  return (
    <div>
       <div className="sticky top-0 flex w-full items-center justify-between bg-transparent px-24 py-6">
        <div className="center-div w-auto">
          <img src={"./logo.png"} className="h-8 w-12" />
          <h1 className="font-yeseva text-3xl italic text-gray-700">
            milesahead
          </h1>
        </div>
        <div className="flex items-center justify-between gap-5 text-lg font-light text-gray-600">
          <Link>
            <span>
              <ChevronDown className="inline" />
            </span>
            About
          </Link>
          <Link>
            <span>
              <ChevronDown className="inline" />
            </span>
            Services
          </Link>
          <Link className="center-div border-primary rounded-lg border bg-transparent px-2 py-1">
            Sign In
          </Link>
          <Link className="center-div  bg-primary rounded-lg  px-2 py-1 font-normal text-white">
            Sign Up
          </Link>
        </div>
      </div>
      <form onClick={submitHandler} className="login-form">
        <label>
          <p>
            Email Address<sup>*</sup>
          </p>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={changeHandler}
            placeholder="Enter email id"
            required
          ></input>
        </label>
        <label className="password-div">
          <p>
            Password<sup>*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            name="password"
            onChange={changeHandler}
            placeholder="Enter Password"
            required
          ></input>
          <span
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
          </span>
          <Link className="forgot-password" to="#">
            <p>forgot password ?</p>
          </Link>
        </label>

        <button onClick={submitHandler} className="signin-btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;

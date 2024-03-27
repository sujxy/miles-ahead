import React from "react";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(()=>{
  //     console.log(passwordfield) ;
  // })
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
    console.log(formData);
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.c_password) {
      toast.error("password and conform passeword should be same");
    }
    //  navigate("/login")
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="login-form">
        {/* names */}
        <div className="signup-name">
          <label>
            <p>
              First name<sup>*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              name="name"
              onChange={changeHandler}
              required
            />
          </label>
        </div>
        <label>
          <p>
            email<sup>*</sup>
          </p>
          <input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            name="email"
            onChange={changeHandler}
            required
          />
        </label>
        {/* password */}
        <div className="signup-name">
          <label className="password-div">
            <p>
              password<sup>*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              name="password"
              onChange={changeHandler}
              required
            />
            <span
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </span>
          </label>
          <label className="password-div">
            <p>
              conform password<sup>*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.c_password}
              name="c_password"
              onChange={changeHandler}
              required
            />
            <span
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
            </span>
          </label>
        </div>
        <button className="signin-btn">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

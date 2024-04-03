import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    age: null,
    gender: "",
    city: "",
    education: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.c_password) {
        return;
      }
      const { data } = await axios.post("/user/signup", formData);
      if (data.message) {
        navigate("/");
      }
    } catch (e) {
      console.log(`error signing up : ${e.message}`);
      return;
    }
  };

  return (
    <div className=" center-div min-h-screen">
      <div className="rounded-lg border p-4 text-center">
        {/* Left side (Image) */}
        {/* <div className="mb-30 flex-1 ">
          <div className="absolute bottom-2 z-0 h-[200px] w-1/3 translate-x-[18%] rounded-full bg-primary blur-[250px]"></div>
          <img
            src="./signup.png"
            className="h-screen object-cover  px-20 py-20"
            alt="Your Image"
          />
        </div> */}

        {/* Right side (Signup Form) */}
        <h1 className="mt-3 text-4xl font-bold text-gray-600">Hello there!</h1>
        <p className="mb-4 text-base font-light text-gray-500">
          Fill your information to sign up
        </p>
        <form
          onSubmit={submitHandler}
          className="mx-auto grid grid-cols-2  gap-2 text-gray-500"
        >
          <label className="">
            <input
              className="border-boxborder color-black  mb-4  h-12  rounded-md border  p-2 ring-0 focus:outline-0"
              type="text"
              placeholder="Name"
              value={formData.name}
              name="name"
              onChange={changeHandler}
              required
            />
          </label>

          <label className="">
            <input
              className="border-boxborder mb-4  h-12 rounded-md border  p-2 ring-0 focus:outline-0"
              type="number"
              placeholder="Age"
              value={formData.age}
              name="age"
              onChange={changeHandler}
              required
            />
          </label>

          <label className="">
            <select
              className="border-boxborder mb-4 h-12 w-full rounded-md border p-2 text-gray-500"
              value={formData.gender}
              name="gender"
              onChange={changeHandler}
              required
            >
              <option value="">Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="">
            <input
              className="border-boxborder mb-4  h-12 rounded-md border  p-2 ring-0 focus:outline-0"
              type="text"
              placeholder="City"
              value={formData.city}
              name="city"
              onChange={changeHandler}
              required
            />
          </label>

          <label className="">
            <input
              className="border-boxborder mb-4  h-12 rounded-md border  p-2 ring-0 focus:outline-0"
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={changeHandler}
              required
            />
          </label>

          <label className="">
            <select
              className="border-boxborder mb-4 h-12 w-full rounded-md border  p-2 ring-0 focus:outline-0"
              value={formData.education}
              name="education"
              onChange={changeHandler}
              required
            >
              <option value="">Education</option>
              <option value="highSchool">High School</option>
              <option value="intermediate">Intermediate</option>
              <option value="bachelorDegree">Bachelor's Degree</option>
              <option value="masterDegree">Master's Degree</option>
              <option value="phd">Ph.D.</option>
            </select>
          </label>

          <label className="password-div relative">
            <input
              className="border-boxborder mb-4  h-12 rounded-md border  p-2 ring-0 focus:outline-0"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={changeHandler}
              required
            />
            <span
              className="absolute right-2 top-4 z-10"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-gray-500" />
              ) : (
                <MdOutlineRemoveRedEye className="text-gray-500" />
              )}
            </span>
          </label>
          <label className="password-div relative ">
            <input
              className="border-boxborder mb-4  h-12 rounded-md border  p-2 ring-0 focus:outline-0"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.c_password}
              name="c_password"
              onChange={changeHandler}
              required
            />
            <span
              className="absolute right-2 top-4 z-10"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <FaRegEyeSlash className="text-gray-500" />
              ) : (
                <MdOutlineRemoveRedEye className="text-gray-500" />
              )}
            </span>
          </label>

          <button className="  mb-4 h-12  rounded-md bg-primary text-white transition-all hover:scale-105">
            Sign Up{" "}
            <span>
              {" "}
              <ArrowRight className="inline " />{" "}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

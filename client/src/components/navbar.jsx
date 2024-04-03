import { ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilStateLoadable } from "recoil";
import { userData } from "../store/atoms";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ type }) => {
  const [user, setUser] = useRecoilState(userData);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user.state == "loading") {
  //     setUserData(null);
  //   } else if (user.state == "hasValue") {
  //     setUserData(user.contents);
  //   } else {
  //     console.log("error");
  //   }
  // }, [user]);

  const handleLogout = () => {
    if (user) {
      localStorage.clear();
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div
      className={`fixed top-0 z-20 flex w-full items-center justify-between bg-transparent px-24 ${type == "home" ? "py-6" : "border-b bg-white py-4"}`}
    >
      <div className="center-div w-auto">
        <img src={"/logo.png"} className="h-8 w-12" />
        <h1 className="font-yeseva text-3xl italic text-gray-700">
          milesahead
        </h1>
      </div>
      {!user ? (
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
          <Link
            to={"/signin"}
            className="center-div rounded-lg border border-primary bg-transparent px-2 py-1"
          >
            Sign In
          </Link>
          <Link
            to={"/signup"}
            className="center-div  rounded-lg bg-primary  px-2 py-1 font-normal text-white"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="center-div gap-1 rounded-lg border px-2 py-1">
            <div className="center-div rounded-full border border-white bg-primary p-1 text-white">
              {" "}
              <User size={20} />{" "}
            </div>
            <p className="text-lg font-medium text-gray-600 hover:underline">
              {user.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="center-div  rounded-lg bg-primary  px-2 py-1 text-lg font-normal text-white
            "
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

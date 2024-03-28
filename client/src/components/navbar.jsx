import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = ({ type }) => {
  return (
    <div
      className={`fixed top-0 flex w-full items-center justify-between bg-transparent px-24 ${type == "home" ? "py-6" : "border-b bg-white py-4"}`}
    >
      <div className="center-div w-auto">
        <img src={"/logo.png"} className="h-8 w-12" />
        <h1 className="font-yeseva text-3xl italic text-gray-700">
          milesahead
        </h1>
      </div>
      {type == "home" ? (
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
          <Link className="center-div rounded-lg border border-primary bg-transparent px-2 py-1">
            Sign In
          </Link>
          <Link className="center-div  rounded-lg bg-primary  px-2 py-1 font-normal text-white">
            Sign Up
          </Link>
        </div>
      ) : (
        <div>other Info</div>
      )}
    </div>
  );
};

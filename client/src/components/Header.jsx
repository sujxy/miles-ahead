import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MoveRight } from "lucide-react";

const Header = () => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-transparent px-24 py-6 z-10">
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
  );
};

export default Header;

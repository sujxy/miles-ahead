import { ChevronDown, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen w-screen">
      {/* navbar */}
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
      <div className=" absolute z-10 mx-auto flex min-h-[720px] w-full flex-col items-center justify-normal overflow-y-hidden  bg-transparent">
        <div className="mt-16 flex  flex-col items-center justify-normal  gap-2 overflow-hidden">
          <h1 className="text-5xl font-bold">
            Unlock Your <span className="gradient-text">Potential</span>
          </h1>
          <p className="w-3/5 text-center text-xl font-light text-gray-700">
            Welcome to our career guidance hub! <br /> We're here to help you
            unleash your potential and steer your career journey with
            confidence.
          </p>
          <Link className="center-div bg-primary mt-3 rounded-xl px-3 py-2 text-xl font-normal text-white">
            Get Started <MoveRight className="inline" />
          </Link>
        </div>
        <img src={"./phone_mockup.png"} />
      </div>

      <div className="bg-primary absolute bottom-2 z-0 h-[400px] w-4/5 translate-x-[18%] rounded-full blur-[250px]"></div>
    </div>
  );
};

export default Home;

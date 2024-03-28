import { ChevronDown, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navbar";

const Home = () => {
  return (
    <div className="relative min-h-screen w-screen">
      {/* navbar */}
      <Navbar type={"home"} />
      <div className=" absolute z-10 mx-auto flex min-h-[97vh] w-full flex-col items-center justify-normal bg-transparent   pt-12">
        <div className="mt-16 flex  flex-col items-center justify-normal  gap-2 overflow-hidden">
          <h1 className="text-5xl font-bold">
            Unlock Your <span className="gradient-text">Potential</span>
          </h1>
          <p className="w-3/5 text-center text-xl font-light text-gray-700">
            Welcome to our career guidance hub! <br /> We're here to help you
            unleash your potential and steer your career journey with
            confidence.
          </p>
          <Link
            to="/chat/a1"
            className="center-div mt-3 rounded-xl bg-primary px-3 py-2 text-xl font-normal text-white "
          >
            Get Started <MoveRight className="inline" />
          </Link>
        </div>
        <img src={"./phone_mockup.png"} />
      </div>

      <div className="absolute bottom-2 z-0 h-[400px] w-4/5 translate-x-[18%] rounded-full bg-primary blur-[250px]"></div>
    </div>
  );
};

export default Home;

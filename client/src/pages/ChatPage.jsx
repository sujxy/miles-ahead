import { useRecoilValue } from "recoil";
import { currentLevel } from "../store/atoms";
import UserProgress from "../components/userProgress";
import MessageBox from "../components/messageBox";
import ResultPage from "./resultpage";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const current = useRecoilValue(currentLevel);

  return (
    <div>
      <div className="grid max-h-[100vh] w-screen grid-cols-12  px-24 ">
        <div className=" col-span-3  flex flex-col items-center justify-start gap-6 pt-6 ">
          <Link to="/" className="center-div w-auto">
            <img src={"/logo.png"} className="h-8 w-12" />
            <h1 className="font-yeseva text-3xl italic text-gray-700">
              milesahead
            </h1>
          </Link>
          <UserProgress />
        </div>

        <div className="col-span-9 flex h-[100vh] grid-rows-12  flex-col justify-normal  ">
          <div className="    center-div  h-16 rounded-b-lg text-lg font-semibold text-primary  shadow-md  ">
            {current[1]}
          </div>
          {current[1] === "Results" ? <ResultPage /> : <MessageBox />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

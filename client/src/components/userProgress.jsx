import { useRecoilState, useRecoilValue } from "recoil";
import { currentLevel, progressAtom } from "../store/atoms";
import { Level } from "./level";

const UserProgress = () => {
  const current = useRecoilValue(currentLevel);

  const barLevel = (current[0] * 33).toString() + "%";

  const levels = ["About you", "Personality", "Career Path", "Results"];
  return (
    <div className=" center-div relative my-4 flex h-1/2 w-full gap-2  ">
      {/* progress bar */}
      <div className=" absolute z-0  h-full w-[8px] rounded-full border ">
        <div
          style={{ height: barLevel }}
          className={` w-full rounded-full bg-primary transition-all duration-300`}
        ></div>
      </div>
      {/* progress level */}
      <div className="absolute z-10 flex h-full w-3/5 flex-col items-center justify-between gap-8 text-base font-medium text-gray-500">
        {levels.map((level, i) => (
          <Level key={i} name={level} i={i} />
        ))}
      </div>
    </div>
  );
};

export default UserProgress;

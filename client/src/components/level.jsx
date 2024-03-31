import { useRecoilValue } from "recoil";
import { currentLevel, progressAtom } from "../store/atoms";

export const Level = ({ i, name }) => {
  const levelsCompleted = useRecoilValue(progressAtom);
  const current = useRecoilValue(currentLevel);
  const completed = levelsCompleted[i].status === true || current[0] == 3;

  return (
    <h3
      className={`w-full rounded-full border bg-white p-1 text-center transition-all duration-150 hover:scale-105 hover:cursor-pointer   ${completed ? "border-primary font-semibold text-primary" : null} `}
    >
      {name}
    </h3>
  );
};

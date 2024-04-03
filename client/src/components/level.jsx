import { useRecoilState, useRecoilValue } from "recoil";
import { currentLevel, progressAtom } from "../store/atoms";

export const Level = ({ i, name }) => {
  const levelsCompleted = useRecoilValue(progressAtom);
  const [current, setCurrent] = useRecoilState(currentLevel);
  const progress = useRecoilValue(progressAtom);
  const completed = levelsCompleted[i].status === true || current[0] == 3;

  const handleSelectLevel = () => {
    setCurrent([i, name, progress[i].status, progress[i].url]);
  };
  return (
    <h3
      onClick={handleSelectLevel}
      className={`w-full rounded-full border bg-white p-1 text-center transition-all duration-150 hover:scale-105 hover:cursor-pointer   ${completed ? "border-primary font-semibold text-primary" : null} `}
    >
      {name}
    </h3>
  );
};

import { atom, selector } from "recoil";

export const progressAtom = atom({
  key: "preogressAtom",
  default: {
    0: { name: "About you", status: true, url: "/chat/p1" },
    1: { name: "Personality", status: false, url: "/chat/p2" },
    2: { name: "Career Path", status: false, url: "/chat/p3" },
    3: { name: "Results", status: false, url: "/chat/p4" },
  },
});

export const currentLevel = selector({
  key: "currentLevel",
  get: ({ get }) => {
    const levels = get(progressAtom);
    for (const level in levels) {
      if (levels[level].status === false) {
        console.log(levels[level].name);
        return [level, levels[level].name, levels[level].url];
      }
    }
    return [3, "Results", "/chat/p4"];
  },
});

export const messageAtom = atom({
  key: "messageAtom",
  default: [],
});

import { atom, selector } from "recoil";
import axios from "axios";

//user state management
export const userAtom = atom({
  key: "userAtom",
  default: localStorage.getItem("token") || "",
});

export const userSelector = selector({
  key: "userSelector",
  get: async ({ get }) => {
    const token = get(userAtom);
    if (token) {
      try {
        const { data } = await axios.get("/user");
        if (data.message) {
          return data.message;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    return null;
  },
});

export const userData = atom({
  key: "userData",
  default: userSelector,
});

//chat state management
export const chatAtom = atom({
  key: "chatAtom",
  default: {
    chatId1: localStorage.getItem("chatId1"),
    chatId2: localStorage.getItem("chatId2"),
  },
});

export const messageAtom = atom({
  key: "messageAtom",
  default: [],
});

//assessment progress
export const progressAtom = atom({
  key: "preogressAtom",
  default: {
    0: { name: "About you", status: true, url: "/chat/p1" },
    1: {
      name: "Personality",
      status: false,
      url: "/chat/p2",
    },
    2: {
      name: "Career Path",
      status: false,
      url: "/chat/p3",
    },
    3: { name: "Results", status: false, url: "/chat/p4" },
  },
});

export const currentLevelSelector = selector({
  key: "currentLevelSelector",
  get: ({ get }) => {
    const levels = get(progressAtom);
    for (const level in levels) {
      if (levels[level].status === false) {
        return [
          level, //0
          levels[level].name, //1
          levels[level].url, //2
          levels[level].status, //3
        ];
      }
    }
    return [3, "Results", "/chat/p4"];
  },
});

export const currentLevel = atom({
  key: "currentLevel",
  default: currentLevelSelector,
});

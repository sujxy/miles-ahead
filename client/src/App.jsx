import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import ReviewPage from "./pages/ReviewPage";

import axios from "axios";
import { userAtom } from "./store/atoms";
import { useRecoilValue } from "recoil";

export const App = () => {
  const token = useRecoilValue(userAtom);
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/preview" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

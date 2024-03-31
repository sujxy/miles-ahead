import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import ReviewPage from "./pages/ReviewPage";
import { RecoilRoot } from "recoil";
import axios from "axios";

export const App = () => {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/preview" element={<ReviewPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

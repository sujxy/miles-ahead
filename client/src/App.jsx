import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/chatpage" element={<ChatPage />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import ReviewPage from "./pages/ReviewPage";
import AnalysisPage from "./pages/AnalysisPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
export const App = () => {
  return (
    <Provider store={store}>
    <div>
      
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/analysis" element={<AnalysisPage/>}/>
       <Route path="/chatpage" element={<ChatPage/>}/>
      </Routes> 
      </BrowserRouter>
    </div>
    </Provider>
  );
};

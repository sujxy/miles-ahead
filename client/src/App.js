import React from 'react';
import {  Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Chatpage from './pages/ChatPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home' ;
import { Toaster } from 'react-hot-toast';
function App() {
  return (
   
      <div>
         <Toaster/>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/chatpage" element={<Chatpage />}></Route>
        </Routes>
        <Footer/>
      </div>

  );
}

export default App;

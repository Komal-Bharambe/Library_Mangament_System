import React from "react";
import {Routes, Route} from 'react-router-dom';

import './stylesheets/alignments.css';
import './stylesheets/theme.css';
import './stylesheets/sizes.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import './index.css';
import ProtectedRotes from "./components/ProtectedRotes";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import BooksDescription from "./pages/BookDescription/BooksDescription";


function App() {
  const {loading} = useSelector((state) => state.loaders);

  return (
    <div >
      {loading && <Loader/>}

      <Routes>
      <Route path="/" element={<ProtectedRotes> <Home/></ProtectedRotes>}/>

      <Route path="/book/:id" element={<ProtectedRotes> <BooksDescription/></ProtectedRotes>}/>

      <Route path="/profile" element={<ProtectedRotes> <Profile/></ProtectedRotes>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      </Routes>
    </div>
  );
}

export default App;

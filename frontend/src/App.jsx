import React, { useState } from "react";
import "./index.css"
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './components/home/home.jsx'
 export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
 }
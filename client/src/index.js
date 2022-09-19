import React from "react";

import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Post from "./Pages/Post";
import Setting from "./Pages/Setting";
import MyCategory from "./components/SettingMycategory";
import MyInfo from "./components/SettingMyinfo";


const rootElement =document.getElementById("root");
render(
  <BrowserRouter>
  <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    {/* <Route path="/:userid" element={<Mypage />}> */}
      {/* <Route path="home" element={<Mypage />} /> */}
      {/* <Route path=":postNum" element={<Post/>} /> */}
    {/* </Route> */}
    <Route path="/post" element={<Post/>}/>
    <Route path="/setting" element={<Setting/>}>
      <Route path="category" element={<MyCategory/>}/>
      <Route path="info" element={<MyInfo/>}/>
    </Route>
  </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

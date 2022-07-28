// 라우트
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/home";
import Mypage from "../Pages/Mypage";

export default function Routes() {
  const [userId, serUserId] = useState("emyo");
  const [contentNum, setContentNum] = useState(1);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/userId" element={<Mypage />}>
        <Route exact path="/contentNum" element={<MyPost />} />
        <Route exact path="/contentNum" element={<MyPost />} />
        <Route exact path="/contentNum" element={<MyPost />} />
        <Route exact path="/contentNum" element={<MyPost />} />
        <Route exact path="/contentNum" element={<MyPost />} />
      </Route>
      <Route exact path="/sermon" element={<Sermon />} />
      <Route exact path="/service" element={<Service />} />
      <Route exact path="/offering" element={<Offering />} />
      <Route exact path="/way" element={<Way />} />
      <Route exact path="/minister" element={<Minister />} />
      <Route exact path="/contact" element={<Contact />} />
    </Routes>
  );
}

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from '../Pages/home';
import Post from '../Pages/Post';
import Write from '../Pages/WritePost.jsx';
import Setting from '../Pages/Setting'
import MyCategory from "../components/SettingMycategory";
import MyInfo from "../components/SettingMyinfo";
import MyCalender from "../Pages/MyCalendar";
import MyPage from '../Pages/Mypage';
import Presave from '../Pages/Presave';
import VisiteLike from '../Pages/VisiteLike';
import NotFound from '../Pages/NotFound';

const Routers = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>

                <Route path="/setting" element={<Setting/>}>
                    <Route path="category" element={<MyCategory/>}/>
                    <Route path="info" element={<MyInfo/>}/>
                </Route>
                <Route path="/write" element={<Write/>}></Route>

                <Route path="/:userId" element={<MyPage/>}></Route>
                <Route path="/:userId/calender" element={<MyCalender/>}></Route>
                <Route path="/:userId/presave" element={<Presave/>}></Route>
                <Route path="/:userId/visite" element={<VisiteLike/>}></Route>
                <Route path="/:userId/:postId" element={<Post/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>        
        </BrowserRouter>

    )
}
export default Routers;
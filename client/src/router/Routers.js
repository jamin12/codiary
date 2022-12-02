import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Main from '../Pages/home';
import Post from '../Pages/Post';
import PreSavePost from '../Pages/PreSavePost';
import Write from '../Pages/WritePost.jsx';
import Setting from '../Pages/Setting'
import MyCategory from "../components/SettingMycategory";
import MyInfo from "../components/SettingMyinfo";
import MyCalender from "../Pages/MyCalendar";
import MyPage from '../Pages/Mypage';
import Presave from '../Pages/Presave';
import VisiteLike from '../Pages/VisiteLike';
import VisiterStats from "../Pages/VisiterStats";
import Search from "../Pages/SearchPage";
import NotFound from '../Pages/NotFound';
import Login from "../Pages/Login"
import SettingMember from "../components/SettingMember";
import SettingReport from "../components/SettingReport";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>

                <Route path="/authenti/login" element={<Login />}></Route>

                <Route path="/write" element={<Write />}></Route>
                <Route path="/write/presave/:tmppostid" element={<Write />}></Route>
                <Route path="/write/:postId" element={<Write />}></Route>
                <Route path="/search" element={<Search />}></Route>

                {/* user 본인만 볼 수 있는 페이지 */}
                <Route path="/setting" element={<Setting />}>
                    <Route path="category" element={<MyCategory />} />
                    <Route path="info" element={<MyInfo />} />
                    {/* 관리자만 볼 수 있는 페이지 */}
                    <Route path="member" element={<SettingMember/>}/>
                    <Route path="report" element={<SettingReport/>}/>
                </Route>
                <Route path="/presave" element={<Presave />}></Route>
                <Route path="/presave/:tmpposttId" element={<PreSavePost />}></Route>
                <Route path="/visite-like" element={<VisiteLike />}></Route>
                <Route path="/visiterstat" element={<VisiterStats />}></Route>

                <Route path="/:userId" element={<MyPage />}></Route>
                <Route path="/:userId/calender" element={<MyCalender />}></Route>
                <Route path="/:userId/:postId" element={<Post />}></Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>

    )
}
export default Routers;
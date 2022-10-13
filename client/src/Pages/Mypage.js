import React, { useEffect, useState } from "react";
import "../css/MypageStyle.css";
import { useParams } from "react-router-dom";

import SearchProfile from "../components/SearchProfile";
import { personal } from "../api/index";
import axios from "axios";

const Mypage = () => {
	const { userId } = useParams();

	const [Nickname] = useState("Emyo");
	const [category, setCategory] = useState({});
	const [posts, setPosts] = useState({});

	/**
	 *  사용자 카테고리 목룍 조회
	 */
	useEffect(() => {
		const getCategoryFun = async () => {
			const getCategory = await axios.get(
				personal.getPersonalCategory(userId)
			);
			setCategory(getCategory.data.result_data);
		};
		getCategoryFun();
	}, [userId]);

	/**
	 *  사용자 카테고리별 포스트 목록 조회
	 */
	useEffect(() => {
		const getPostsFun = async () => {
			const getPost = await axios.get(
        //TODO: 카테고리 아이디 파라미터로 가져와야함
				personal.getPsersonalPosts(userId, 2),
				{
          //TODO: queryParams로 가져와야함
					params: { offset: 1, limit: 4 },
				}
			);
			setPosts(getPost.data.result_data);
		};
		getPostsFun();
	}, [userId]);

	console.log(category);
	console.log(posts);

	return (
		<div className="Mypage-wrap">
			<SearchProfile />

			{/* 가운데 홈 글씨 */}
			<div className="mypage-main-txt">
				<h3>{Nickname}'s</h3>
				<h1>CODIARY</h1>
			</div>

			<div></div>

			<div className="folder-wrap">
				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>

				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
				<div className="folder">
					<h3>전체보기</h3>
					<ion-icon name="chevron-down-outline"></ion-icon>
				</div>
			</div>
		</div>
	);
};

export default Mypage;

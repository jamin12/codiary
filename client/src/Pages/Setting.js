import React, { useEffect, useState } from "react";
import SearchProfile from "../components/SearchProfile";
import styled from "styled-components";

import Myinfo from "../components/SettingMyinfo";
import MyCategory from "../components/SettingMycategory";
import axios from "axios";
import { personal, user, manage } from "../api";
import SettingMember from "../components/SettingMember";
import SettingReport from "../components/SettingReport";

// css
const Header = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding-bottom: 50px;
`;
const ContentsWrap = styled.div`
	display: flex;
	position: relative;

	width: 80%;
	// height: 752px;
	height: 70vh;

	margin: 0 auto;
	/* margin-top: 100px; */

	@media screen and (max-width: 1300px) {
	}
`;
const Title = styled.h1`
	font-size: 2.5rem;
	position: absolute;
	top: 0;
	left: 50%;
	width: 12rem;
	text-align: center;
	transform: translateX(-50%);
	border-bottom: 3px solid #c8c8c8;

	@media screen and (max-width: 1600px) {
		font-size: 2rem;
		width: 10rem;
	}
`;
const Menu = styled.ul`
	position: absolute;
	// background-color: red;
	top: 4rem;
	left: 0;
	width: 11rem;
	height: calc(100% - 4rem);
	border-right: 1px solid var(--gray900);

	li {
		border-bottom: 1px solid var(--gray200);
		width: 90%;
		margin: 0 auto;
	}
	li button {
		width: 100%;
		height: 3.5rem;
		font-size: 1.2rem;
		border: none;
		border-radius: 30px;
		margin: 10px auto;
		background-color: transparent;
		cursor: pointer;

		&:hover {
			background-color: #ececec;
		}
	}

	@media screen and (max-width: 1300px) {
		width: 9rem;
		height: 100%;
		li button {
			font-size: 1.2rem;
		}
	}
`;
const Contents = styled.div`
	width: 80%;
	height: calc(100% - 5rem);
	position: absolute;
	right: 0;
	top: 5rem;
	width: calc(100% - 13rem);

	@media screen and (max-width: 1300px) {
		width: calc(100% - 11rem);
	}
`;
// css end

const Setting = () => {
	const [content, setContent] = useState("info");

	const ClickButton = (e) => {
		const name = e.target.name;
		setContent(name);
	};

	const selectComponent = {
		info: <Myinfo name="" />,
		category: <MyCategory />,
		member: <SettingMember/>,
		report: <SettingReport/>,
	};

	// const [mySettings, setMySettings] = useState({});

	// const date = new Date().toISOString().split("T");
	// const today = (date[0] + " " + date[1].split(".")[0])

	/**
	 * 내 셋팅 페이지
	 */
	// useEffect(() => {
	// 	const getMySettingFun = async () => {
	// 		let getMySetting;
	// 		// 내 정보 조회
	// 		if (content === "info") {
	// 			getMySetting = await axios.get(
	// 				user.getMyInfo(),
	// 				{ withCredentials: true }
	// 			);
	// 			setMySettings(getMySetting.data.result_data);
	// 		}
	// 		// 내 카테고리 목록 조회
	// 		else if (content === "category") {
	// 			getMySetting = await axios.get(
	// 				personal.getPersonalMyCategory(),
	// 				{ withCredentials: true }
	// 			);
	// 			setMySettings(getMySetting.data.result_data);
	// 		}
	// 		// admin 회원 정보 조회
	// 		else if (content === 'member'){
	// 			getMySetting = await axios.get(
	// 				manage.getUsers(),
	// 				{ offset: 0, limit: 10 },
	// 				{ withCredentials: true }
	// 			)
	// 			setMySettings(getMySetting.data.result_data);
	// 		} 
			// 신고목록 조회
			// else if (content === 'report'){
			// 	getMySetting = await axios.get(
			// 		manage.getReport(-1, -1),
			// 		{ 
			// 			startdate: today,
			// 			offset: 0,
			// 			limit: 10,
			// 		},
			// 		{ withCredentials: true }
			// 	)
			// 	setMySettings(getMySetting.data.result_data);
			// }
	// 	};
	// 	getMySettingFun();
	// }, [content]);


	return (
		<>
			<Header style={{ zIndex: "999" }}>
				<SearchProfile />
			</Header>

			<ContentsWrap>
				<div>
					<Title>Setting</Title>
					<Menu>
						<li>
							<button onClick={ClickButton} name="info">
								내 정보 수정
							</button>
						</li>
						<li>
							<button onClick={ClickButton} name="category">
								카테고리 수정
							</button>
						</li>
						<li>
							<button onClick={ClickButton} name="member">
								회원정보 관리</button>
						</li>
						<li>
							<button onClick={ClickButton} name="report">
								신고목록 관리</button>
						</li>
					</Menu>

					{content && <Contents>{selectComponent[content]}</Contents>}
				</div>
			</ContentsWrap>
		</>
	);
};
export default Setting;

import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

import SearchProfile from "../components/SearchProfile";
// import Card from "../components/CarousalCard";
// import Carousel from '../components/3DCarousal'
import styled from "styled-components";
import { personal } from "../api/index";
import axios from "axios";

const VisitLike = () => {
	// card 컴포넌트에 보낼 파라미터
	// 안에 들어가는 배열의 갯수는 백엔드한테 받을 데이터
	// let cards = [
	//   {
	//     key: 1,  // 중복되지 않는 키 값 지정 // 값은 post_id
	//     content: (
	//       <Card id="1"
	//             img=""
	//             title="Hello~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!!~!"
	//             body="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	//             date="2022-08-08 12:12:12"
	//             user="user1"  />
	//     ),
	//     onClick: ((e) => {alert("Hello")})
	//   },
	//   {
	//     key: 2,
	//     content: (
	//       <Card id="2"
	//             img="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfOTIg/MDAxNTcwNzg1ODM3Nzc0.RDIwjsL18UXthepOZiBORxc-Wc-Xl2grAhD5Tc4Xjewg.P2r0EQzuYJ6r9Pbn69jGmCSIkft_uRWmeRdEyB19C1Qg.PNG.kkson50/sample_images_12.png?type=w800"
	//             title="Hello"
	//             body="Im body~!~!"
	//             date="2022-08-08 12:12:12"
	//             user="user1"/>
	//     )
	//   },
	//   {
	//     key: 3,
	//     content: (
	//       <Card id="3"
	//             img=""
	//             title="Hello"
	//             body="Im body~!~!"
	//             date="2022-08-08 12:12:12"
	//             user="user1"/>
	//     )
	//   },
	//   {
	//     key: 4,
	//     content: (
	//       <Card id="4"
	//             img="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfOTIg/MDAxNTcwNzg1ODM3Nzc0.RDIwjsL18UXthepOZiBORxc-Wc-Xl2grAhD5Tc4Xjewg.P2r0EQzuYJ6r9Pbn69jGmCSIkft_uRWmeRdEyB19C1Qg.PNG.kkson50/sample_images_12.png?type=w800"
	//             title="Hello"
	//             body="Im body~!~!"
	//             date="2022-08-08 12:12:12"
	//             user="user1"/>
	//     )
	//   },
	//   {
	//     key: 5,
	//     content: (
	//       <Card id="5"
	//             img="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMTFfOTIg/MDAxNTcwNzg1ODM3Nzc0.RDIwjsL18UXthepOZiBORxc-Wc-Xl2grAhD5Tc4Xjewg.P2r0EQzuYJ6r9Pbn69jGmCSIkft_uRWmeRdEyB19C1Qg.PNG.kkson50/sample_images_12.png?type=w800"
	//             title="Hello"
	//             body="Im body~!~!"
	//             date="2022-08-08 12:12:12"
	//             user="user1"/>
	//     )
	//   }
	// ];
	/**
	 * 0 : visit records 조회
	 * 1 : like records 조회
	 */
	const [visitLikeSelected, setVisitLikeSelected] = useState(1);

	const [visitLikeRecords, setVisitLikeRecords] = useState({});
	/**
	 * 임시 저장 게시물 목록 조회
	 */
	useEffect(() => {
		const getVisitLikeRecordFun = async () => {
			let getVisitLikeRecord;
			// 방문 목록 조회
			if (visitLikeSelected === 0) {
				getVisitLikeRecord = await axios.get(
					// TODO: params 바꾸기
					personal.getPersonalVisitRecord(),
					{ withCredentials: true, params: { offset: 1, limit: 2 } }
				);
				setVisitLikeRecords(getVisitLikeRecord.data.result_data);
			}
			// 좋아요 목록 조회
			else {
				getVisitLikeRecord = await axios.get(
					// TODO: params 바꾸기
					personal.getPersonalLikeRecord(),
					{ withCredentials: true, params: { offset: 1, limit: 2 } }
				);
				setVisitLikeRecords(getVisitLikeRecord.data.result_data);
			}
		};
		getVisitLikeRecordFun();
	}, [visitLikeSelected]);

  console.log(visitLikeRecords);
	return (
		<div>
			<SearchProfile />

			{/* 버튼을 누르면 각각 요청을 보내야함 */}
			{/* 파라미터를 바꿔주는게 */}
			<Wrap>
				<Carousel />
			</Wrap>
		</div>
	);
};

export default VisitLike;

const Wrap = styled.div`
	width: 1500px;
	height: 700px;
	margin: 200px auto 0 auto;
`;

const Carousel = styled.div`
	width: 90%;
	height: 100%;
	background-color: red;
`;

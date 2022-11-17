import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SearchProfile from "../components/SearchProfile";
import { personal } from "../api/index";
import { useSelector } from "react-redux";

const WritePage = () => {
	// 가변 인수 가져오기
	const { tmpposttId } = useParams();
	const [tmpPost, setTmpPost] = useState({});
	const { uniqueid } = useSelector((state) => state.auth.User);

	/**
	 * 포스트 가져오기
	 */
	useEffect(() => {
		const getTmpPostFun = async () => {
			const getTmpPost = await axios.get(
				personal.getPersonalTmppost(parseInt(tmpposttId)),
				{ withCredentials: true }
			);
			setTmpPost(getTmpPost.data.result_data);
		};
		getTmpPostFun();
	}, []);
	console.log(tmpPost)

	const deletePost = async () => {
		await axios.delete(personal.deletePersonalTmpPost(parseInt(tmpposttId)),
			{ withCredentials: true }
		);
		document.location.href = `/presave`;
	}
	// HTML
	return (
		<>
			<Header style={{ zIndex: "999" }}>
				<SearchProfile />
			</Header>

			<Wrap className="wrap">
				<ContentWrapBox className="inner-width">
					{/* 제목 및 헤더 */}
					<HeaderBox>
						<span className="write-data-box">
							<p className="userName">{uniqueid}</p>
							<p className="writeDate">{tmpPost.updated_at}</p>
						</span>
						<h1 className="title">{tmpPost.tmppost_title}</h1>
						<span className="cor-del-box">
							<a href={`/write/presave/${tmpposttId}`}>수정</a>/<p onClick={deletePost}>삭제</p>
						</span>
						{/* <hr/> */}
					</HeaderBox>
					{/* 본문내용 */}
					<ContentBox>
						<div dangerouslySetInnerHTML={{ __html: tmpPost?.tmppost_body_html?.replaceAll("&lt;", "<") }}>
						</div>
					</ContentBox>
				</ContentWrapBox>
			</Wrap>

		</>
	);
};
export default WritePage;

// 헤더
const Header = styled.div`
	position: relative;
	height: 100%;
	padding-bottom: 10px;
`;
const Wrap = styled.div`
	width: 80vw;
	@media screen and (max-width: 1600px) {
		padding-right: 60px;
		padding-left: 60px;
	}
	@media screen and (max-width: 1024px) {
		width: 90%;
	}
`;
// 카테고리박스
const CategoryBox = styled.div`
	position: relative;
	display: block;

	width: 13%;
	z-index: 100;
	.category {
		position: sticky;
		top: 250px;
		border-left: 2px solid rgba(173, 167, 167, 0.7);
		box-sizing: border-box;
		padding: 15px 0 15px 10px;
	}
	.category ul {
		box-sizing: border-box;
		margin-top: 5px;
	}
	.category ul li {
		width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	@media screen and (max-width: 1024px) {
		display: none;
		margin: 0 auto;
	}
`;
const ContentWrapBox = styled.div`
	width: 70%;
	margin: 0 auto;

	@media screen and (max-width: 1024px) {
		width: 100%;
		.content-box {
			width: 90%;
		}
	}
`;
const HeaderBox = styled.div`
	display: flex;
	position: relative;
	border-bottom: 2px solid #c8c8c8;
	.title {
		width: 100%;
		font-weight: bold;
		font-size: 60px;
		text-align: center;
	}
	span {
		position: absolute;
	}
	.write-data-box {
		left: 0;
		bottom: 0;
	}
	.cor-del-box {
		display: flex;
		right: 0;
		bottom: 0;
	}
	.cor-del-box p {
		margin: 2px;
		padding: 0 3px;
		cursor: pointer;
	}

	@media screen and (max-width: 1600px) {
		.title {
			font-size: 3rem;
		}
		.span {
			font-size: 0.87rem;
		}
	}
`;
const ContentBox = styled.div`
	margin: 0 auto 50px auto;
	.sub-title {
		margin-top: 30px;
		margin-bottom: 10px;
	}

	@media screen and (max-width: 1600px) {
		.sub-title {
			font-size: 1.2rem;
		}
		p {
			font-size: 1rem;
		}
	}
`;
const TagVisiteBox = styled.div`
	margin: 0 auto 5px auto;
	display: flex;
	justify-content: space-between;

	padding-bottom: 8px;
	border-bottom: 2px solid #c8c8c8;

	@media screen and (max-width: 1600px) {
		.tag-box {
			font-size: 0.89rem;
		}
	}
`;
const TagBox = styled.div`
	display: flex;
	max-width: 600px;
	p {
		border: 1px solid #000;
		border-radius: 50px;
		padding: 3px 20px;
		margin: 0 15px;
		margin-right: 5px;
	}
`;
const VisiteBox = styled.div`
	display: flex;
	width: 170px;
	justify-content: space-between;
	margin: 0 10px;
	.total-visite,
	.today-visite,
	.like-good {
		display: flex;
		align-items: center;
		font-size: 12px;
		line-height: 30px;
	}
	.total-visite ion-icon,
	.today-visite ion-icon,
	.like-good ion-icon {
		width: 20px;
		height: 20px;
		display: inline-block;
		margin: 0 3px;
	}
	.like-good {
		position: relative;
		width: 40px;
		height: 30px;
		display: flex;
	}
	.like-good p {
		position: absolute;
		right: 2px;
	}
	.like-good ion-icon {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	.like-good > input {
		display: none;
	}
`;
const CommentBox = styled.div`
	margin-top: 30px;
	/* 댓글 창 */
	.text-box {
		width: 90%;
		margin: 0 auto 10px;
	}

	@media screen and (max-width: 1600px) {
		width: 97%;
		margin-left: auto;
		margin-right: auto;
	}
	@media screen and (max-width: 1024px) {
		width: 90%;
	}
`;
const ReplyBox = styled.div`
	/* width: 60%; */
	margin-top: 15px;
	margin-left: 40px;
	.text-box {
		width: 90%;
		margin: 0 auto 10px;
	}

	@media screen and (max-width: 1600px) {
		width: 93%;
	}
	@media screen and (max-width: 1024px) {
		width: 85%;
		margin-left: 120px;
		background-color: red;
	}
`;
/* 날짜박스 */
const DateBox = styled.div`
	display: flex;
	width: 90%;
	margin: 0 auto;
	align-items: flex-end;
	.btn-reply {
		cursor: pointer;
		font-size: 0.9rem;
		margin-right: 10px;
	}
	.date {
		font-size: 0.8rem;
		color: #9e9e9e;
	}
`;
const ProfileBox = styled.div`
	display: flex;
	padding-bottom: 5px;
	p {
		font-size: 1.2rem;
		text-align: center;
		margin-top: -2px;
	}
	/* 프로필 이미지 */
	img {
		width: 30px;
		height: 30px;
		background-color: palevioletred;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}
	@media screen and (max-width: 1600px) {
		img {
			width: 25px;
			height: 25px;
		}
	}
`;
// 서브타이틀 박스
const SubTitleBox = styled.div`
	width: 13%;
	z-index: 100;
	right: 0;
	ul {
		position: sticky;
		top: 250px;
		border-left: 2px solid rgba(173, 167, 167, 0.7);
		padding: 15px 0;
	}
	ul li {
		width: 80%;
		margin: 0 auto;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	ul li::before {
		content: '" ';
	}
	ul > li::after {
		content: ' "';
	}
	@media screen and (max-width: 1024px) {
		display: none;
		margin: 0 auto;
	}
`;

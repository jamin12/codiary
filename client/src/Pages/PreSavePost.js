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
  margin-top: 0;
  /* @media screen and (max-width: 1600px) {
    padding-right: 60px;
    padding-left: 60px;
  }
  @media screen and (max-width: 1024px) {
    width: 90%;
  } */
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
	width: 100%;
	display: flex;
	position: relative;
	border-bottom: 2px solid #c8c8c8;
  .title {
    width: 70%;
    height: 100%;
    word-break: keep-all;
    margin: 0 auto;
    font-weight: bold;
    font-size: 2.5rem;
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

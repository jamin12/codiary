import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import SearchProfile from "../components/SearchProfile";
import SimilarPost from "../components/SimilarPost";
import { personal } from "../api/index";

const WritePage = () => {
  const [post, setPost] = useState({});
	useEffect(() => {
    async function getPostFuntion(){
      const getPost = await axios.get(personal.getPersonalPost("test", 1));
      setPost(getPost.data.result_data);
    }
    getPostFuntion();
	}, []);

  console.log(post);
	// HTML
	return (
		<>
			<Header style={{ zIndex: "999" }}>
				<SearchProfile />
			</Header>

			<Wrap className="wrap">
				{/* 카테고리창 - sticky 이용 */}
				<CategoryBox className="sticky-box">
					{/* <h3>사용자's CODIARY</h3> */}
					<div className="category">
						- 카테고리명 -
						<ul>
							<li>Category 1qwertyuiasdggjfgfghfghdhtg</li>
							<li>Category 1</li>
							<li>Category 1</li>
							<li>Category 1</li>
						</ul>
					</div>
				</CategoryBox>

				<ContentWrapBox className="inner-width">
					{/* 제목 및 헤더 */}
					<HeaderBox>
						<span className="write-data-box">
							<p className="userName">user1</p>
							<p className="writeDate">2022.01.01</p>
						</span>
						<h1 className="title">TITLES</h1>
						<span className="cor-del-box">
							<p>수정</p>/<p>삭제</p>
						</span>
						{/* <hr/> */}
					</HeaderBox>

					{/* 본문내용 */}
					<ContentBox>
						<h3 className="sub-title">SubTitle</h3>
						<p>일단 뭔가를 적어야하니까 적어보겟읍니다.</p>
						<h3 className="sub-title">What is Lorem Ipsum?</h3>
						<p>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap
							into electronic typesetting, remaining essentially
							unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum
							passages, and more recently with desktop publishing
							software like Aldus PageMaker including versions of
							Lorem Ipsum.Contrary to popular belief, Lorem Ipsum
							is not simply random text. It has roots in a piece
							of classical Latin literature from 45 BC, making it
							over 2000 years old. Richard McClintock, a Latin
							professor at Hampden-Sydney College in Virginia,
							looked up one of the more obscure Latin words,
							consectetur, from a Lorem Ipsum passage, and going
							through the cites of the word in classical
							literature, discovered the undoubtable source. Lorem
							Ipsum comes from sections 1.10.32 and 1.10.33 of "de
							Finibus Bonorum et Malorum" (The Extremes of Good
							and Evil) by Cicero, written in 45 BC. This book is
							a treatise on the theory of ethics, very popular
							during the Renaissance. The first line of Lorem
							Ipsum, "Lorem ipsum dolor sit amet..", comes from a
							line in section 1.10.32. The standard chunk of Lorem
							Ipsum used since the 1500s is reproduced below for
							those interested. Sections 1.10.32 and 1.10.33 from
							"de Finibus Bonorum et Malorum" by Cicero are also
							reproduced in their exact original form, accompanied
							by English versions from the 1914 translation by H.
							Rackham.
						</p>
						<h3 className="sub-title">Why do we use it?</h3>
						<p>
							It is a long established fact that a reader will be
							distracted by the readable content of a page when
							looking at its layout. The point of using Lorem
							Ipsum is that it has a more-or-less normal
							distribution of letters, as opposed to using
							'Content here, content here', making it look like
							readable English. Many desktop publishing packages
							and web page editors now use Lorem Ipsum as their
							default model text, and a search for 'lorem ipsum'
							will uncover many web sites still in their infancy.
							Various versions have evolved over the years,
							sometimes by accident, sometimes on purpose
							(injected humour and the like).
						</p>
					</ContentBox>

					{/* 태그 & 방문자수 */}
					<TagVisiteBox>
						<TagBox>
							<p>TAG</p>
							<p>머시깽이머시깽이</p>
						</TagBox>

						<VisiteBox>
							<div className="total-visite">
								<ion-icon name="people-outline"></ion-icon>
								200
							</div>
							<div className="today-visite">
								<ion-icon name="people-outline"></ion-icon>
								23
							</div>
							<div className="like-good">
								<label for="good">
									<ion-icon name="heart-outline"></ion-icon>
								</label>
								<input type="checkbox" id="good" />
								{/* <ion-icon name="heart"></ion-icon> */}
								<p>20</p>
							</div>
						</VisiteBox>
					</TagVisiteBox>

					{/* 댓글 */}
					<CommentBox>
						<ProfileBox>
							<img src="" alt=""></img>
							<p>user2</p>
						</ProfileBox>
						<p className="text-box">
							일단 글자를 한 번 ㅈㄴ 길게 적어봐야할 것 같아서 한
							번test문자 넣어봄 It is a long established fact that
							a reader will be distracted by the readable content
							of a page when looking at its layout. The point of
							using Lorem Ipsum is that it has a more-or-less
							normal distribution of letters, as opposed to using
							'Content here, content here', making it look like
							readable English. Many desktop publishing packages
							and web page editors now use Lorem Ipsum as their
							default model text, and a search for 'lorem ipsum'
							will uncover many web sites still in their infancy.
							Various versions have evolved over the years,
							sometimes by accident, sometimes on purpose
							(injected humour and the like).
						</p>
						<DateBox>
							<p className="btn-reply">답글쓰기</p>
							<p className="date">2022.02.02 12:12</p>
						</DateBox>
					</CommentBox>

					{/* 덧글 */}
					<ReplyBox>
						<ProfileBox>
							<img src="" alt=""></img>
							<p>user2</p>
						</ProfileBox>
						<p className="text-box">
							너무 도움이 많이 되었어요~ 감사합니다^^ <br />{" "}
							번창하세요!~!~
						</p>
						<DateBox>
							<p className="date">2022.02.02 12:12</p>
						</DateBox>
					</ReplyBox>
				</ContentWrapBox>

				{/* subtitle창 - sticky 이용 */}
				<SubTitleBox className="sticky-box">
					<ul>
						<li>Subtitle</li>
						<li>What is Lorem Ipsum?</li>
						<li>Why do we use it?</li>
					</ul>
				</SubTitleBox>
			</Wrap>
			{/* 비슷한 게시물 props로 태그같은거 보내야함 */}
			<SimilarPost />
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
		margin-top: 10px;
	}
	.category ul > li {
		width: 80%;
		margin: 0 auto;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.category ul > li::before,
	.category ul > li::after {
		content: ' " ';
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

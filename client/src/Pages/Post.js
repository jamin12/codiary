import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import SearchProfile from "../components/SearchProfile";
import SimilarPost from "../components/SimilarPost";
import { personal } from "../api/index";
import { useSelector } from "react-redux";


const WritePage = () => {
	// 가변 인수 가져오기
	const { userId, postId } = useParams();
	const [post, setPost] = useState({});
	const [refindePost, setrefindePost] = useState("");
	const [comments, setComments] = useState([]);
	const [checkCommentChange, setCheckCommentChange] = useState(0);
	const [taglist, setTaglist] = useState([]);
	const [associatePost, setAssociatePost] = useState({});
	const [isCheckingBox, setIsCheckingBox] = useState(false)
	const [commentValue, setCommentValue] = useState("");
	const { uniqueid } = useSelector((state) => state.auth.User);
	const tagh1IdList = [];
	const tagh2IdList = [];


	/**
	 * 포스트 가져오기
	 */
	useEffect(() => {
		const getPostFun = async () => {
			const getPost = await axios.get(
				personal.getPersonalPost(userId, parseInt(postId)),
				{ withCredentials: true }
			);
			setPost(getPost.data.result_data);
			setIsCheckingBox(getPost.data.result_data.checkLike)
			// 정규식 이용해 h1 h2 태그에 id값 넣어주기
			const p = getPost.data.result_data.getPost.post_body_html.replaceAll("&lt;", "<").match(/<h(1|2)>(.*?)<\/h(1|2)>/g);
			for (let index = 0; index < p?.length; index++) {
				taglist.push(`${p[index].replaceAll(/<[^>]*>?/g, "")}${index}`);
				if (p[index][2] === '1') {
					tagh1IdList.push(`${p[index].replaceAll(/<[^>]*>?/g, "")}${index}`);
				} else {
					tagh2IdList.push(`${p[index].replaceAll(/<[^>]*>?/g, "")}${index}`);
				}
			}
			let datahtml = getPost.data.result_data.getPost.post_body_html;
			tagh1IdList.forEach((tagId) => {
				datahtml = datahtml.replaceAll("&lt;", "<").replace(/<h(1)>/i, `<h1 id= "${tagId}">`);
			})
			tagh2IdList.forEach((tagId) => {
				datahtml = datahtml.replaceAll("&lt;", "<").replace(/<h(2)>/i, `<h2 id= "${tagId}">`);
			})
			setrefindePost(datahtml);
		};
		getPostFun();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postId, userId, isCheckingBox]);
	/**
	 * 연관 포스트 가져오기
	 */
	useEffect(() => {
		const getAssociatePostFun = async () => {
			const getAssociatePost = await axios.get(
				personal.associatePersonalposts(postId),
			);
			setAssociatePost(getAssociatePost.data.result_data);
		};

		getAssociatePostFun();
	}, [postId]);

	/**
	 * 방문 기록 저장
	 */
	useEffect(() => {
		if (uniqueid !== '') {
			const createVisitRecordFun = async () => {
				await axios.post(personal.createPersonalVisitRecord(),
					{ post_id: postId },
					{ withCredentials: true });
			};
			createVisitRecordFun();
		}
	}, [postId, uniqueid])
	/**
 * 댓글 가져오기
 */
	useEffect(() => {
		const getCommentsFun = async () => {
			const getComments = await axios.get(
				personal.getComments(postId)
			);
			setComments(getComments.data.result_data);
		};
		setCheckCommentChange(0);
		getCommentsFun();
	}, [postId, checkCommentChange]);

	/**
	 * 댓글 입력
	 */
	const onChangeComment = (e) => {
		setCommentValue(e.target.value)
	}

	/**
	 * 댓글 저장
	 */
	const onClickCommentSave = async () => {
		if (commentValue === "") {
			alert("댓글을 입력해주세요");
		}
		await axios.post(personal.createComment(),
			{
				post_id: postId,
				comments_body: commentValue
			},
			{ withCredentials: true }
		);
		setCheckCommentChange(1);
		setCommentValue("")
	}

	/**
	 * 좋아요 체크
	 */
	const checkingCheckedBox = () => {
		if (uniqueid !== '') {
			setIsCheckingBox(!isCheckingBox)
		}
	}

	const checkLike = async () => {
		if (uniqueid !== '') {
			if (!isCheckingBox) {
				await axios.post(personal.createPersonalLikeRecord(),
					{
						post_id: postId,
					},
					{ withCredentials: true }
				);
			} else {
				await axios.delete(personal.deletePersonalLikeRecordByPostId(postId),
					{ withCredentials: true }
				);
			}
		} else {
			alert("로그인을 해주십시오")
		}
	}
	const deletePost = async () => {
		await axios.delete(personal.deletePersonalPost(postId),
			{ withCredentials: true }
		);
		document.location.href = `/${userId}`;
	}

	useEffect(() => {

	}, [post.getPost?.post_body_html])
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
						{post.getPost?.category?.category_name}
						<ul>
							{
								post.getPost?.category?.posts.map(e => {
									return (
										<a href={`/${userId}/${e.post_id}`}><li>{e.post_title}</li></a>
									)
								})
							}
						</ul>
					</div>
				</CategoryBox>

				<ContentWrapBox className="inner-width">
					{/* 제목 및 헤더 */}
					<HeaderBox>
						<span className="write-data-box">
							<a className="userName" href={`/${post.user?.user_detail?.user_unique_id}`}>{post.user?.user_detail?.user_unique_id}</a>
							<p className="writeDate">{post.getPost?.updated_at}</p>
						</span>
						<h1 className="title">{post.getPost?.post_title}</h1>
						{uniqueid === userId &&
							<span className="cor-del-box">
								<a href={`/write/${postId}`}>수정</a>/<p onClick={deletePost}>삭제</p>
							</span>
						}
						{/* <hr/> */}
					</HeaderBox>

					{/* 본문내용 */}
					<ContentBox>
						<div dangerouslySetInnerHTML={{ __html: refindePost }}>
						</div>
					</ContentBox>

					{/* 태그 & 방문자수 */}
					<TagVisiteBox>
						<TagBox>
							{
								post.getPost?.tag[0].tag_name.split("/n").map((e) => {
									return (
										<p>
											{e}
										</p>
									)
								})
							}
						</TagBox>

						<VisiteBox>
							<div className="total-visite">
								<ion-icon name="people-outline"></ion-icon>
								{post.getPost?.measurement?.total_visit_count}
							</div>
							<div className="today-visite">
								<ion-icon name="people-outline"></ion-icon>
								{post.getPost?.measurement?.today_visit_count}

							</div>
							<div className="like-good">
								<label for="good">
									<ion-icon name="heart-outline"></ion-icon>
								</label>
								{/* TODO(경민 -> 이묘): 좋아요 숫자 밑으로 내리고 색 표시 나도록 하세용*/}
								<input type="checkbox" id="good" onChange={checkingCheckedBox} onClick={checkLike} checked={isCheckingBox} />
								{/* <ion-icon name="heart"></ion-icon> */}
								<p>{post.getPost?.like_count}</p>
							</div>
						</VisiteBox>
					</TagVisiteBox>

					{/* 댓글 입력창 */}
					<InputCommnetBox>
						<textarea placeholder="댓글을 입력하세요!"
							value={commentValue}
							onChange={(e) => onChangeComment(e)}></textarea>
						<button onClick={onClickCommentSave}>저장</button>
					</InputCommnetBox>

					{/* 댓글 */}
					{
						comments.map((e) => {
							if (e.sub_comments_id === null) {
								return (
									<CommentBox>
										<ProfileBox>
											<a href={`/${e.users.user_detail?.user_unique_id}`}>
												<img src={e.users.user_detail?.user_img} alt=""></img>
											</a>
											<a href={`/${e.users.user_detail?.user_unique_id}`}>{e.users.user_detail?.user_unique_id}</a>
										</ProfileBox>
										<p className="text-box">
											{e.comments_body}
										</p>
										<DateBox>
											<p className="btn-reply">답글 쓰기</p>
											{/* TODO(경민 -> 이묘): 생성 수정 삭제 텍스트 박스 만들기*/}
											<p className="date">{e.updated_at}</p>
										</DateBox>
									</CommentBox>
								)
							} else {
								return (
									// {/* 덧글 */ }
									<ReplyBox>
										<ProfileBox>
											<a href={`/${e.users.user_detail?.user_unique_id}`}>
												<img src={e.users.user_detail?.user_img} alt=""></img>
											</a>
											<a href={`/${e.users.user_detail?.user_unique_id}`}>{e.users.user_detail?.user_unique_id}</a>
										</ProfileBox>
										<p className="text-box">
											{e.comments_body}
										</p>
										<DateBox>
											<p className="date">{e.updated_at}</p>
										</DateBox>
									</ReplyBox>
								)
							}

						})
					}

				</ContentWrapBox>

				{/* subtitle창 - sticky 이용 */}
				{/* TODO(경민 -> 이묘): h1 h2 태그 기준으로 이동 태그 만들기*/}
				<SubTitleBox className="sticky-box">
					<ul>
						{
							taglist.map((tag) => {
								return (
									<li><a href={`#${tag}`}>{tag}</a></li>
								)
							})
						}
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
		top: 0.5px;
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

// 댓글 입력
const InputCommnetBox = styled.div`
	width: 100%;
	height: 150px;
	
	position: relative;

	textarea{
		width: 100%;
		height: 70%;
		border-radius: 5px;
		border: 2px solid var(--gray100);
		box-sizing: border-box;
		padding: 5px;
		resize: none;
	}

	button{
		width: 80px;
		padding: 5px 0;
		border: 2px solid var(--gray400);
		background-color: var(--gray100);
		border-radius: 15px;

		position: absolute;
		bottom: 0;
		right: 0;
		color: var(--gray600);

		cursor: pointer;
	}
`

// 댓글
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
// 덧글
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

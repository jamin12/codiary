import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchProfile from "../components/SearchProfile";

const Searchpage = () => {
	const Wrap = styled.div`
		display: block;
		margin-top: 150px;
		text-align: center;

		font-size: 1.3rem;
	`;

	const PostWrap = styled.div`
		width: 1433px;
		display: flex;
		flex-wrap: wrap;
		margin: 50px auto;

		div {
			margin: 0 50px 40px 0;
		}
		div:nth-child(3n) {
			margin-right: 0;
		}

		@media screen and (max-width: 1600px) {
			width: 1100px;
			div {
				margin: 0 30px 40px 0;
			}
		}
		@media screen and (max-width: 1024px) {
			width: 800px;
			justify-content: space-between;

			div:nth-child(2n) {
				margin-right: 0;
				/* margin: 0; */
			}
			div:nth-child(3n) {
				margin: 0 30px 40px 0;
				/* margin: 0 0 40px 0; */
			}
		}
	`;

	const Post = styled.div`
		position: relative;
		width: 400px;
		height: 250px;
		border-radius: 30px;
		border: 2px solid #000;
		padding: 20px;

		:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		h2 {
			position: absolute;
			left: 30px;
			font-size: 1.6rem;
		}
		p {
			position: absolute;
		}
		.text {
			top: 70px;
			left: 50%;
			transform: translateX(-50%);
			width: 85%;
			overflow: hidden;
			color: rgba(0, 0, 0, 0.8);
			font-size: 1rem;

			display: -webkit-box;
			word-break: break-word;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
			text-overflow: ellipsis;
		}
		.date {
			bottom: 30px;
			right: 40px;
			font-size: 0.87rem;
			color: rgba(0, 0, 0, 0.5);
		}

		@media screen and (max-width: 1600px) {
			width: 300px;
			height: 180px;

			.text {
				font-size: 0.9rem;
				-webkit-line-clamp: 3;
			}
		}
		@media screen and (max-width: 1024px) {
			width: 41%;
		}
	`;

	const MainSearchBar = styled.input`
		width: 50%;
		max-width: 1500px;
		height: auto;
		font-size: 1.2rem;
		padding: 0.8rem;
		position: absolute;
		top: 19%;
		left: 50%;
		transform: translate(-45%, -50%);
		border-radius: 15px;
		border: 1px solid #a5a5a5;
	`;

	return (
		<>
			<SearchProfile />
			{/* 검색창 */}
			<MainSearchBar
				type="text"
				placeholder="SEARCH"
				// onKeyPress={enterSearchPress}
				// onChange={changeSearch}
				// value={searchWord}
			></MainSearchBar>
			<Wrap>
				<PostWrap>
					<Post>
						<h2>Title</h2>
						<p className="text">
							군인 또는 군무원이 아닌 국민은 대한민국의
							영역안에서는 중대한 군사상
							기밀·초병·초소·유독음식물공급·포로·군용물에 관한
							죄중 법률이 정한 경우와 비상계엄이 선포된 경우를
							제외하고는 군사법원의 재판을 받지 아니한다.
						</p>
						<p className="date">2022.01.01</p>
					</Post>
					<Post />
					<Post />

					<Post />
					<Post />
				</PostWrap>
			</Wrap>
		</>
	);
};
export default Searchpage;

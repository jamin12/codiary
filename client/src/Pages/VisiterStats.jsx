import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoChevronDownOutline } from "react-icons/io5";
import {
	IoPeopleOutline,
	IoPersonOutline,
	IoHeartCircleOutline,
} from "react-icons/io5";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import SearchProfile from "../components/SearchProfile";
import StatePost from "../components/VisiterStatePost";
import Chart from "../components/VisiterStatChart";
import axios from "axios";
import { measurement } from "../api";

const ChartWrap = styled.div`
	width: 100%;
	height: 460px;

	.chart-header {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: space-between;

		.buttons {
			background-color: var(--gray100);
			color: var(--gray400);
			:focus {
				background-color: var(--gray500);
				color: var(--gray100);
			}
		}
	}
`;
const TopWrap = styled.div`
	width: 100%;
	height: 240px;
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
	cursor: pointer;

	> div {
		width: 30%;
		height: 100%;
		background-color: var(--gray50);
		border-radius: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		transition: 0.2s;
		.top-icon {
			width: 100px;
			height: 100px;
			color: var(--gray600);
		}
		p {
			color: var(--gray600);
		}
		h4 {
			color: var(--gray600);
		}

		:hover {
			background-color: var(--gray100);
			.top-icon {
				color: var(--gray800);
			}
			h4 {
				color: var(--gray800);
			}
		}

		:checked {
			background-color: var(--gray600);
		}
	}
`;
const PostWrap = styled.div`
	position: relative;
	width: 100%;
	height: 690px;

	margin: 55px 0px;

	.search-box {
		width: 350px;
		height: 42px;
		display: flex;
		justify-content: space-between;

		.selectBox {
			width: 70%;
			height: 100%;
			border-radius: 10px;
		}

		button {
			width: 80px;
			border-radius: 10px;
			border: none;
			transition: 0.2s;
			background-color: var(--gray200);

			:hover {
				background-color: var(--gray400);
				color: var(--gray50);
			}
		}
	}

	.post-box {
		width: 100%;
		/* height: calc(100%-55px); */
		height: 85%;
		margin-top: 15px;

		align-items: center;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.pagination-box {
		width: 200px;
		height: 30px;
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);

		background-color: orange;
	}
`;

const VisiterStats = () => {
	// 서버에서 받아와야하는 top 게시글 이름 useState
	const [topTotalVisiter, setTopTotalVisiter] = useState({});
	const [topDayVisiter, setTopDayVisiter] = useState({});
	const [topGood, setGood] = useState({});
	const [graphInfo, setgraphInfo] = useState([]);
	const [myPosts, setMyPosts] = useState([]);
	const [graphtype, setgraphtype] = useState(0);
	const [viewMoreOffset, setViewMoreOffset] = useState(1);
	
	// 차트에 표시되는 게시물id useState
	const [chartPostId, setChartPostId] = useState(graphInfo.post_id);
	// const [chartPostTitle, setChartPostTitle] = useState(topTotalVisiter.posts.post_title);
	const [chartPostTitle, setChartPostTitle] = useState();

	// 검색시에 사용되는 porttype, criterion
	const [searchPorttype, setSearchPorttype] = useState(0)
	const [searchCriterion, setSearchCriterion] = useState(0)

	const [selected, setSelected] = useState("방문자 오름차순");
	const porttype = {
		"방문자": 0,
		"총방문자": 1,
		"좋아요": 2,
		"업데이트": 3
	};
	const criterion = {
		"오름차순": 0,
		"내림차순": 1
	};
	const searchOption = [
		"방문자 오름차순",
		"방문자 내림차순",
		"총방문자 오름차순",
		"총방문자 내림차순",
		"좋아요 오름차순",
		"좋아요 내림차순",
		"업데이트 오름차순",
		"업데이트 내림차순",
	];

	/**
	 * select box의 value onChange 함수
	 * @param {*} e 
	 */
	const onChangeSelect = (e) => {
		setSelected(e.target.value)
	};
	/**
	 * 검색 버튼을 눌렀을 때 onClick 함수
	 */
	const onClickSearch = () => {
		const word = selected.split(" ");
		setSearchPorttype(porttype[word[0]])
		setSearchCriterion(criterion[word[1]])

		// 검색 버튼을 다시 누르면 더보기 눌렀던거 초기화
		setViewMoreOffset(1);
	}

	/**
	 * 그래프 타입(일,주,달)선택 onClick
	 * @param {*} e 
	 */
	const onClickGraphType = (e) => {
		setSelected(e.target.value);
		setgraphtype(e.target.id);
	}

	/**
	 * 게시물 더보기 onClick 함수
	 */
	const onClickViewMore = () => {
		setViewMoreOffset(viewMoreOffset+9)
	}

	/**
	 * 차트에 표시되는 게시물 onClick 함수
	 */
	const onClickShowGraph = (e) => {
		setChartPostId(e.target.id)
		console.log(e.target.id)
	}

	/**
	 * 통계 페이지 초기 데이터 가져오기
	 */
	useEffect(() => {
		const getInitMesurementDataFun = async () => {
			const getInitMesurementData = await axios.get(
				measurement.getMeasurementInit(),
				{ withCredentials: true }
			);
			setTopDayVisiter(
				getInitMesurementData.data.result_data.bestPosts
					.getBestTodayVisit
			);
			setTopTotalVisiter(
				getInitMesurementData.data.result_data.bestPosts
					.getBestTotalVisit
			);
			setGood(
				getInitMesurementData.data.result_data.bestPosts.getBestLike
			);
			setgraphInfo(getInitMesurementData.data.result_data.graphData);
			setMyPosts(getInitMesurementData.data.result_data.myPosts);
		};
		getInitMesurementDataFun();
	}, []);

	/**
	 * 그래프 가져오기
	 */
	useEffect(() => {
		const getGraphFun = async () => {
			const getGraph = await axios.get(
				measurement.getGraphData(graphtype, chartPostId),
				{ withCredentials: true }
			);
			setgraphInfo(getGraph.data.result_data);
		};
		getGraphFun();
	}, [chartPostId, graphtype]);

	/**
	 * 내 포스트 리스트 가져오기
	 */
	useEffect(() => {
		const getMyPostsFun = async () => {
			const getMyPosts = await axios.get(
				measurement.getMyPosts(searchPorttype, searchCriterion),
				{ withCredentials: true, params: { offset: viewMoreOffset, limit: 9 } }
			);
			setMyPosts(getMyPosts.data.result_data);
		};
		getMyPostsFun();
	}, []);

	return (
		<MainWrap>
			<SearchProfile />

			<div className="contentsWrap">
				{/* 차트 부분 뭉쳐놓은 div */}
				<ChartWrap>
					<div className="chart-header">
						<h3>게시글이름</h3>

						<ButtonGroup
							aria-label="Basic example"
							className="button-box"
						>
							<Button variant="secondarye" className="buttons" id={0} onClick={onClickGraphType}>							}}>
								DATE
							</Button>

							<Button variant="secondarye" className="buttons" id={1} onClick={onClickGraphType}>							}}>
								WEEK
							</Button>

							<Button variant="secondarye" className="buttons" id={2} onClick={onClickGraphType}>							}}>
								MONTH
							</Button>
						</ButtonGroup>
					</div>
					<Chart 
						// title = {}
						post = {chartPostId}
						graphtype={graphtype}
						graphData={graphInfo}

					/>
				</ChartWrap>

				{/* top박스들을 뭉쳐놓은 div */}
				<TopWrap>
					<div className="top-total-visiter"
					id={topTotalVisiter.post_id}
					onClick={onClickShowGraph}>
						<IoPeopleOutline className="top-icon" id={topTotalVisiter.post_id} />
						<p id={topTotalVisiter.post_id}>누적 방문자수 TOP </p>
						<h4>{topTotalVisiter.post_title}</h4>
					</div>
					<div className="top-total-visiter"
					id={topDayVisiter.post_id}
					onClick={onClickShowGraph}>
						<IoPersonOutline className="top-icon" id={topDayVisiter.post_id}/>
						<p id={topDayVisiter.post_id}>일일 방문자수 TOP</p>
						<h4>{topDayVisiter.post_title}</h4>
					</div>
					<div className="top-total-visiter"
					id={topGood.post_id}
					onClick={onClickShowGraph}>
						<IoHeartCircleOutline className="top-icon" id={topGood.post_id}/>
						<p id={topGood.post_id}>좋아요수 TOP</p>
						<h4>{topGood.post_title}</h4>
					</div>
				</TopWrap>

				{/* 포스트 box를 뭉쳐놓은 div */}
				<PostWrap>
					<div className="search-box">
						<select
							className="selectBox"
							onChange={onChangeSelect}
							value={selected}
						>
							{searchOption.map((list) => (
								<option value={list} key={list}>
									{list}
								</option>
							))}
						</select>

						<button onClick={onClickSearch}>검색</button>
					</div>

					<div className="post-box">
						{
							// eslint-disable-next-line array-callback-return
							myPosts.map((post) => {
								if(searchPorttype===0 || searchPorttype===1){
									return(
										<StatePost
										title={post.posts.post_title}
										date= {post.posts.updated_at}
										totalVisiter={post.total_visit_count}
										todayVisiter={post.today_visit_count}
										good={post.posts.like_count}

										id={post.posts.post_id}
										setChartPostId={setChartPostId}
										/>
									)
								}
								else{
									<StatePost
										title={post.post_title}
										date= {post.updated_at}
										totalVisiter={post.total_visit_count}
										todayVisiter={post.today_visit_count}
										good={post.like_count}

										id={post.post_id}
										setChartPostId={setChartPostId}
									/>
								}
							})
						}
					</div>
				</PostWrap>

				<div className="btn-postview-more" onClick={onClickViewMore} postLength={myPosts.length}>
					<IoChevronDownOutline/>
				</div>
			</div>
		</MainWrap>
	);
};
export default VisiterStats;

/**
 * css
 */
const MainWrap = styled.div`
	width: 100%;

	> .contentsWrap {
		width: 90%;
		max-width: 1500px;
		margin: 0 auto;
		margin-bottom: 60px;

		> .btn-postview-more{
			display: ${props => props.postLength>9 ? "flex" : "none"};
			justify-content: center;
			align-items: center;
			height: 40px;
			font-size: 30px;
			color: var(--gray400);
			transition: 0.3s;
			cursor: pointer;

			:hover{
				color: var(--gray600);
				background-color: var(--gray50);
			}
		}
	}


`;

import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/CarousalCard";
import { Link } from "react-router-dom";
import { main } from "../api/index";
import axios from "axios";
import Login from "../components/Login.jsx";

const MainWrap = styled.div`
	.container {
		width: 100%;
		height: 100vh;
		background-color: var(--gray100);
		position: relative;

		.home-title-popular {
			text-align: center;
			padding: 70px 0 50px 0;
		}
	}
  #popularity-text{

  }

  .home-search {
		background-color: #38393d;
		/* background-image: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0) ),
          url(../../IMG/얼룩무늬.svg); */
		background-size: cover;
	}

	.home-footer {
		width: 100%;
		height: 200px;
		background-color: var(--gray800);
	}
`;
const MainSearchBar = styled.input`
	width: 50%;
	max-width: 1500px;
	height: auto;
	font-size: 1.2rem;
	padding: 0.8rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-45%, -50%);
	border-radius: 15px;
	border: 1px solid #a5a5a5;
`;
const HomeTitle = styled.div`
	font-size: 2.5rem;
	font-weight: bold;
	width: 100%;
	text-align: center;
	position: absolute;
	top: 35%;
	left: 50%;
	transform: translate(-50%, 0);
	color: white;
`;
const FooterText = styled.p`
	color: #a1a1a1;
	text-align: center;
	p:first-child {
		padding-top: 60px;
	}
`;
const ProfileIMG = styled.div`
	width: 40px;
	height: 40px;
	position: fixed;
	top: 40px;
	right: 40px;
	border-radius: 50%;
	overflow: hidden;
	z-index: 100;
	cursor: pointer;

	/* background-color: red; */
	background-image: url(${(props) => props.img || "https://images.unsplash.com/photo-1662581871665-f299ba8ace07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;
const Menu = styled.div`
	position: fixed;
	right: 40px;
	top: 110px;
	z-index: 999;
	.menuOFF {
		transition: 0.5s;
		width: 200px;
		height: 0;
		p {
			display: none;
		}
	}
	.menuON {
		position: relative;
		transition: 0.5s;
		display: inline-block;
		width: 200px;
		height: 280px;
		background-color: var(--gray50);
		box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20px;

		::before {
			content: "";
			width: 30px;
			height: 30px;
			position: absolute;
			background-color: var(--gray50);
			transform: rotate(45deg);
			top: -15px;
			right: 8px;
			z-index: -1;
		}

		p {
			font-size: 1.1rem;
			width: 100%;
			margin-bottom: 1px;
			padding: 3px 0;
			cursor: pointer;
			:hover {
				background-color: var(--gray100);
			}
		}
		.logout {
			position: absolute;
			color: red;
			bottom: 20px;
			left: 20px;
			width: 160px;
			:hover {
				color: #ae1414;
			}
		}
	}
`;

const Home = () => {
	const [isOpen, setMenu] = useState(false);
	const [searchWord, setSearch] = useState("");
	const [searchPostInMain, setSearchPostInMain] = useState({});
	const [popularPost, setPopularPost] = useState([   // 인기 게시글
    {
      "post_id": 9,
      "post_title": "test9",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "123",
      "like_count": 200,
      "created_at": "2022-08-15 12:12",
      "updated_at": "2022-08-15 12:12",
      "users": {
        "user_email": "kmeoung@gmail.com",
        "user_detail": {
          "user_name": "test2",
          "user_unique_id": "11f7d65e-720e-45e1-82ef-d16b001585de",
          "user_nickname": "태웅",
          "user_img": "https://lh3.googleusercontent.com/a/AItbvmkcEhowVpW6ELAAfVG8ZxJH90ca4GQT0ghVaVpi380=s96-c"
        }
      }
    },
    {
      "post_id": 10,
      "post_title": "test10",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "123",
      "like_count": 5,
      "created_at": "2022-08-15 12:12",
      "updated_at": "2022-08-15 12:12",
      "users": {
        "user_email": "kmeoung@gmail.com",
        "user_detail": {
          "user_name": "test2",
          "user_unique_id": "11f7d65e-720e-45e1-82ef-d16b001585de",
          "user_nickname": "이묘",
          "user_img": "https://lh3.googleusercontent.com/a/AItbvmkcEhowVpW6ELAAfVG8ZxJH90ca4GQT0ghVaVpi380=s96-c"
        }
      }
    },
    {
      "post_id": 234,
      "post_title": "test234",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "123",
      "like_count": 8,
      "created_at": "2022-08-15 12:12",
      "updated_at": "2022-08-15 12:12",
      "users": {
        "user_email": "kmeoung@gmail.com",
        "user_detail": {
          "user_name": "test2",
          "user_unique_id": "11f7d65e-720e-45e1-82ef-d16b001585de",
          "user_nickname": "나비",
          "user_img": "https://lh3.googleusercontent.com/a/AItbvmkcEhowVpW6ELAAfVG8ZxJH90ca4GQT0ghVaVpi380=s96-c"
        }
      }
    },
    {
      "post_id": 1234,
      "post_title": "test1234",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "123",
      "like_count": 8,
      "created_at": "2022-08-15 12:12",
      "updated_at": "2022-08-15 12:12",
      "users": {
        "user_email": "kmeoung@gmail.com",
        "user_detail": {
          "user_name": "test2",
          "user_unique_id": "11f7d65e-720e-45e1-82ef-d16b001585de",
          "user_nickname": "자민",
          "user_img": "https://lh3.googleusercontent.com/a/AItbvmkcEhowVpW6ELAAfVG8ZxJH90ca4GQT0ghVaVpi380=s96-c"
        }
      }
    }
  ]); 
	const [enterCount, setEnterCount] = useState(0);

  const [loginOpen, setLogin] = useState(false);


  /**
   * 로그인 모달 여는 onClick
   */
  const loginModal = () => {
    setLogin(true);
  }


	// 검색창 onChange
	const changeSearch = (e) => {
		setSearch(e.target.value);
	};




	/**
	 * 인기 게시글 가져오기
	 */
	useEffect(() => {
		const getPopularPostFun = async () => {
			const getPopularPost = await axios.get(main.mainPage(), {
        // offset 으로 페이징 하세요
				params: { offset: 0, limit: 50 },
			});
			setPopularPost(getPopularPost.data.result_data);
		};
		getPopularPostFun();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enterCount]);



	// 검색창에서 엔터키 쳤을 때 검색
	const enterSearchPress = async (e) => {
		if (e.key === "Enter") {
			// 백엔드에 검색어 전송
      /**
	      * 검색 키워트 게시글 가져오기
	    */
      const getSearchPostInMain = await axios.get(
				main.searchPostInMain(searchWord),
				// TODO: queryParams 설정 해야함
				{ params: { offset: 0, limit: 9 } }
			);
			setSearchPostInMain(getSearchPostInMain.data.result_data);
		}
	};

	// 프로필 이미지 클릭했을 때 메뉴 on off
	const toggleMenu = () => {
		setMenu((isOpen) => !isOpen);
	};

	return (
		<MainWrap>

      {
        loginOpen && <Login setLogin={setLogin} />
      }

			{/* 메인 검색 화면 */}
			<div className="container home-search">
				{/* 프로필 이미지 */}
				<ProfileIMG
					img="https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
					onClick={toggleMenu}
					className={isOpen ? "menuToggleON" : "menuToggleOFF"}
				></ProfileIMG>
				{/* 메뉴창 */}
				<Menu>
					<div className={isOpen ? "menuON" : "menuOFF"}>
						<p>
							<Link to="/:userId">내 글 목록</Link>
						</p>
						<p>
							<Link to="/:userId/calender">내 코디어리</Link>
						</p>
						<p>
							<Link to="/:userId/presave">임시글 목록</Link>
						</p>
						<p>
							<Link to="/:userId/visite">방문&좋아요 목록</Link>
						</p>
						<p>
							<Link to="/setting">설정</Link>
						</p>
            <p>
              <Link to="/:userId/visiterstat">방문자 통계</Link>
            </p>
						<p className="logout" onClick={loginModal}>로그아웃</p>
					</div>
				</Menu>

				{/* 홈화면 */}
				<HomeTitle>CODIARY</HomeTitle>
				{/* 검색창 */}
				<MainSearchBar
					type="text"
					placeholder="SEARCH"
					onKeyPress={enterSearchPress}
					onChange={changeSearch}
					value={searchWord}
				></MainSearchBar>
			</div>

			{/* 인기 게시글 */}
			<div className="container" id="popularity-text">
				<h2 className="home-title-popular">인기 게시글</h2>
        <CarouselWrap>
          <Carousel
            posts={popularPost}
          />
        </CarouselWrap>
			</div>

			{/* 푸터 */}
			<div className="home-footer">
				<FooterText>
					<p>제작자: 강경민, 임효현</p>
					<p>이 이상 넣을 얘기가 없어서 고민하다 이거까지만 적음ㅎ</p>
					<p>Copyright ⓒ whs12skeocndwjrdma.</p>
				</FooterText>
			</div>
		</MainWrap>
	);
};

export default Home;


const CarouselWrap = styled.div`
  width: 80%;
  height: 50%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
`
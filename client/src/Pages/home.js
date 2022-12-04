import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "../components/CarousalCard";
import { Link, useNavigate } from "react-router-dom";
import { main } from "../api/index";
import axios from "axios";
import Login from "../components/Login.jsx";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../api";
import { logout } from "../reducers/Action";
import getImg from "../utils/ImgUtil";

const Home = () => {
  const [isOpen, setMenu] = useState(false);
  const [popularPost, setPopularPost] = useState([]);
  const [loginOpen, setLogin] = useState(false);
  const { uniqueid } = useSelector((state) => state.auth.User);
  const { user_img } = useSelector((state) => state.auth.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  /**
   * 로그인 모달 여는 onClick
   */
  const loginModal = () => {
    setLogin(true);
  }

  const navigation = useNavigate();
  /**
   * search page 로 이동하는 onClick
   */
  const goToSearchPage = () => {
    navigation("/search", { state: { type: 'home' } });
  }



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
  }, []);

  // 프로필 이미지 클릭했을 때 메뉴 on off
  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen);
  };

  const logoutClick = async () => {
    axios.get(`${baseUrl}/logout`, { withCredentials: true });
    dispatch(logout(""))
    navigate("/")
  }


  console.log(getImg(user_img))

  return (
    <MainWrap>

      {
        loginOpen && <Login setLogin={setLogin} />
      }
      <ProfileIMG
        img={getImg(user_img)}
        onClick={toggleMenu}
        className={isOpen ? "menuToggleON" : "menuToggleOFF"}
      ></ProfileIMG>
        <Menu>
          {uniqueid !== '' &&
            <div className={isOpen ? "menuON" : "menuOFF"}>
              <p>
                <Link to="/write">새 글쓰기</Link>
              </p>
              <p>
                <Link to={`/${uniqueid}`}>내 글 목록</Link>
              </p>
              <p>
                <Link to={`/${uniqueid}/calender`}>내 코디어리</Link>
              </p>
              <p>
                <Link to="/presave">임시글 목록</Link>
              </p>
              <p>
                <Link to="/visite-like">방문&좋아요 목록</Link>
              </p>
              <p>
                <Link to="/setting">설정</Link>
              </p>
              <p>
                <Link to="/visiterstat">방문자 통계</Link>
              </p>
              <p className="logout" onClick={logoutClick}>로그아웃</p>
            </div>
          }
          {
            uniqueid === '' &&
            <div className={isOpen ? "menuON" : "menuOFF"}>
              <p className="logout" onClick={loginModal}>로그인</p>
            </div>
          }
        </Menu>

      {/* 메인 검색 화면 */}
      <div className="home-search">
        {/* 홈화면 */}
        <HomeTitle>CODIARY</HomeTitle>
        {/* 검색창 */}
        <MainSearchBar
          type="button"
          onClick={goToSearchPage}
          value="SEARCH"
        ></MainSearchBar>
      </div>

      {/* 인기 게시글 */}
      <div className="popular-posts" id="popularity-text">
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


const MainWrap = styled.div`
  margin: 0;
  padding: 0;
  background-color: red;
  width: 100%;
  .home-search {
    width: 100%;
    height: 100vh;
    position: relative;
		background-color: var(--gray600);
	}

  .popular-posts{
		width: 100%;
		height: 100vh;
		background-color: var(--gray50);
		position: relative;
    .home-title-popular {
			text-align: center;
			padding: 70px 0 50px 0;
		}
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
  	text-align: left;
  	color: var(--gray300);
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
		height: 320px;
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

const CarouselWrap = styled.div`
  width: 80%;
  height: 50%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
`
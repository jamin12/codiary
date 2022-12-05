import React, { useState } from "react";
import styled from "styled-components";
import "../css/reset.css";
import { devices } from "../css/DeviceSize";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../api";
import { logout } from "../reducers/Action";
import getImg from "../utils/ImgUtil";

// 스타일 설정
// 1680*900 기준 작성
const Main = styled.div`
  width: 100%;
  height: 120px;
  position: relative;
  z-index: 900;
`;
const Wrap = styled.div`
  position: absolute;
  display: flex;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);

  width: 1536px; //80%
  height: 50px;
  align-items: center;
  justify-content: space-between;

  // laptopL : 1600
  @media screen and (max-width: 1600px) {
    width: 95vw;
  }
`;
const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Profile = styled.div`
  width: 100px;
  height: 40px;
  margin-left: 25px;

  display: flex;
  justify-content: space-between;

  .userBox {
    position: relative;
    width: 40px;
    height: 40px;

    // 현재 이미지 안들어감 해결 해야함.
    .imgBox {
      position: relative;
      min-width: 40px;
      height: 40px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      border: 5px solid #fff;
      box-sizing: border-box;
    }
  }

  .menuToggleOFF {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    ::before {
      content: "";
      position: absolute;
      width: 32px;
      height: 2px;
      background-color: var(--gray600);
      transform: translateY(-10px);
      box-shadow: 0 10px var(--gray600);
      transition: 0.5s;
    }
    ::after {
      content: "";
      position: absolute;
      width: 32px;
      height: 2px;
      background-color: var(--gray600);
      transform: translateY(10px);
      transition: 0.5s;
    }
  }

  .menuToggleON {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    ::before {
      content: "";
      position: absolute;
      width: 32px;
      height: 2px;
      background-color: var(--gray600);
      transform: translateY(0px) rotate(45deg);
      box-shadow: 0 0px var(--gray600);
      transition: 0.5s;
    }
    ::after {
      content: "";
      position: absolute;
      width: 32px;
      height: 2px;
      background-color: var(--gray600);
      transform: translateY(0px) rotate(-45deg);
      transition: 0.5s;
    }
  }
`;
const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 4.5rem;
  .menuOFF {
    transition: 0.5s;
    width: 200px;
    height: 0;
    .tagP {
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
      right: 10px;
      z-index: -1;
    }

    .tagP {
      display: block;
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
const GotoHome = styled.h1`
  font-size: 2.5rem;
  color: var(--gray900);

  span {
    color: var(--gray900);
    text-decoration: none;
  }

  @media ${devices.laptopL} {
    font-size: 2rem;
  }
`;
const BtnSearch = styled.div`
  display: flex;
  align-items: center;
  padding-top: 7px;

  ion-icon {
    width: 30px;
    height: 30px;
  }
`

const SearchProfile = () => {
  const [isOpen, setMenu] = useState(false);
  const [loginOpen, setLogin] = useState(false);
  const { uniqueid } = useSelector((state) => state.auth.User);
  const { user_img } = useSelector((state) => state.auth.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen);
  };

  const loginModal = () => {
    setLogin(true);
  };

  /**
   * 검색 버튼을 누른 경로 체크하는 useEffect
   */
  const location = useLocation();

  /**
   * /search로 이동하는 함수
   */
  const navigation = useNavigate();
  const onClickSearch = () => {
    // navigation("/search", { state: { type: selectType() } });
    navigation("/search", { state: { type: location } });
  }

  const logoutClick = async () => {
    await axios.get(`${baseUrl}/logout`, { withCredentials: true });
    dispatch(logout(""))
    navigate("/")
  }

  return (
    <Main>
      {loginOpen && <Login setLogin={setLogin} />}

      <Wrap>
        <GotoHome>
          <Link to="/">
            <span>CODIARY</span>
          </Link>
        </GotoHome>

        <SearchWrap>
          <BtnSearch>
            <ion-icon onClick={onClickSearch}
              size="small"
              name="search-outline"
            ></ion-icon>
          </BtnSearch>


          {
            uniqueid !== "" ?
            <>
              <Profile>
                <div className="userBox">
                  <img className="imgBox" src={getImg(user_img)} alt="사용자 프로필 이미지"></img>
                </div>
                <div
                  className={isOpen ? "menuToggleON" : "menuToggleOFF"}
                  onClick={toggleMenu}
                ></div>
              </Profile>
              <Menu>
                  <div className={isOpen ? "menuON" : "menuOFF"}>
                    <Link className="tagP" to="/write">
                      새 글쓰기
                    </Link>
                    <Link className="tagP" to={`/${uniqueid}`}>
                      내 글 목록
                    </Link>
                    <Link className="tagP" to={`/${uniqueid}/calender`}>
                      내 코디어리
                    </Link>
                    <Link className="tagP" to="/presave">
                      임시글 목록
                    </Link>
                    <Link className="tagP" to="/visite-like">
                      방문&좋아요 목록
                    </Link>
                    <Link className="tagP" to="/setting">
                      설정
                    </Link>
                    <Link className="tagP" to="/visiterstat">
                      방문자 통계
                    </Link>

                    <p className="logout tagP" onClick={logoutClick}>
                      로그아웃
                    </p>
                  </div>
              </Menu>
            </>
            :
            <BtnLogin onClick={loginModal}>로그인</BtnLogin>
          }
        </SearchWrap>
      </Wrap>
    </Main>
  );
};
export default SearchProfile;

const BtnLogin = styled.p`
  /* position: absolute; */
  margin: auto;
  margin-left: 10px;
  top: 20px;
  right: 20px;
  padding: 5px 18px;
  font-size: 1.3rem;
  font-weight: 600;
  background-color: var(--gray800);
  border-radius: 50px;
  cursor: pointer;
  color: var(--gray50);
  transition: 0.3s;

  :hover{
    background-color: var(--gray700);
  }
`
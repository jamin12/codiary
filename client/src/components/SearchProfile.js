import React, { useState } from "react";
import styled from "styled-components";
import "../css/reset.css";
import { devices } from "../css/DeviceSize";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";

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
      /* background-image: url(${(props) =>
        props.img || "../IMG/KAKAO.png.png"}); */
      background-color: orange;
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

// 회원 정보를 받아와서 프로필 사진을 불러와야 함
const SearchProfile = () => {
  const [isOpen, setMenu] = useState(false);
  const [loginOpen, setLogin] = useState(false);
  // TODO(이묘): 쿠키에 authentication에 있는지 확인 후에 로그인이 돼었느냐를 체크해야함

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
  
  console.log(location)
  const selectType = () => {
    const locationType = location.split('/')
    if (locationType[1]===null || locationType[1] === 'calender'){
      return 0
    }
    else if(locationType[0] === 'presave'){
      return 1
    }
    else if(locationType[0] === 'visite-list'){
      return 2
    }
    else if(locationType[0] === 'good-list'){
      return 3
    }
  }

  /**
   * /search로 이동하는 함수
   */
  const navigation = useNavigate();
  const onClickSearch = () => {
    navigation("/search", { state: { type: selectType() } });
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

          <Profile>
            <div className="userBox">
              <div className="imgBox" img="../IMG/profile_test.png"></div>
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
              <Link className="tagP" to="/:userId">
                내 글 목록
              </Link>
              <Link className="tagP" to="/:userId/calender">
                내 코디어리
              </Link>
              <Link className="tagP" to="/:userId/presave">
                임시글 목록
              </Link>
              <Link className="tagP" to="/visite">
                방문&좋아요 목록
              </Link>
              <Link className="tagP" to="/setting">
                설정
              </Link>
              <Link className="tagP" to="/:userId/visiterstat">
                방문자 통계
              </Link>

              <p className="logout tagP" onClick={loginModal}>
                로그인
              </p>
            </div>
          </Menu>
        </SearchWrap>
      </Wrap>
    </Main>
  );
};
export default SearchProfile;

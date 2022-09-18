import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "../components/CarousalCard";

const MainWrap = styled.div`
  .container {
    width: 100%;
    height: 100vh;
    background-color: var(--gray100);
    position: relative;

    .home-title-popular {
      text-align: center;
      padding: 100px 0 50px 0;
    }
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
`
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
`
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
  background-image: url(${props => props.img || "https://images.unsplash.com/photo-1662581871665-f299ba8ace07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"}) ;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const Menu = styled.div`
  position: absolute;
  right: 40px;
  top: 6rem;
  .menuOFF{
    transition: 0.5s;
    width: 200px;
    height: 0;
    p{
      display: none;
    }
  }
  .menuON{
    position: relative;
    transition: 0.5s;
    display: inline-block;
    width: 200px;
    height: 250px;
    background-color: var(--gray50);
    box-shadow: 0 25px 35px rgba(0,0,0,0.1);
    box-sizing: border-box;
    padding: 20px;

    ::before{
      content: '';
      width: 30px;
      height: 30px;
      position: absolute;
      background-color: var(--gray50);
      transform: rotate(45deg);
      top: -15px;
      right: 10px;
      z-index: -1;
    }

    p{
      font-size: 1.1rem;
      width: 100%;
      margin-bottom: 1px;
      padding: 3px 0;
      cursor: pointer;
      :hover{
        background-color: var(--gray100);
      }
    }
    .logout{
      position: absolute;
      color: red;
      bottom: 20px;
      left: 20px;
      width: 160px;
      :hover{
        color: #AE1414;
      }
    }
  }
`

const Home = () => {
  const [isOpen, setMenu] = useState(false);
  const [searchWord, setSearch] = useState('');

  // 검색창 onChange
  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  // 검색창에서 엔터키 쳤을 때 검색
  const enterSearchPress = e => {
    if(e.key === 'Enter'){
      alert(`백엔드에 ${searchWord}에 대한 검색 결과를 요청합니다`)
      // 백엔드에 검색어 전송
    }
  }

  // 프로필 이미지 클릭했을 때 메뉴 on off
  const toggleMenu = () => {
      setMenu(isOpen => !isOpen);
  }



  return (
    <MainWrap>
      {/* 메인 검색 화면 */}
      <div className="container home-search">

        {/* 프로필 이미지 */}
        <ProfileIMG img='https://images.unsplash.com/photo-1661961110218-35af7210f803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
          onClick={toggleMenu} className={isOpen ? 'menuToggleON' : 'menuToggleOFF'} >
        </ProfileIMG>
        {/* 메뉴창 */}
        <Menu>
          <div className={isOpen ? 'menuON' : 'menuOFF'}>
            <p>내 프로필</p>
            <p>내 코디어리</p>
            <p>임시글 목록</p>
            <p>방문&좋아요 목록</p>
            <p className='logout'>로그아웃</p>
          </div>
        </Menu>

        {/* 홈화면 */}
        <HomeTitle>CODIARY</HomeTitle>
        {/* 검색창 */}
        <MainSearchBar type="text" placeholder="SEARCH" 
          onKeyPress={enterSearchPress} onChange={changeSearch}
          value={searchWord}></MainSearchBar>
      </div>

      {/* 인기 게시글 */}
      <div className="container" id="popularity-text">
        <h1 className='home-title-popular'>인기 게시글</h1>
        <Carousel/>
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

import React from "react";
import "../css/HomeStyle.css";
import styled from "styled-components";
import Figure from "react-bootstrap/Figure";

import PopOwlcarousel from "../components/PopOwlcarousel"

// import Image from 'react-bootstrap/Image'
// import {Link} from 'react-router-dom'

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

const home = () => {
  return (
    <>
      {/* 메인 검색 화면 */}
      <div className="container" id="home-search">

        {/* 프로필 이미지 */}
        <Figure.Image
          className="home-profile"
          width="50px"
          height="50px"
          alt="171x180"
          src="http://via.placeholder.com/100x100"
        />

        {/* 홈화면 */}
        <HomeTitle>CODIARY</HomeTitle>
        <input className="search-bar" type="text" placeholder="SEARCH"></input>
      </div>

      {/* 인기 게시글 */}
      <div className="container" id="popularity-text">
        <h1 className='home-title-popular'>인기 게시글</h1>
        <PopOwlcarousel />
      </div>

      {/* 푸터 */}
      <div className="home-footer">
        <FooterText>
          <p>제작자: 강경민, 임효현</p>
          <p>이 이상 넣을 얘기가 없어서 고민하다 이거까지만 적음ㅎ</p>
          <p>Copyright ⓒ whs12skeocndwjrdma.</p>
        </FooterText>
      </div>
    </>

  );
};

export default home;

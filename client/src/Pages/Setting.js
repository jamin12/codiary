import React from 'react';
import SearchProfile from '../components/SearchProfile';
import styled from 'styled-components';

const Setting = () => {

  const Header = styled.div`
    width: 100%;
    height: 100%; 
    background-color: red;
    padding-bottom: 50px;
  `

  const ContentsWrap = styled.div`
    position: relative;
    width: 100%;
    /* background-color: orange; */

    height: 100%;
    padding-top: 150px;
    margin: 0 auto;
    margin-top: 100px;

    div{
      width: 1536px; //80% 
      margin: 0 auto;
      background-color: pink;
    }
  `

  const Title = styled.h1`
    font-size: 2.5rem;
    position: absolute;
    top: 150px;
    left: 50%;
    width: 12%;
    text-align: center;
    transform: translateX(-50%);
    border-bottom: 3px solid #c8c8c8;
  `

  const Menu = styled.ul`
    position: absolute;
    background-color: red;
    top: 230px;
    left: 0;
    width: 11rem;
    height: 70vh;
    border-right: 1px solid #000;
    /* text-align: right; */
    /* background-color: red; */

    li{
      border-bottom: 1px solid #ccc;
      width: 90%;
      margin: 0 auto;
    }
    li button{
      width: 100%;
      height: 3.5rem;
      font-size: 1.5rem;
      border: none;
      border-radius: 30px;
      margin: 10px auto;
      background-color: transparent;
    }
  `

  const Contents = styled.div`
    background-color: red;
  `

  return (
    <>
      <Header>
        <SearchProfile/>
      </Header>
    
      {/* <ContentsWrap>
        <div> 
          <Title>Setting</Title>
          <Menu>
            <li><button>내 정보 수정</button></li>
            <li><button>카테고리 수정</button></li>
            <li><button>회원정보 관리</button></li>
          </Menu>

          <Contents>

          </Contents>
        </div>


      </ContentsWrap> */}

    </>
  )

};
export default Setting;
import React from 'react';
import SearchProfile from '../components/SearchProfile';
import styled from 'styled-components';





const Setting = () => {

  // css
  const Header = styled.div`
    position: relative;
    width: 100%;
    height: 100%; 
    padding-bottom: 50px;
  `

  const ContentsWrap = styled.div`
    display: flex;
    position: relative;
    
    width: 90%;
    height: 100%;
    padding-top: 150px;
    margin: 0 auto;
    margin-top: 100px;
    background-color: yellow;

    div{
      // width: 1536px; //80% 
      margin: 0 auto;
      background-color: pink;
    }

    @media screen and (max-width: 1600px) {

    }

  `

  const Title = styled.h1`
    font-size: 2.5rem;
    position: absolute;
    top: 10px;
    left: 50%;
    width: 12rem;
    text-align: center;
    transform: translateX(-50%);
    border-bottom: 3px solid #c8c8c8;
    
    @media screen and (max-width: 1600px) {
      font-size: 2rem;
      width: 10rem;
    }
  `

  const Menu = styled.ul`
    position: absolute;
    // background-color: red;
    top: 7rem;
    left: 0;
    width: 11rem;
    height: 70vh;
    border-right: 1px solid #000;

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
      cursor: pointer;

      &:hover{
        background-color: #ececec;
      }
    }

    @media screen and (max-width: 1600px) {
      width: 9rem;
      li button{
        font-size: 1.2rem;
      }
    }
  `

  const Contents = styled.div`  
    width: 80%;
    height: 100%;
    position: absolute;
    background-color: red;
    right: 0;
    top: 7rem;
    width: calc(100% - 13rem);

    @media screen and (max-width: 1600px) {
      width: calc(100% - 11rem);
    }
  `
  // css end



  return (
    <>
      <Header>
        <SearchProfile/>
      </Header>
    
      <ContentsWrap>
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


      </ContentsWrap>

    </>
  )

};
export default Setting;
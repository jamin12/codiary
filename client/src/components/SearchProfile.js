import React from 'react';
import styled from "styled-components";
import '../css/reset.css';
import { devices } from '../css/DeviceSize';

// 스타일 설정
// 1920*1080기준 작성
const Main = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
`
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

`
const SearchWrap = styled.div`
  position: relative;
  display: flex;
`
const SearchBox = styled.div`
  position: relative;
  display: flex;
  background-color: #E8E8E8;
  border-radius: 30px;
  width: 250px;
  overflow: hidden;

  ion-icon{ //돋보기
    position: absolute;
    width: 25px;
    height: 100%;
    padding: 0 10px 0 5px;
    right: 0;

    cursor: pointer;
  }

  @media ${devices.laptopL} {
    width: 220px;

    ion-icon{
    width: 20px;
    padding: 0 13px 0 5px;

    }
  }
`
const Search = styled.input`
  position: absolute;
  width: calc(100% - 60px);
  height: 100%;
  margin-left: 15px;
  background-color: transparent;
  border: none;
  :focus{
    outline: none;
  }
`
const Profile = styled.div`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-left: 30px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;


  img {
    width: 40px;
    height: 40px;
    background-color: #e4e4e4;
  }

  @media ${devices.laptopL}{
    width: 35px;
    height: 35px;

    img{
      width: 35px;
      height: 35px;
    }
  }
`
const GotoHome = styled.h1`
  font-size: 2.5rem;

  @media ${devices.laptopL}{
    font-size: 2rem;
  }
`
const SettingBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,10,0.7);
  z-index: 999;
  display: flex;
  justify-contents: center;
  
  .text-box{
    position: relative;
    width: 100px;
    height: 10rem;
    background-color: var(--gray50);
    padding: 20px 20px;
    
  }
  .text-box::before {
    
  }
`





// 회원 정보를 받아와서 프로필 사진을 불러와야 함
const SearchProfile = () => {

  return(
    <Main>
      <Wrap>
        <GotoHome>
          <a href='#none'>
            CODIARY
          </a>

        </GotoHome>

        <SearchWrap>
          <SearchBox className='search-box'>
            <Search type='text' className='search' placeholder='SEARCH'></Search>
            <ion-icon size='small' name="search-outline"></ion-icon>
          </SearchBox>

          <Profile>
            <img src={ require('../IMG/profile_test.png')} className='profile-img' alt='profile-img' />
          </Profile>
        </SearchWrap>

      </Wrap>

      <SettingBox>
        <Wrap>
          <div className='text-box'>
            <p>홈화면</p>
            <p>내 프로필</p>
            <p>내 코디어리</p>
            <p>임시글</p>
            <p>방문&좋아요</p>
            <p className='logout'>로그아웃</p>  
          </div>
        </Wrap>

      </SettingBox>
    </Main>

  )
}
export default SearchProfile;
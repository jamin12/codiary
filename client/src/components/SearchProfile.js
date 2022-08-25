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
  background-color: pink;
`

const Wrap = styled.div`
  background-color: orange;
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
    background-color:red;
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
    </Main>

  )
}
export default SearchProfile;
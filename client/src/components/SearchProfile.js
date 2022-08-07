import React from 'react';
import styled from "styled-components";
import '../css/reset.css';

// 스타일 설정
// 1920*1080기준 작성
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
`

const GotoHome = styled.h1`
  font-size: 2.5rem;
`



const SearchProfile = () => {

  return(
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
  )
}
export default SearchProfile;
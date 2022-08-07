import React from 'react';
import styled from "styled-components";

// 스타일 설정
const Wrap = styled.div`
  position: absolute;
  display: flex;
  top: 10px;
  right: 20px;

  width: 250px;
  height: 50px;
  align-items: center;
  justify-content: space-between;

`
const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 200px;
  height: 60%;

  border-radius:35px;
  overflow: hidden;

  cursor: pointer;

  background-color: #E8E8E8;

  ion-icon{
    display: flex;
    position: absolute;
    right: 10px;
    top: 5px;
    height: 70%;

    color: #8F8F8F;
    font-weight: bold;

    cursor: pointer;
  }
`

const Search = styled.input`
  border: none;
  padding: 10px;
  width: 150px;
  background-color: #E8E8E8;

  :focus{
    outline: none;
  }
`
const Profile = styled.div`
  width: 40px;
  height: 40px;
  object-fit: cover;

  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;


  img {
    width: 40px;
    height: 40px;
    
    background-color: #e4e4e4;
  }
`



const SearchProfile = () => {

  // return(
  //   <Wrap>
  //     <SearchBox className='search-box'>
  //       <Search type='text' className='search' placeholder='SEARCH'></Search>
  //       <ion-icon size='small' name="search-outline"></ion-icon>
  //     </SearchBox>

  //     <Profile>
  //       <img src={ require('../IMG/profile_test.png')} className='profile-img' alt='profile-img' />
  //     </Profile>
  //   </Wrap>
  // )
}
export default SearchProfile;
import React from 'react'
import styled from 'styled-components'

const HomeTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
    color: black;
    padding-top: 5%
`
const PopularityText = styled.div `
    width: 80%;
    height: 60vh;
    margin-top:40px;
    margin-left: auto;
    margin-right: auto;
    background-color: pink;

`


const Popular = () => {
  return (
    <div className='container' id='popularity-text'>
        <HomeTitle>인기 게시글</HomeTitle>
        <PopularityText>인기 게시글 슬라이드 바 들어가야 함</PopularityText>
    </div>
  )
}

export default Popular;
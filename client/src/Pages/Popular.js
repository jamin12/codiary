import React from 'react'
import styled from 'styled-components'
import PopOwlcarousel from '../components/PopOwlcarousel'

const HomeTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
    color: black;
    padding-top: 5%
`


const Popular = () => {
  return (
    <div className='container' id='popularity-text'>
        <HomeTitle>인기 게시글</HomeTitle>
        <PopOwlcarousel/>
    </div>
  )
}

export default Popular;
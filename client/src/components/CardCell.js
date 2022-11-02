import React from "react";
import styled from "styled-components";

const CardCell = (props) => {

  const userID = props.id;
  const userNickname = props.user_nickname;

  return(
    <>
      <MainWrap>
        <h1>{userID}</h1>
        <img alt="thumnail" class="thumnail-img" 
          src="https://images.unsplash.com/photo-1663431262170-b94c02b712cd?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=60"></img>
        <div className="user">
          <img alt="profile" class="user-img" src="https://images.unsplash.com/photo-1663487916170-23c86c596284?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=60"></img>
          <p className="user-nickname">{userNickname}</p>
        </div>
      </MainWrap>
    </>
  )
}
export default CardCell;

const MainWrap = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  background-color: orange;
  display: flex;
`
import React from "react";
import styled from "styled-components";
import '../css/reset.css';
import {IoClose} from 'react-icons/io5';


const Login = ({ setLogin }) => {

  const closeModal = () => {
    setLogin(false);
  }

  const loginGoogle = () => {
    alert('로그인 기능 추가해야함')
  }

  return (
    <MainWrap>
      <div>
        <h4 onClick={closeModal}>
          <IoClose></IoClose>
        </h4>

        <TextBox>
          <h1>CODIARY</h1>
          <p>소셜 로그인하기</p>
        </TextBox>

        <LoginBtn onClick={loginGoogle}>
          <img src="/img/google-logo.png" alt="구글 로그인" />
        </LoginBtn>
      </div>

    </MainWrap>
  )
}
export default Login;

const MainWrap = styled.div`
    background-color: rgba(22, 22, 22, 0.5);
    width: 100%;
    height: 100vh;
    z-index: 999;
    display: flex;
    justify-content:center;
    align-items: center;
    position: relative;

    
    > div{
      background-color: var(--gray50);
      width: 40%;
      height: 300px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content: center;
      border-radius: 50px;
      position: relative;

      h4{
        position: absolute;
        top: 15px;
        right: 25px;
        font-size: 30px;
        text-align: center;
        align-items: center;
        color: var(--gray400);
        transition: 0.2s;
        cursor: pointer;

        :hover{
          color: var(--gray600);
        }
      }
    }

    h1{
        color: var(--gray800)
    }
    p{
        color: var(--gray600);
    }
`

const TextBox = styled.div`
    text-align: center;
`

const LoginBtn = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--gray200);
    margin-top: 40px;
    cursor: pointer;
    background-image: url();
    > img{
        width:100%;
        height:100%;
    }
`

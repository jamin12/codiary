// import Styles from "./Card.module.css";
import React, {useState} from "react";
// import { useSpring } from "react-spring";
import styled from 'styled-components';

function Card({ id,img, title, body, date, user, img_u }) {

  const CardWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    background-color: #eceff1;
    width: 20rem;
    height: 400px;
    border-radius: 20px;
    position: relative;

    box-shadow: 0 5px 18px -7px rgba(0,0,0,1);
    transition: 0.2s;

    :hover{
      transform: scale(110%);
    }
    .title{ 
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: 18rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .user-wrap{ 
      position: absolute;
      display: flex;
      bottom: 90px;
      left: 1rem;
      align-items: center;
    }
    .user{
      margin-left: 1rem;
      font-size: 1.2rem;
      color: #263238;
    }
    .date{
      position: absolute;
      bottom: 1rem; right: 1.3rem;
      color: #8f8f8f;
    }
  `
  const ThumbnailIMG = styled.div`
      display: ${(props) => props.img ? 'flex' : 'none'};
      width: 100%;
      height: 200px;
      background: url(${(props) => props.img});
      background-size: cover;
      position: absolute;
      top: 4rem;
      left: 0;
  `
  const PostBody = styled.div`
    display: ${(props) => props.img ? 'none' : '-webkit-box'};
    position: absolute;
    top: 4rem;
    left: 0;
    width: 90%;
    height: 200px;
    padding: 0 1rem;

    overflow: hidden;
    word-break: break-word;
    font-size: 2rem;
    font-weight: 100;

    background-color: #cfd8dc;
    color: #eceff1;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  `
  const ProfileImg = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;

    background: url(${(props) => props.img});
    background-size: cover;
    background-color: #263238;
  `


  const [center, setCenter] = useState("");

  return (
    <CardWrap id = {id}

      // 가운데에 있는 게시글을 누르면 이동하라는 alert뜨는 이벤트-ing
      onClick={
        (e) => {
          console.log(e.currentTarget.id);
          if(e.currentTarget.id === center){
            alert('가운데에 있는 post가 클릭되었으므로 화면으로 이동합니다.')
            console.log(center);
          }
            setCenter(e.currentTarget.id);
        }
      }
    >
      <ThumbnailIMG img={img} alt="썸네일" />
      <h2 className='title'>{title}</h2>
      <PostBody className='body' img={img}>{body}</PostBody>
      <div className='user-wrap'>
        <ProfileImg img={img_u}></ProfileImg>
        <p className='user'>{user}</p>
      </div>
      <p className='date'>{date}</p>
    </CardWrap>
  );
}

export default Card;

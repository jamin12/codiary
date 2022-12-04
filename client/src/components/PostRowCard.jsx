import React from 'react';
import styled from 'styled-components';
import getImg from '../utils/ImgUtil';
import default_img from '../IMG/codiary_default_img.png';


const PostRowCard = (props) => {

  const id = props.id
  const title = props.title;
  const user = props.user;
  const date = props.date;
  const img = props.img;  
  const type = props.type;
  const html = props.html;

  /**
   * text에서 가장 첫 번째 이미지 태그 찾는 함수
   * @param {String} text 
   */
  const ImgSearch = (text) => {
    console.log(text)
    const imgSrcRex = /(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
    text = text?.replaceAll("&lt;", "<");
    let imgSrc = "";
    if (imgSrcRex.exec(text)) {
      imgSrc = RegExp.$2
    } else {
      imgSrc = default_img
    }
    return imgSrc
  }

    /**
  * 해당 포스트로 이동하는 함수
  * 
  * @param {string} uid 
  * @param {number} pid 
  */
  const onClickGoPost = (pid, uid) => {
    if (type === "presave") {
      document.location.href = `/presave/${pid}`;
    }
    else {
      document.location.href = `/${uid}/${pid}`;
    }
  }

  return (
    <Post
      onClick={() => onClickGoPost(id, user)}>
      <div className='text-box'>
        <h1 className="title">{title}</h1>
        <div className="user">
          {
            img !== "" &&
            <img src={getImg(img)} alt="사용자 프로필" />
          }
          <span className='user'>{user}</span>
        </div>
        <p className='date'>{date}</p>
      </div>
      <ThumbnailIMG img={ImgSearch(html)} alt='썸네일' />
    </Post>
  )
}
export default PostRowCard;

const Post = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--gray100);
  border-radius: 20px;
  display: flex;
  cursor: pointer;
  overflow: hidden;

  .text-box{ 
    position: relative;
    flex: 1;
    display: block;
    width: 50%;

    .title{
      width: 90%;
      text-align: left;
      margin-left: 10px;
      margin-top: 20px;
      font-size: 1.6rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .text{
      width: 49%;
      height: 3.3em;
      font-size: .89rem;
      background-color: blue;
      overflow: hidden;
      white-space: normal;
      line-height: 1.5;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0 auto;
    }
    .user{
      display: flex;
      align-items: center;
      margin: 5px 10px;
      /* margin:  */
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .date{
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-size: .89rem;
    }
  }
`
// 썸네일
const ThumbnailIMG = styled.div`
  display: ${(props) => props.img ? 'flex' : 'none'};
  width: 50%;
  height: 100%; 
  background: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  flex: 1;
`
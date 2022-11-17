import React from 'react';
import styled from 'styled-components';

const PostRowCard = (props) => {

  const title = props.title;
  const text = props.text;
  const user = props.user;
  const date = props.date;
  const img = props.img;    // TODO: props로 받은 주소가 없으면 아예 나타나지 않게 처리 해야함

  // TODO(이묘): 가장 처음 이미지 찾는 함수 구현바람.
  /**
   * text에서 가장 첫 번째 이미지 태그 찾는 함수
   * @param {String} text 
   */
  const ImgSearch = (text) => {
    return "https://images.unsplash.com/photo-1664575196079-9ac04582854b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
  }

  return (
    <Post>
      <div className='text-box'>
        <h1 className="title">{title}</h1>
        <div className="user">
          <img src={img} alt="사용자 프로필"/>
          <span className='user'>{user}</span>
        </div>
        <p className='date'>{date}</p>
      </div>
      {/* TODO: 이미지 썸네일 고쳐야함 캘린더 페이지 참고 */}
      <ThumbnailIMG img={ImgSearch(text)} alt='썸네일' />
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
      width: 49%;
      text-align: left;
      margin-left: 10px;
      margin-top: 5px;
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
import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import default_img from '../IMG/codiary_default_img.png';
import getImg from "../utils/ImgUtil";

/**
 * 해당 포스트로 이동하는 함수
 * 
 * @param {string} userUniqueId 
 * @param {number} postId 
 */
const movePost = (userUniqueId, postId) => {
  document.location.href = `/${userUniqueId}/${postId}`;
};


export default class Carousel extends Component {
  render() {
    const posts = this.props.posts; // props로 post들을 받아옴
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "50px",
      slidesToShow: 3,
      speed: 500,
    };
    const imageErrorHandler = (e) => {
      e.target.src = default_img;
    }
    return (
      <Main>
        <Slider {...settings}>
          {posts.map((post) => {
            let html = post.post_body_html;
            const imgSrcRex = /(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
            html = html?.replaceAll("&lt;", "<");
            let imgSrc = "";
            if (imgSrcRex.exec(html)) {
              imgSrc = RegExp.$2
            } else {
              imgSrc = default_img
            }
            return (
              <PostWrap onClick={() => {
                movePost(post.users.user_detail.user_unique_id, post.post_id);
              }}>
                <div className="popul-title">
                  <h3>{post.post_title}</h3>
                </div>

                <div className="thumbnail">
                  <img src={imgSrc} alt="게시물 대표 이미지" onError={imageErrorHandler} />
                </div>

                <div className="user">
                  <img
                    className="user-profile"
                    src={getImg(post.users?.user_detail.user_img)}
                    alt=""
                  ></img>
                  <span>{post.users?.user_detail.user_unique_id}</span>
                </div>
                <div>
                  <p className="post-txt">{post.post_txt}</p>
                </div>
                <p className="date">{post.updated_at.substring(0, 10)}</p>

                <div className="like-box">
                  <span>❤️</span>
                  <span>{post.like_count}</span>
                </div>
              </PostWrap>
            );
          })}
        </Slider>
      </Main>
    );
  }
}

const PostWrap = styled.button`
  background-color: var(--gray200);
  position: relative;
  width: 100px;
  height: 100%;
  border-radius: 15px;
  cursor: pointer;
  border: none;

  h3{
    width: 100%;
    height: 100%;
    white-space : nowrap;
    overflow : hidden;
  }
  .popul-title{
    position: relative;
    bottom: 13.5%;
  }
  .thumbnail{
    position: relative;
    bottom: 50px;
    width: 100%;
    height: 45%;
    margin-top: 5px
  }

  .user-profile{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .user{
    display: flex;
    position: relative;
    width: 90%;
    align-items: center;
    margin: 0 auto;
    bottom: 30px;
    span{
      margin-left: 5px;
    }
  }
  .post-txt{
    position: absolute;
    margin-left: 20px;
    display: block;
    width: 85%;
    bottom: 7%;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    height: 3.6em;
    word-wrap : break-word;
    text-align : left;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

  }
  .date{
    width: 90%;
    text-align: left;
    position: absolute;
    left: 20px;
    bottom: 15px;
    margin: 0 auto;
    font-size: 0.8rem;
    color: var(--gray500);
  }
  .like-box{
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 1.3rem;
    color: var(--gray700);
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100%;

  .slick-slider{
    height: 100%;
  }
  .slick-list{
    height: 100%;

    .slick-track{
    height: 100%;

      .slick-slide>div{
        height: 100%;
      }
    }

  }
  .slick-prev:before,
  .slick-next:before{
    color: var(--gray700);
    font-size: 25px;
  }
  

  .center .slick-center ${PostWrap}{  //center 모드일때 center
    opacity: 1;
    cursor: pointer;
    transform: scale(1);
  }

  .center ${PostWrap}{  // center모드일 때 center 이외의 속성
    opacity: 0.6;
    transition: all 300ms ease;
    transform: scale(0.95);
    height: 100%;
  }
`;
// const SlidePage = styled.div`
//   background-color:orange;
// `

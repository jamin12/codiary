import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import default_img from '../IMG/codiary_default_img.png';
import getImg from "../utils/ImgUtil";

export default class Carousel extends Component {
  render() {
    const posts = this.props.posts  // props로 post들을 받아옴

    const settings = {
      // className: this.props.className,
      // centerMode: this.props.centerMode,
      dots: this.props.dots,
      infinite: true,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: 1,
      vertical: this.props.vertical,
      // verticalSwiping: this.props.verticalSwiping,
      // centerPadding: this.props.centerPadding,
      // arrows: this.props.arrows,
      // nextArrow: this.props.nextArrows,
      // prevArrow: this.props.prevArrows,


      beforeChange: function (currentSlide, nextSlide) {
      },
      afterChange: function (currentSlide) {
      }
    };

    const onClickGoPost = (id, user) => {
      window.location.replace(`/${user}/${id}`)
    }
    const imageErrorHandler = (e) => {
      e.target.src = default_img;
    }

    return (
      <Main type={settings.vertical}>
        {
          posts.length > 3 ?
            (<Slider {...settings}>
              {
                posts.map((post) => {
                  let html = post.posts?.post_body_html;
                  const imgSrcRex = /(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
                  html = html?.replaceAll("&lt;", "<");
                  let imgSrc = "";
                  if (imgSrcRex.exec(html)) {
                    imgSrc = RegExp.$2
                  } else {
                    imgSrc = default_img
                  }
                  // 세로 캐러셀
                  if (settings.vertical === true) {
                    return (
                      <>
                        <Post43>
                          <div className="text-wrap">
                            <h3 className="post-title">{post.post_title}</h3>
                            <div className="user-info-box">
                              <img src={getImg(post.users.user_detail.user_img)} alt="사용자이미지" />
                              <span>{post.users.user_detail.user_nickname}</span>
                            </div>
                            <p className="post-date">{post.updated_at}</p>
                          </div>

                          <div className="post-img-wrap">
                            {
                              <img src={imgSrc} alt="게시물 대표 이미지" onError={imageErrorHandler} />
                            }
                          </div>
                        </Post43>
                      </>
                    )
                  }
                  // 가로 캐러셀
                  else if (settings.vertical === false) {
                    return (
                      <div className="horizon">
                        <Post34 onClick={() => onClickGoPost(post.post_id, post.posts?.users.user_detail.user_unique_id)} >
                          <h3 className="post-title">{post.posts?.post_title}</h3>

                          <div className="post-img-wrap">
                            {
                              <img src={imgSrc} alt="게시물 대표 이미지" onError={imageErrorHandler} />
                            }
                          </div>

                          <div className="user-info-box">
                            <div>
                              <img src={getImg(post.posts?.users.user_detail.user_img)} alt="사용자이미지" />
                              <span>{post.posts?.users.user_detail.user_unique_id}</span>
                            </div>
                            {/* <p className="post-date">{post.posts.updated_at}</p> */}
                          </div>

                        </Post34>
                      </div>
                    )
                  }

                })
              }
            </Slider>)
            :
            <div className="under3">
              {
                posts.map(post => {

                  let html = post.posts?.post_body_html;
                  const imgSrcRex = /(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
                  html = html?.replaceAll("&lt;", "<");
                  let imgSrc = "";
                  if (imgSrcRex.exec(html)) {
                    imgSrc = RegExp.$2
                  } else {
                    imgSrc = default_img
                  }
                  return (
                      <Post34 onClick={() => onClickGoPost(post.post_id, post.posts?.users.user_detail.user_unique_id)} >
                        <h3 className="post-title">{post.posts?.post_title}</h3>

                        <div className="post-img-wrap">
                          {
                            <img src={imgSrc} alt="게시물 대표 이미지" onError={imageErrorHandler} />
                          }
                        </div>

                        <div className="user-info-box">
                          <div>
                            <img src={getImg(post.posts?.users.user_detail.user_img)} alt="사용자이미지" />
                            <span>{post.posts?.users.user_detail.user_unique_id}</span>
                          </div>
                          {/* <p className="post-date">{post.posts.updated_at}</p> */}
                        </div>
                      </Post34>
                  )
                })
              }
            </div>

        }
      </Main>
    );
  }
}

// 메인
const Main = styled.div`

  .slick-prev:before,
  .slick-next:before{
    color: var(--gray700);
    font-size: 25px;
  }
  .slick-list{
    /* display: flex; */
  }

  .slick-slider{
    /* overflow-y: hidden; */
  }

  .under3{
    display: flex;

    >div{
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`

// 가로가 긴 카드
const Post43 = styled.div`
  width: 100%;
  height: 150px;
  margin: 5px 0;
  border-radius: 15px;
  background-color: var(--gray50);
  padding: 5px;
  box-sizing: border-box;
  display: flex;

  .text-wrap{
    width: 50%;
    height: 100%;
    display: block;
    position: relative;

    .post-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 1.5rem;
    }

    .user-info-box{
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-left: 5px;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
      span{
        font-size: 0.9rem;
      }
    }
    .post-date{
      color: var(--gray600);
      position: absolute;
      bottom: -10px;
      left: 10px;
    }
  }
  .post-img-wrap{
    width: 50%;
    height: 100%;
    float: right;
    background-color: var(--gray100);
    border-radius: 15px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 15px;
      display: block;
      object-fit: cover;
      object-position: center;
    }
    p{
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* text-align: left; */
      word-break: break-word;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: var(--gray600);
    }
  }
`

// 세로가 긴 카드
const Post34 = styled.div`
  width: 90%;
  height: 300px;
  margin: 5px 0;
  border-radius: 15px;
  background-color: var(--gray50);
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  cursor: pointer;

  @media screen and (min-width: 1200px) {
    margin-top: 40px;
    height: 400px;
  }

    .post-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 1.5rem;
    }

    .user-info-box{
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-left: 5px;
      div{
        display: flex;
        justify-content: space-between;
        img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
      span{
        font-size: 0.9rem;
      }
    }

    }
    .post-date{
      color: var(--gray600);
      position: absolute;
      bottom: -10px;
      left: 10px;
    }
  .post-img-wrap{
    width: 100%;
    height: 50%;
    background-color: var(--gray100);
    border-radius: 15px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 15px;
      display: block;
      object-fit: cover;
      object-position: center;
    }
    p{
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /* text-align: left; */
      word-break: break-word;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: var(--gray600);
      font-size: 3rem;
      color: var(--gray200)
    }
  }
`
import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default class Carousel extends Component {
  render() {
    const posts = this.props.posts  // props로 post들을 받아옴
    console.log(posts)

    const settings = {
      className: this.props.className,
      centerMode: this.props.centerMode,
      dots: this.props.dots,
      infinite: true,
      slidesToShow: this.props.slidesToShow,
      slidesToScroll: 1,
      vertical: this.props.vertical,
      verticalSwiping: this.props.verticalSwiping,
      centerPadding: this.props.centerPadding,


      beforeChange: function (currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function (currentSlide) {
        console.log("after change", currentSlide);
      }
    };

    return (
      <div>
        <Slider {...settings}>
          {
            posts.map((post) => {
              return (
                <>
                  <Post>
                    <div className="text-wrap">
                      <h3 className="post-title">{post.post_title}</h3>
                      <div className="user-info-box">
                        <img src={post.users.user_detail.user_img} alt="사용자이미지" />
                        <span>{post.users.user_detail.user_nickname}</span>
                      </div>
                      <p className="post-date">{post.updated_at}</p>
                    </div>

                    {/* TODO(이묘): 대표 이미지가 있는지 없는지 체크하고 대표 이미지가 있으면 이미지를, 없으면 post_body_md가 나타나도록 수정
                      현재는 그냥 post_body_md만 나타나도록 함.
                    */}
                    <div className="post-img-wrap">
                      {
                        // TODO(이묘): post 이미지가 있는지 없는지 확인하는 함수 구현 필요
                        post.img ? <img src={post.img} alt="게시물 대표 이미지"/> : <p>{post.post_body_md}</p>
                      }
                    </div>
                  </Post>
                </>
              )
            })
          }
        </Slider>
      </div>
    );
  }
}

const Post = styled.div`
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
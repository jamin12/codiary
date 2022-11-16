import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default class Carousel extends Component {
  render() {
    const posts = this.props.posts  // props로 post들을 받아옴

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
      arrows: this.props.arrows,
      nextArrow: this.props.nextArrows,
      prevArrow: this.props.prevArrows,


      beforeChange: function (currentSlide, nextSlide) {
      },
      afterChange: function (currentSlide) {
      }
    };

        // console.log(posts[0].posts.post_body_html.slice(608, 663))
    // console.log((posts[0].posts.post_body_html).indexOf('src'))


    const onClickGoPost = (id, user) => {
      window.location.replace(`/${user}/${id}`)
    }

    return (
      <Main type={settings.vertical}>
        <Slider {...settings}>
          {
            posts.map((post) => {

              const html = post.posts?.post_body_html
              const imgStart = html.indexOf('src="')+5
              const imgEnd = html.indexOf('"', imgStart)
              const imgSrc = html.slice(imgStart, imgEnd)

              // 세로 캐러셀
              if (settings.vertical === true) {
                return (
                  <>
                    <Post43>
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
                          imgStart !== -1 ? <img src={imgSrc} alt="게시물 대표 이미지" /> : <p>{post.posts?.post_body_md}</p>
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
                    <Post34  onClick={() => onClickGoPost(post.post_id, post.posts?.users.user_detail.user_unique_id)} >
                        <h3 className="post-title">{post.posts?.post_title}</h3>

                        {/* TODO(이묘): 대표 이미지가 있는지 없는지 체크하고 대표 이미지가 있으면 이미지를, 없으면 post_body_md가 나타나도록 수정
                        현재는 그냥 post_body_md만 나타나도록 함.
                      */}
                        <div className="post-img-wrap">
                          {
                            // TODO(이묘): post 이미지가 있는지 없는지 확인하는 함수 구현 필요
                            imgStart !== -1 ? <img src={imgSrc} alt="게시물 대표 이미지" /> : <p>{post.posts?.post_body_md}</p>
                          }
                        </div>

                        <div className="user-info-box">
                          <div>
                            <img src={post.posts?.users.user_detail.user_img} alt="사용자이미지" />
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
        </Slider>
      </Main>
    );
  }
}

// 메인
const Main = styled.div`
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
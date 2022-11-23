import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { img } from '../api';


// const MainCanvas = styled.SliderItem`
//   position: relative;
//   width: 80%;
//   height: 400px;
//   perspective: 1500px;
//   margin: 0 auto;
//   background-color: black;

//   @media screen and (max-width:1024px) {
//     width: 75%;
//     height: 330px;
//   }
// `

// const Carousel = (props) => {

//   const postlist = props.popularList;
// //   const [currentIndex, setCurrentIndex] = useState(0);
//   const slideRef = useRef(null);

//     return (
//       // 보이는 영역
//       <MainCanvas>

//       </MainCanvas>

//     );

// }
// export default Carousel;
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
    // TODO(이묘): text에서 가장 첫 번째 이미지 태그 갖고와야함
    /**
     * text에서 가장 첫 번째 이미지 태그 찾는 함수
     * @param {String} text 
     */
    const ImgSearch = (text) => {
      return "https://images.unsplash.com/photo-1664575196079-9ac04582854b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
    }
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "50px",
      slidesToShow: 3,
      speed: 500,
    };
    return (
      <Main>
        <Slider {...settings}>
          {posts.map((post) => {
            return (
              <PostWrap onClick={() => {
                movePost(post.users.user_detail.user_unique_id, post.post_id);
              }}>
                <div className="popul-title">
                  <h3>{post.post_title}</h3>
                </div>

                <div className="thumbnail">
                  <img src={ImgSearch(post.post_txt)} alt="" />
                </div>

                <div className="user">
                  <img
                    className="user-profile"
                    src={img.getImg(post.users?.user_detail.user_img)}
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
    bottom: 60px;
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
    bottom: 12%;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    height: 3.6em;
    word-wrap : break-word;
    text-align : left;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

  }
  .date{
    width: 90%;
    position: relative;
    top: 60px;
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

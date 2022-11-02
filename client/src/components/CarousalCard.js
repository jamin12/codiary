import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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



export default class Carousel extends Component {
  render() {
    const posts = this.props.posts; // props로 post들을 받아옴
    console.log(posts);
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
      slidesToShow: 5,
      speed: 500,
    };
    return (
      <Main>
        <Slider {...settings}>
          {posts.map((post) => {
            return (
                <PostWrap>
                  <h3>{post.post_title}</h3>
                  
                  <div className="thumbnail">
                    <img src={ImgSearch(post.post_txt)} alt="" />
                  </div>
                  
                  <div className="user">
                    <img
                      className="user-profile"
                      src={post.users?.user_detail.user_img}
                      alt="사용자 프로필 이미지"
                    ></img>
                    <span>{post.users?.user_detail.user_nickname}</span>
                  </div>
                  
                  <p className="date">{post.updated_at.substring(0,10)}</p>
                  
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

const PostWrap = styled.div`
  background-color: var(--gray200);
  position: relative;
  width: 100px;
  height: 100%;
  border-radius: 15px;

  h3{
    margin: 5px 10px;
  }
  .thumbnail{
    width: 100%;
    height: 45%;
    margin-top: 10px
  }

  .user-profile{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .user{
    display: flex;
    width: 90%;
    align-items: center;
    margin: 10px auto 0 auto;

    span{
      margin-left: 5px;
    }
  }
  .date{
    width: 90%;
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

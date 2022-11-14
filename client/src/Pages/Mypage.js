import React, { useEffect, useState } from "react";
import "../css/reset.css";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Carousel from '../components/CarouselSlick';

import SearchProfile from "../components/SearchProfile";
import { personal } from "../api/index";
import axios from "axios";

const Mypage = () => {
  const { userId } = useParams();

  const [Nickname] = useState("Emyo");
  // TODO: 하위 카테고리도 설정 넣어놔야함
  const [category, setCategory] = useState([
    // {
    //   "category_id": 1,
    //   "sub_category_id": null,
    //   "category_name": "알고리즘"
    // },
  ]);
  const [categoryId, setCategoryId] = useState(0);
  const [posts, setPosts] = useState([
    // {
    //   "post_id": 25,
    //   "post_title": "테스으 생성~~~~~ 이라고 합니다 네에",
    //   "post_body_md": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //   "post_body_html": "<p><h1>Lorem Ipsum</h1> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
    //   "post_txt": "qwer12v",
    //   "created_at": "2022-08-29 03:52",
    //   "updated_at": "2022-08-29 19:45",
    //   "users": {
    //       "user_email": "rudals951004@gmail.com",
    //       "user_detail": {
    //           "user_name": "min ja",
    //           "user_unique_id": "test",
    //           "user_nickname": "",
    //           "user_img": "이미지가 없다링"
    //       }
    //   }
    // },
    // {
    //   "post_id": 26,
    //   "post_title": "이묘이묘",
    //   "post_body_md": "123",
    //   "post_body_html": "<p>123</p>",
    //   "post_txt": "qwer12v",
    //   "created_at": "2022-08-29 03:52",
    //   "updated_at": "2022-08-29 19:45",
    //   "users": {
    //       "user_email": "rudals951004@gmail.com",
    //       "user_detail": {
    //           "user_name": "min ja",
    //           "user_unique_id": "test",
    //           "user_nickname": "코딩하는사람",
    //           "user_img": "https://images.unsplash.com/photo-1666616328135-ad1b7e62a25c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
    //       }
    //   }
    // },
    // {
    //   "post_id": 27,
    //   "post_title": "진자 존나",
    //   "post_body_md": "null",
    //   "post_body_html": "null",
    //   "post_txt": "qwer12v",
    //   "created_at": "2022-08-29 03:52",
    //   "updated_at": "2022-08-29 19:45",
    //   "users": {
    //       "user_email": "rudals951004@gmail.com",
    //       "user_detail": {
    //           "user_name": "min ja",
    //           "user_unique_id": "test",
    //           "user_nickname": "이묘ㅛ",
    //           "user_img": "https://images.unsplash.com/photo-1666526320369-a1e3fcd69253?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
    //       }
    //   }
    // },
    // {
    //   "post_id": 28,
    //   "post_title": "귀찮아",
    //   "post_body_md": "null",
    //   "post_body_html": "null",
    //   "post_txt": "qwer12v",
    //   "created_at": "2022-08-29 03:52",
    //   "updated_at": "2022-08-29 19:45",
    //   "users": {
    //       "user_email": "rudals951004@gmail.com",
    //       "user_detail": {
    //           "user_name": "min ja",
    //           "user_unique_id": "test",
    //           "user_nickname": "이묘",
    //           "user_img": "https://images.unsplash.com/photo-1666473574975-fd909b53dd4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
    //       }
    //   }
    // },
  ]);

  /**
   *  사용자 카테고리 목록 조회
   */
  useEffect(() => {
    // TODO: (경민 -> 이묘) 서브 카테고리 표시 안되도록 드롭 다운 해야 나오도록 설정
    const getCategoryFun = async () => {
      const getCategory = await axios.get(
        personal.getPersonalCategory(userId)
      );
      setCategory(getCategory.data.result_data);
    };
    getCategoryFun();
  }, [userId]);

  /**
   *  사용자 카테고리별 포스트 목록 조회
   */
  useEffect(() => {
    const getPostsFun = async () => {
      const getPost = await axios.get(
        personal.getPsersonalPosts(userId, categoryId),
        {
          //TODO(이묘): 급한거 아님 - 리미트 몇 개로 걸어서 페이징 처리해줄 건지 결정해서 처리
          params: { offset: 1, limit: 50 },
        }
      );
      setPosts(getPost.data.result_data);
    };
    getPostsFun();
  }, [userId, categoryId]);

  const clickFolder = (e) => {
    setCategoryId(e.target.id)
    console.log(e.target.id)
  }
  const openAllPost = () => {
    setCategoryId(0)
  }

  /**
   * 포스트 클릭 함수
   */
  const onClickPost = (id, user) => {
    window.location.replace(`/${user}/${id}`)
  }

  console.log(category);
  console.log(posts);

  return (
    <MainWrap>
      <SearchProfile />

      <Contents>
        {/* 가운데 홈 글씨 */}
        <div className="mypage-main-txt">
          <h3>{Nickname}'s</h3>
          <h1>CODIARY</h1>
        </div>

        <Folders>
          <div className="folder full-view"
          onClick={openAllPost}
          >
            전체보기
          </div>

          <div className="category-folder-box">
            {
              category.map((category) => {
                return(
                  <div className="folder"
                  id={category.category_id}
                  onClick={clickFolder}
                  >
                    <span>{category.category_name}</span>
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </div>
                )
              })
            }
          </div>
        </Folders>

        <CarouselWrap>
          {
            posts.map(post => {

              const html = post.post_body_html
              const imgStart = html.indexOf('src="')+5
              const imgEnd = html.indexOf('"', imgStart)
              const imgSrc = html.slice(imgStart, imgEnd)

              return(
                <Post onClick={() => onClickPost(post.post_id, post.users.user_detail.user_unique_id)}>
                  <div className='text-box'>
                    <h1 className="title">{post.post_title}</h1>
                  </div>
                  <div className="post-img-wrap">
                  {
                    imgStart !== -1 ? <img src={imgSrc} alt="게시물 대표 이미지" /> : <p>{post.posts?.post_body_md}</p>
                  }
                  </div>
                </Post>
              )
            })
          }

          {/* <Carousel
            posts={posts}
            dots={false}
            slidesToShow={3}
            vertical={true}
            verticalSwiping={true}
            centerMode={true}
            centerPadding={'60px'}
            className={'center'}
          /> */}
        </CarouselWrap>
      </Contents>
    </MainWrap>
  );
};

export default Mypage;




const MainWrap = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  .mypage-main-txt{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`
const Contents = styled.div`
  position: relative;
  width: 88%;
  max-width: 1500px;
  height: 80%;
  margin: 0 auto;
`
const Folders = styled.div`
  position: absolute;
  width: 35%;
  /* height: 50%; */
  top: 50%;
  right: 0px;
  transform: translateY(-50%);

  .full-view{
    background-color: var(--gray200);
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0 0 10px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;

    :hover{
      background-color: var(--gray300);
    }
  }
  .folder{
    display: flex;
    align-items: center;
    border-radius: 13px;
    cursor: pointer;
    h3{
      font-size:1.2rem;
    }
    ion-icon{
      font-size: 1.3rem;
    }
  }
  .category-folder-box{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    .folder{
      background-color: var(--gray100);
      height: 40px;
      box-sizing: border-box;
      padding: 0 0 0 10px;
      /* margin: 5px 0; */
      :hover{
        background-color: var(--gray200);
      }
      span{
        font-size: 1.1rem;
        font-weight: 500;
      }

      :first-child, :nth-child(2){
        margin-top: 10px;
      }
    }
  }

`
const CarouselWrap = styled.div`
  width: 35%;
  height: 80%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;

  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 10px;
    background-color:inherit;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #ccc;
    border-radius: 50px;
  }

`

const Post = styled.button`
  width: 98%;
  height: 180px;
  background-color: var(--gray50);
  border-radius: 20px;
  border: none;
  margin: 10px 0;
  justify-content: space-between;
  display: flex;
  cursor: pointer;

  .text-box{ 
    flex-grow: 1;
    flex-basis: 50%;
    position: relative;
  }
  .title{
    position: absolute;
    top: 10px;
    left: 20px;
    width: 80%;
    text-align: left;

    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;

    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical
  }
  .user{
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-weight: bold;
  }

  @media screen and (max-width: 1024px){
    height: 180px;
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

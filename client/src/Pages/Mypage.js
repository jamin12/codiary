import React, { useEffect, useState } from "react";
import "../css/reset.css";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

import SearchProfile from "../components/SearchProfile";
import { personal } from "../api/index";
import axios from "axios";

import default_img from '../IMG/codiary_default_img.png'
import { ButtonGroup, Button, Dropdown } from "react-bootstrap";

const Mypage = () => {
  const { userId } = useParams();

  // TODO: 하위 카테고리도 설정 넣어놔야함
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryFolder, setCategoryFolder] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const subArr = []
    category.map(findSubCate => {
      if (findSubCate.sub_category_id !== null) {
        subArr.push(findSubCate)
      }
      setSubCategory(subArr)
    })
  }, [category])
  useEffect(() => {
    const Total = [];

    category.map(categorys => {
      const arr = [];
      if (categorys.sub_category_id === null) {
        arr.push(categorys)
        subCategory.map(subCategorys => {
          if (categorys.category_id === subCategorys.sub_category_id) {
            arr.push(subCategorys)
          }
        })
        Total.push(arr)
      }
      setCategoryFolder(Total)
    })
  }, [category, subCategory])

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

  /**
 * onError시 실행될 함수
 * 대체 이미지
 */
  const onErrorImg = (e) => {
    e.target.src = default_img;
  }

  // const test = (categorys) => {
  //   for(let i=0; i<categorys.length; i++){
  //     if(categorys[i].sub_category_id === null){
  //       return(
  //       <div className="folder"
  //       id={categorys[i].category_id}
  //       onClick={clickFolder}
  //     >
  //       <span>{categorys[i].category_name}</span>
  //     </div>
  //       )
  //     }
  //     else{

  //     }
  //   }
  // }

  const btnCategory = {

  }


  return (
    <MainWrap>
      <SearchProfile />

      <Contents>
        {/* 가운데 홈 글씨 */}
        <div className="mypage-main-txt">
          <h3>{userId}'s</h3>
          <h1>CODIARY</h1>
        </div>

        <Folders>
          <div className="folder link-wrap">
            <Link className='link' to={`/${userId}/calender`}><ion-icon name="calendar-outline"></ion-icon></Link>
          </div>

          <div className="folder full-view"
            onClick={openAllPost}
            id="test"
          >
            전체보기
          </div>

          <div className="category-folder-box">
            {
              categoryFolder.map(categoryArr => {
                if (categoryArr.length === 1) {
                  return (
                    <div className="folder"
                      id={categoryArr[0].category_id}
                      onClick={clickFolder}
                    >
                      <span>{categoryArr[0].category_name}</span>
                    </div>
                  )
                }
                else {
                  return (
                    <Dropdown as={ButtonGroup}>
                      <Button variant="success"
                        onClick={() => setCategoryId(categoryArr[0].category_id)}>
                        <span>{categoryArr[0].category_name}</span>
                      </Button>

                      <Dropdown.Toggle split
                        variant="success"
                        id="dropdown-split-basic" />

                      <Dropdown.Menu>
                        {
                          categoryArr.map((category, index) => {
                            if (categoryArr[index] !== categoryArr[0]) {
                              return (
                                <Dropdown.Item onClick={() => setCategoryId(category.category_id)}>{category.category_name}</Dropdown.Item>
                              )
                            }
                          })
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  )
                }
              })
            }
          </div>
        </Folders>

        <CarouselWrap>
          {
            posts.map(post => {

              const html = post.post_body_html
              const imgStart = html.indexOf('src="') + 5
              const imgEnd = html.indexOf('"', imgStart)
              const imgSrc = html.slice(imgStart, imgEnd)

              return (
                <Post onClick={() => onClickPost(post.post_id, post.users.user_detail.user_unique_id)}>
                  <div className='text-box'>
                    <h1 className="title">{post.post_title}</h1>
                  </div>
                  <div className="post-img-wrap">
                    <img src={imgSrc} onError={onErrorImg} alt='게시물 대표 이미지' />
                  </div>
                </Post>
              )
            })
          }

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

  .link-wrap{
    float: right;
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .link{
    cursor: pointer;
    width: 40px;
    height: 40px;

    ion-icon{
      width: 100%;
      height: 100%;
    }
  }

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
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      position: relative;
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

    .dropdown.btn-group{
      :first-child{
        margin-top: 10px;
      }
      
      button{
        background-color: var(--gray100);
        height: 40px;
        color: black;
        border: none;
        padding: 0 10px;
        text-align: left;
        border-radius: 13px;
        span{
        font-size: 1.1rem;
        font-weight: 500;
        }
        :hover{
          background-color: var(--gray300);
        }
      }
      .btn{
        border-radius: 13px 0 0 13px;
      }
      .btn.dropdown-toggle{
        border-radius: 0 13px 13px 0;
        text-align: center;
        width: 0%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 95%;
      height: 95%;
      border-radius: 15px;
      display: block;
      object-fit: cover;
      object-position: center;
    }
  }

`

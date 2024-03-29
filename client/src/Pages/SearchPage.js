import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { main, personal } from "../api";
import { IoChevronDownOutline } from "react-icons/io5";

import HeaderNoSearchBar from "../components/HeaderNoSearchBar";
import PostRowCard from "../components/PostRowCard";

const Searchpage = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [viewType, setViewType] = useState(0); // 전체인지 개인인지 공용인지 구분
  const [searchType, setSearchType] = useState(0); // 개인페이지의 검색 타입
  const [checkType, setCheckType] = useState(0);

  const location = useLocation();

  const path = location.state.type.pathname;

  useEffect(() => {
    if (path === undefined) {
      setViewType(0)
      setCheckType(0);
    } else if (path.split("/")[1] === 'visiterstat' ||
      path.split("/")[1] === 'setting') {
      setViewType(0)
      setCheckType(0);
    }
    // 개인 페이지 검색
    else if (path.split("/")[1] === 'presave' ||
      path.split("/")[1] === 'visite-like') {
      setViewType(1)
      if (path.split("/")[1] === 'presave') { setSearchType(1) }
      else { setSearchType(4) }
      setCheckType(1);

    }
    // 특정 user 게시물 검색(공용 검색)
    else {
      setViewType(2)
      setCheckType(2);
    }
  }, [])

  /**
   * text가 바뀔 때마다 검색을 하게 해주는 함수
   */
  const changeSearch = async (e) => {
    setSearchWord(e.target.value)
    let getSearch;
    if (checkType === 0) {
      getSearch = await axios.get(main.searchPostInMain(e.target.value), {
        params: {
          offset: 0,
          limit: 100
        }
      })
      setSearchResult(getSearch.data.result_data);
    }
    else if (checkType === 1) {
      if (searchType === 1) {
        getSearch = await axios.get(personal.searchPersonalposts(e.target.value, 1), {
          withCredentials: true,
          params: {
            offset: 0,
            limit: 100
          }
        })
        setSearchResult(getSearch.data.result_data);
      }
      else { // 방문 좋아요 목록
        const getVisiteGood = await axios.get(personal.searchPersonalposts(e.target.value, 2), {
          withCredentials: true,
          params: {
            offset: 0,
            limit: 100
          }
        })
        setSearchResult(getVisiteGood.data.result_data)
      }
    }
    else if (checkType === 2) {
      const getPost = await axios.get(personal.searchCommonposts(path.split("/")[1], e.target.value),
      {
        params: {
          offset: 0,
          limit: 100
        }
      })
      setSearchResult(getPost.data.result_data)
    }
  };

  /**
  * 게시물 더보기 onClick 함수
  */


  return (
    <Main>
      <HeaderNoSearchBar />

      {/* 검색창 */}
      <MainSearchBar
        type="text"
        placeholder="SEARCH"
        onChange={(e) => changeSearch(e)}
        value={searchWord}
      ></MainSearchBar>
      <Wrap>
        <PostWrap>
          {
            // if(checkType === 0){
            // }
            searchResult.map((post) => {
              if (checkType === 0) {  // 전체검색
                return (
                  <PostRowCard
                    id={post.post_id}
                    title={post.post_title}
                    user={post.users?.user_detail.user_unique_id}
                    img={post.users?.user_detail.user_img}
                    date={post.updated_at}
                    text={post.post_txt}
                    html={post.post_body_html}
                  />
                );
              }

              else if (checkType === 1) { // 개인 페이지 검색
                if (searchType === 1) { // 임시게시글
                  return (
                    <PostRowCard
                      id={post.tmppost_id}
                      title={post.tmppost_title}
                      date={post.updated_at}
                      img=""
                      type={"presave"}
                      html={post.tmppost_body_html}
                    />
                  )
                }
                else {                  // 방문 좋아요
                  return (
                    <PostRowCard
                      id={post.post_id}
                      title={post.post_title}
                      user={post.users?.user_detail.user_unique_id}
                      img={post.users?.user_detail.user_img}
                      date={post.updated_at}
                      text={post.tmppost_txt}
                      html={post.post_body_html}
                    />
                  )
                }
              }

              else if (checkType === 2) {   // 특정사용자 게시글 검색
                console.log(post)
                return (
                  <PostRowCard
                    id={post.post_id}
                    title={post.post_title}
                    user={post.users?.user_detail.user_unique_id}
                    img={post.users?.user_detail.user_img}
                    date={post.updated_at}
                    text={post.tmppost_txt}
                    html={post.post_body_html}
                  />
                )
              }
            })}
        </PostWrap>


        {/* <div className="btn-postview-more" onClick={onClickViewMore} postLength={searchResult.length}>
          <IoChevronDownOutline />
        </div> */}
      </Wrap>
    </Main>
  );
};
export default Searchpage;

const Main = styled.div`
  width: 100%;
  /* min-height: 100vh; */
`
const Wrap = styled.div`
  display: block;
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 50px;

  /* > .btn-postview-more{
    bottom: 20px;
    width: 100%;
		display: "flex";
		justify-content: center;
		align-items: center;
		height: 40px;
		font-size: 30px;
		color: var(--gray400);
		transition: 0.3s;
		cursor: pointer;
    margin-top: 30px;

			:hover{
				color: var(--gray600);
				background-color: var(--gray50);
			}
		} */
`;

const PostWrap = styled.div`
  width: 1433px;
  /* height: 100%; */
  flex-wrap: wrap;
  margin: 0px auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 200px;
  column-gap: 20px;
  row-gap: 20px;

  @media screen and (max-width: 1600px) {
    width: 1100px;
  }
  @media screen and (max-width: 1024px) {
    width: 90%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(220px, auto);
  }
`;

const MainSearchBar = styled.input`
  width: 50%;
  max-width: 1500px;
  border-radius: 15px;
  border: 1px solid #a5a5a5;

  /* margin: 60px auto; */
  display: flex;
  margin: 90px auto 30px auto;

  font-size: 1.2rem;
  padding: 0.8rem;
`;

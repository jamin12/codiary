import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { main } from "../api";
import { IoChevronDownOutline } from "react-icons/io5";

import HeaderNoSearchBar from "../components/HeaderNoSearchBar";
import PostRowCard from "../components/PostRowCard";

const Searchpage = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);

	const [viewMoreOffset, setViewMoreOffset] = useState(1);

  const location = useLocation();

  const type = location.state.type;
  if(type === 'home') {
  }else if(type === ''){
    
  }


  /**
   * text가 바뀔 때마다 검색을 하게 해주는 함수
   */
  const changeSearch = async (e) => {

    setSearchWord(e.target.value)
    let getSearch
    getSearch = await axios.get(main.searchPostInMain(searchWord), {
      params: {
        offset: viewMoreOffset,
        limit: 11
      }
    })
    // TODO: (경민 -> 이묘) 검색 위치에 따라서 검색하는 url달라지는거 구현(axios 써야해요 doc파일 보고 하면 됩니다.)
    setSearchResult(getSearch.data.result_data);
  };

  /**
  * 게시물 더보기 onClick 함수
  */
  const onClickViewMore = () => {
    setViewMoreOffset(viewMoreOffset + 9)
  }

  return (
    <Main>
      <HeaderNoSearchBar />

      {/* 검색창 */}
      <MainSearchBar
        type="text"
        placeholder="SEARCH"
        onChange={changeSearch}
      // value={searchWord}
      ></MainSearchBar>
      <Wrap>
        <PostWrap>
          {searchResult.map((post) => {
            return (
              <PostRowCard
              title={post.post_title}
              user = {post.users.user_detail.user_nickname}
              img = {post.users.user_detail.user_img}
              date = {post.updated_at}
              text = {post.post_txt}
              />
            );
          })}
        </PostWrap>


        <div className="btn-postview-more" onClick={onClickViewMore} postLength={searchResult.length}>
          <IoChevronDownOutline />
        </div>
      </Wrap>
    </Main>
  );
};
export default Searchpage;

const Main = styled.div`
  width: 100%;
  min-height: 100vh;
`
const Wrap = styled.div`
  display: block;
  text-align: center;
  font-size: 1.3rem;

  > .btn-postview-more{
    bottom: 20px;
    width: 100%;
		display: ${props => props.postLength>9 ? "flex" : "none"};
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
		}
`;

const PostWrap = styled.div`
  width: 1433px;
  height: auto;
  /* display: flex; */
  flex-wrap: wrap;
  margin: 0px auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: minmax(200px, 200px);
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

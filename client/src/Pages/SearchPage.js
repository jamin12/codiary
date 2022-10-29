import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CardCell from "../components/CardCell";
import { main } from "../api";

import HeaderNoSearchBar from "../components/HeaderNoSearchBar";
import PostRowCard from "../components/PostRowCard";

const Searchpage = () => {
  const [searchResult, setSearchResult] = useState([]);

  /**
   * text가 바뀔 때마다 검색을 하게 해주는 함수
   */
  const changeSearch = async () => {
    // TODO: (경민 -> 이묘) 검색할 단어 어딧어요?
    let getSearch
    getSearch = await axios.get(main.searchPostInMain("qwer"), {
      params: {
        offset: 1,
        limit: 10
      }
    })
    // TODO: (경민 -> 이묘) 검색 위치에 따라서 검색하는 url달라지는거 구현(axios 써야해요 doc파일 보고 하면 됩니다.)
    setSearchResult(getSearch.data.result_data);
  };

  // TODO(이묘): 스크롤 하다가 바닥에 닿으면 몇 개를 더 요청해야하는 함수 구현해야함

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
              // TODO: 백엔드에서 받아온 데이터 props로 전송해줄 것
              <PostRowCard />
            );
          })}
        </PostWrap>
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
`;

const PostWrap = styled.div`
  width: 1433px;
  height: auto;
  /* display: flex; */
  flex-wrap: wrap;
  margin: 0px auto;

  position: absolute;
  top: 23%;
  left: 50%;
  transform: translateX(-50%);

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, minmax(200px, 200px));
  column-gap: 20px;
  row-gap: 20px;

  @media screen and (max-width: 1600px) {
    width: 1100px;
  }
  @media screen and (max-width: 1024px) {
    width: 90%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, minmax(220px, auto));
  }
`;

const MainSearchBar = styled.input`
  width: 50%;
  max-width: 1500px;
  height: auto;
  border-radius: 15px;
  border: 1px solid #a5a5a5;

  font-size: 1.2rem;
  padding: 0.8rem;

  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-45%, -50%);
`;

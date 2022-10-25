import React, { useState } from "react";
import styled from "styled-components";

import { IoPeopleOutline, IoPersonOutline, IoHeartCircleOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import SearchProfile from "../components/SearchProfile";
import StatePost from "../components/VisiterStatePost";
import Chart from "../components/VisiterStatChart";


const ChartWrap = styled.div`
    width: 100%;
    height: 460px;

    .chart-header{
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: space-between;

      .buttons{
        background-color: var(--gray100);
        color: var(--gray400);
        :focus{
          background-color: var(--gray500);
          color: var(--gray100)
        }
      }
    }
`

const TopWrap = styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    cursor: pointer;

    >div{
        width: 30%;
        height: 100%;
        background-color: var(--gray50);
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        transition: 0.2s;
        .top-icon{
            width: 100px;
            height: 100px;
            color: var(--gray600);
        }
        p{
            color: var(--gray600);
        }
        h4{
            color: var(--gray600);
        }
        
        :hover{
            background-color: var(--gray100);
            .top-icon{
                color: var(--gray800);
            }
            h4{
                color: var(--gray800);
            }
        }

        :checked{
            background-color: var(--gray600);
        }
    }
`
const PostWrap = styled.div`
  position: relative;
  width: 100%;
  height: 690px;

  margin: 55px 0px;

    .search-box{
        width: 350px;
        height: 42px;
        display: flex;
        justify-content: space-between;

        .selectBox{
            width: 70%;
            height: 100%;
            border-radius: 10px;
        }

        button{
          width: 80px;
          border-radius: 10px;
          border: none;
          transition: 0.2s;
          background-color: var(--gray200);

          :hover{
            background-color: var(--gray400);
            color: var(--gray50)
          }
        }
    }

    .post-box{
      width: 100%;
      /* height: calc(100%-55px); */
      height: 85%;
      margin-top: 15px;

      align-items: center;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .pagination-box{
      width: 200px;
      height: 30px;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      
      background-color: orange;
    }
`


const VisiterStats = () => {

  /**
   * top 메뉴중에 어떤걸 선택했는지 구분
   *  0: 누적 방문자수
   *  1: 일일 방문자수
   *  2: 좋아요 수
   */
  const [checkTop, setCheckTop] = useState(0)

  // 차트에 표시되는 게시물이 어떤건지 확인하는 useState
  const [chartPost, setChartPost] = useState({});

  // 서버에서 받아와야하는 top 게시글 이름 useState
  // TODO: 서버에서 받아오는 처리 해야함
  const [topTotalVisiter, setTopTotalVisiter] = useState("게시글 이름")
  const [topDayVisiter, setTopDayVisiter] = useState("게시글 이름")
  const [topGood, setGood] = useState("게시글 이름")

  const [selected, setSelected] = useState("");
  const searchOption = ["방문자 오름차순", "방문자 내림차순", "좋아요 오름차순", "좋아요 내림차순", "최신 업로드", "예전 게시물"];
  const onChangeSelect = (e) => {
    setSelected(e.target.value);
  }

  return (
    <MainWrap>
      <SearchProfile />

      <div className="contentsWrap">
        {/* 차트 부분 뭉쳐놓은 div */}
        <ChartWrap>
          <div className="chart-header">
            <h3>게시글이름</h3>

            <ButtonGroup aria-label="Basic example" className="button-box">
              <Button variant="secondary" className="buttons">DATE</Button>
              <Button variant="secondary" className="buttons">WEEK</Button>
              <Button variant="secondary" className="buttons">MONTH</Button>
            </ButtonGroup>
          </div>
          {/* 차트에 props로 정보들을 보내줘야함 */}
          <Chart />
        </ChartWrap>

        {/* top박스들을 뭉쳐놓은 div */}
        <TopWrap>
          <div className="top-total-visiter">
            <IoPeopleOutline className="top-icon" />
            <p>누적 방문자수 TOP</p>
            <h4>{topTotalVisiter}</h4>
          </div>
          <div className="top-total-visiter">
            <IoPersonOutline className="top-icon" />
            <p>일일 방문자수 TOP</p>
            <h4>{topDayVisiter}</h4>
          </div>
          <div className="top-total-visiter">
            <IoHeartCircleOutline className="top-icon" />
            <p>좋아요수 TOP</p>
            <h4>{topGood}</h4>
          </div>
        </TopWrap>

        {/* 포스트 box를 뭉쳐놓은 div */}
        <PostWrap>
          <div className="search-box">
            <select className='selectBox' onChange={onChangeSelect} value={selected}>
              {
                searchOption.map(list => (
                  <option value={list} key={list}>
                    {list}
                  </option>
                ))
              }
            </select>

            <button>검색</button>
          </div>

          <div className="post-box">
            {/* 
                        postData리스트? 오브젝트?를 갖고와서 map으로 돌려야함 
                        title, date, tags, totalVisiter, dayVisiter, good을 뽑아서 넣어줘야함.
                      */}
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
            <StatePost title="게시글TITLE" date="2022.02.07" tags={["태그1", "태그2"]} totalVisiter={10} todayVisiter={0} good={5} />
          </div>

          <div className="pagination-box">
            1.. 2.. 3..
          </div>
        </PostWrap>
      </div>


    </MainWrap>
  )
}
export default VisiterStats;


/**
 * css
 */
const MainWrap = styled.div`
    width: 100%;

    > .contentsWrap{
        width: 90%;
        max-width: 1500px;
        margin: 0 auto;
    }
`


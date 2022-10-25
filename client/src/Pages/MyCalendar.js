import React, { useEffect, useState } from 'react';
import SearchProfile from '../components/SearchProfile'
import Calendar from 'react-calendar';
import '../css/Calendar.css'; // css import
import '../css/reset.css'
import styled from 'styled-components';
import moment from 'moment';
import { personal } from '../api';
import axios from 'axios';

const MyCalendar = () => {
  const [postData, changeDate] = useState(new Date());

  // 받은 날짜에 대한 포스팅 기록 저장해서 표시
  // const [mark, setMark] = useState([]);

  const mark = [
    {
      "post_id": 4,
      "post_title": "test4",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "qaz",
      "created_at": "2022-08-15 12:12",
      "updated_at": "2022-08-15 12:12",
      "users": {
        "user_email": "rudals951004@gmail.com",
        "user_detail": {
          "user_name": "min ja",
          "user_unique_id": "test",
          "user_nickname": "testemyo",
          "user_img": "이미지가 없다링"
        }
      },
      "posts_update_history": [
        {
          "post_update_history_id": 6,
          "post_id": 4,
          "update_history": "2022-08-29 12:03",
          "created_at": "2022-08-29 12:03",
          "updated_at": "2022-08-30 23:51"
        },
      ]
    },
  ]

  // const [markDate, setMarkDate] = useState([]);

  // TODO(이묘): mark에서 text에서 이미지 태그만 뽑아서 가장 첫번째 있는 이미지 태그만 뽑아서 넣기
  const postImg = "";

  const [postsByDate, setPostByDate] = useState({});	/**
	 *  사용자 날짜 별 포스트 목록 조회
	 */
  useEffect(() => {
    const getPostsByDateFun = async () => {
      const getPostsByDate = await axios.get(
        personal.getPersonalPostsByDate("test"),
        //TODO: postData로 바꿔야하는데 postData(날짜) 타입이 YYYY-MM-DD HH:mm:ss가 아님 수정 바람
        { params: { startdate: "2022-08-01 00:00:00"/** postData */, enddate: "2022-08-30 00:00:00"/** postData */ } }
      );
      setPostByDate(getPostsByDate.data.result_data);
    };
    getPostsByDateFun();
  }, [postData]);
  // // 배열 안에 있는 날짜 뽑아오는 함수 구현해야함.
  // const test = mark.map(date => date.created_at);
  // console.log(test);
  // console.log(postData);
  return (
    <Main>
      <SearchProfile />

      <Wrap>
        <CalendarWrap>
          <Calendar
            onChange={changeDate}   // useState로 포커스 변경시 현재 날짜 받아오기
            value={postData}
            postData={postData}
            formatDay={(locale, date) => moment(date).format('DD')}   // 1'일'에서 일 제외하고 숫자만 보이게
            formatMonth={(locale, date) => moment(date).format('MMM')}
            formatMonthYear={(locale, date) => moment(date).format('MMMM')}
            formatYear={(locale, date) => moment(date).format('YYYY')}
            formatShortWeekday={(locale, date) => moment(date).format('ddd')}
            showNeighboringMonth={false}  // 이전 이후 달의 날짜는 안보이도록 설정하는 명령어

            // TODO(이묘->경민): 서버에서 월에 포스트가 있는 날짜별 포스트 갯수 전송해주세요.
            // TODO(이묘): 날짜 받으면 배경색 진하게 넣는 부분 진행해야함
            tileContent={({ date, view }) => {  // 날짜 타일에 갯수만큼 tile추가
              // 현재 날짜가 mark에 있다면 tile div 추가
              if (mark.find((x) => x === moment(date).format('YYYY-MM-DD HH:mm'))) {
                return (
                  <>
                    <HightLight>
                    </HightLight>
                  </>
                );
              }
            }}
          />
        </CalendarWrap>

        <PostWrap>
          <div className='menu'>
            <h2>{postData.getDate()}일</h2>
            <ion-icon name="library-outline"></ion-icon>
          </div>

          {
            mark.map(post => {
              return (
                <Post>
                  <div className='text-box'>
                    <h1 className="title">{post.post_title}</h1>
                    <p className="text">{post.post_body_html}</p>
                    <p className='user'>{post.users.user_detail.user_nickname}</p>
                  </div>
                  <ThumbnailIMG img={postImg} alt='썸네일' />
                </Post>
              )
            })
          }

        </PostWrap>
      </Wrap>
    </Main>
  );
}
export default MyCalendar;


const Main = styled.div`
display: flex;
position: relative;
`

const Wrap = styled.div`
  display: flex;
  position: absolute;
  width: 90%;
  max-width: 1500px;
  max-height: 533px;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  /* margin: 160px auto 0 auto; */
  margin: auto;
  justify-content: space-between;
  @media screen and (max-width:1024px){
    height: 350px;
  }
`

const CalendarWrap = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  /* left: 250px; */
  border-radius: 10px;
  box-shadow: 0 16px 20px rgba(0, 0, 0, 0.1);

  @media screen and (max-width:1024px){
    width: 400px;
  }
`

const PostWrap = styled.div`
  width: 40%;
  height: 97%;
  margin-top: 20px;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar{
    width: 10px;
    background-color:white;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #ccc;
    border-radius: 50px;
  }
  .menu{
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: -1px;
    width: 98%;
    background-color: white;
    padding: 0 5px;
    z-index: 999;
  }
  .menu > ion-icon{
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`

const Post = styled.div`
  width: 98%;
  height: 230px;
  background-color: rgb(235, 235, 235);
  border-radius: 20px;
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
  }
  .text{ 
    position: absolute;
    width: 80%;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    color: rgba(0,0,0,0.7);
    font-size: 1rem;

    display: -webkit-box;
    word-break: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
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
`
// 썸네일
const ThumbnailIMG = styled.div`
display: ${(props) => props.img ? 'flex' : 'none'};
width: 50%;
height: 100%;
background: url(${(props) => props.img});
background-size: cover;
border-top-right-radius: 20px;
border-bottom-right-radius: 20px;
flex-grow: 1;
`

const HightLight = styled.div`
/* display: flex; */
/* position: absolute; */
/* background-color: rgba(0, 0, 0, 0, 0.2); */
  background-color: red;
`
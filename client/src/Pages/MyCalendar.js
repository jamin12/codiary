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

  const date = new Date();
  const [postDate, changeDate] = useState(date);
  const sendDate = new Date(+postDate + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '').substring(0, 10) + " 00:00:00"

  const [sendYear, setSendYear] = useState(sendDate.substring(0, 4));
  const [sendMonth, setsendMonth] = useState(sendDate.substring(5, 7));

  const [postsByDate, setPostByDate] = useState([]);
  // 받은 날짜에 대한 포스팅 기록 저장해서 표시
  const [mark, setMark] = useState([]);

  // TODO(이묘): mark에서 text에서 이미지 태그만 뽑아서 가장 첫번째 있는 이미지 태그만 뽑아서 넣기 - 함수구현
  /**
   * 가장 첫번째 이미지 태그 안에 주소를 postImg에 저장하는 함수
   */
  // const setPostImg = (htmlCode) => {

  // }
  // const postImg = setPostImg(mark.post_body_html)


  

  const nextMonth = (sendMonth) => {
    if (parseInt(sendMonth) < 9) {
      return "0" + (parseInt(sendMonth) + 1)
    } else {
      return (parseInt(sendMonth) + 1)
    }
  }
  /**
   * 해당 월에 post가 있으면 mark에 넣어줌
   */
  useEffect(() => {
    const getPostCountByMonthFun = async () => {
      const getPostCountByMonth = await axios.get(
        personal.getPersonalPostCountByDate("test"),
        {
          params: {
            startdate: `${sendYear}-${sendMonth}-01 00:00:00`,
            enddate: `${sendYear}-${nextMonth(sendMonth)}-01 00:00:00`
          }
        }
      );
      setMark(getPostCountByMonth.data.result_data);
    };
    getPostCountByMonthFun()
  }, [sendYear, sendMonth])



  /**
   *  사용자 날짜 별 포스트 목록 조회
   */
  useEffect(() => {
    const getPostsByDateFun = async () => {
      const getPostsByDate = await axios.get(
        personal.getPersonalPostsByDate("test"),
        { params: { startdate: sendDate/** postDate */, enddate: sendDate.substring(0, 8) + (postDate.getDate() + 1) + " " + sendDate.substring(11,)/** postDate에서 하루 뒤 */ } }
      );
      setPostByDate(getPostsByDate.data.result_data);
    };
    getPostsByDateFun();
  }, [postDate, sendDate]);



  /**
   * post onClick 함수
   */
  const onClickPost = (id, user) => {
    window.location.replace(`/${user}/${id}`)
  }

  /**
   * 현재 보고있는 월과 일을 찾아주는 함수
   */
  const viewChange = () => {
    setSendYear(document.querySelector('span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from').innerText.substr(0, 4))
    setsendMonth(document.querySelector('span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from').innerText.substr(6).slice(0, document.querySelector('span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from').innerText.substr(6).length - 1))
  }

  console.log(postsByDate)

  return (
    <Main>
      <SearchProfile />

      <Wrap>
        <CalendarWrap>
          <Calendar
            onChange={changeDate}   // useState로 포커스 변경시 현재 날짜 받아오기
            value={postDate}
            postDate={postDate}
            formatDay={(locale, date) => moment(date).format('DD')}   // 1'일'에서 일 제외하고 숫자만 보이게
            formatMonthYear={(locale, date) => moment(date).format('YYYY년 MM월')}
            // formatYear={(locale, date) => moment(date).format('YYYY')}
            minDetail="month"
            maxDetail="month"
            formatShortWeekday={(locale, date) => moment(date).format('ddd')}
            showNeighboringMonth={false}  // 이전 이후 달의 날짜는 안보이도록 설정하는 명령어
            onActiveStartDateChange={() => viewChange()}
            tileContent={({ date, view }) => {  // 날짜 타일에 갯수만큼 tile추가
              let html = [];
              mark.map(marked => {
                if (marked.date === moment(date).format('YYYY-MM-DD')) {
                  for (var i = 0; i < marked.count; i++) {
                    html.push(<div className='highlight'></div>)
                  }
                }
              })
              return (
                <div>
                  {html}
                </div>
              )

            }}

          />
        </CalendarWrap>

        <PostWrap>
          <div className='menu'>
            <h2>{postDate.getDate()}일</h2>
            <ion-icon name="library-outline"></ion-icon>
          </div>

          {
            postsByDate.map(post => {

              console.log(post)

              // const html = post.post_body_html
              // const imgStart = html.indexOf('src="')+5
              // const imgEnd = html.indexOf('"', imgStart)
              // const imgSrc = html.slice(imgStart, imgEnd)

              return (
                <Post onClick={() => onClickPost(post.post_id, post.posts?.users?.user_detail.user_unique_id)}>
                  <div className='text-box'>
                    <h1 className="title">{post.posts?.post_title}</h1>
                    <p className='user'></p>
                    <p className='user'>{post.posts?.users?.user_detail.user_unique_id}</p>
                  </div>
                  {/* <ThumbnailIMG img={imgSrc} alt='썸네일' /> */}
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

  .react-calendar__tile{
    padding-top: 0;
    position: relative;

    >abbr{
      margin-top: 10px;
      z-index: 99;
    }

      .highlight{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(72, 226, 17, 0.1);
    }
  }


`

const PostWrap = styled.div`
  width: 40%;
  height: 60vh;
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
  border: none;
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

    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
      
    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical
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
import React, { useEffect, useState } from 'react';
import SearchProfile from '../components/SearchProfile'
import Calendar from 'react-calendar';
import '../css/Calendar.css'; // css import
import '../css/reset.css'
import styled from 'styled-components';
import moment from 'moment';
import { personal, img } from '../api';
import axios from 'axios';
import default_img from '../IMG/codiary_default_img.png';
import { Link, useParams } from 'react-router-dom';
import { addDays, addMonths, format } from "date-fns"

const MyCalendar = () => {
  const { userId } = useParams();
  const date = new Date();
  const [postDate, changeDate] = useState(date);

  const [postsByDate, setPostByDate] = useState([]);
  // 받은 날짜에 대한 포스팅 기록 저장해서 표시
  const [mark, setMark] = useState([]);


  /**
   * 해당 월에 post가 있으면 mark에 넣어줌
   */
  useEffect(() => {
    const getPostCountByMonthFun = async () => {
      const getPostCountByMonth = await axios.get(
        personal.getPersonalPostCountByDate(userId),
        {
          params: {
            startdate: `${format(postDate, "yyyy-MM")}-01 00:00:00`,
            enddate:`${format(addMonths(postDate, 1), "yyyy-MM")}-01 00:00:00`
          }
        }
      );
      setMark(getPostCountByMonth.data.result_data);
    };
    getPostCountByMonthFun()
  }, [userId, postDate])


  /**
   *  사용자 날짜 별 포스트 목록 조회
   */
  useEffect(() => {
    const getPostsByDateFun = async () => {
      const getPostsByDate = await axios.get(
        personal.getPersonalPostsByDate(userId),
        { params: { 
          startdate: postDate.toISOString().split("T")[0] + " 00:00:00", 
          enddate: format(addDays(postDate, 1), "yyyy-MM-dd") + " 00:00:00"/** postDate에서 하루 뒤 */ } }
      );
      setPostByDate(getPostsByDate.data.result_data);
    };
    getPostsByDateFun();
  }, [postDate, userId]);



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
    const year = document.querySelector('span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from').innerText.substr(0, 4)
    const month = document.querySelector('span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from').innerText.substr(6).slice(0, document.querySelector('span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from').innerText.substr(6).length - 1)
    var newD = new Date(`${year}-${month}-01`)
    changeDate(newD)
  }

  /**
   * onError시 실행될 함수
   * 대체 이미지
   */
  const onErrorImg = (e) => {
    e.target.src = default_img;
  }

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
            minDetail="month"
            maxDetail="month"
            formatShortWeekday={(locale, date) => moment(date).format('ddd')}
            showNeighboringMonth={false}  // 이전 이후 달의 날짜는 안보이도록 설정하는 명령어
            onActiveStartDateChange={() => viewChange()}
            tileContent={({ date, view }) => {  // 날짜 타일에 갯수만큼 tile추가
              let html = [];
              // eslint-disable-next-line array-callback-return
              mark.map((marked) => {
                if (marked.date === moment(date).format('YYYY-MM-DD')) {
                  for (var i = 0; i < marked.count; i++) {
                    html.push(<div className='highlight'></div>);
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
            <Link className='link' to={`/${userId}`}><ion-icon name="library-outline"></ion-icon></Link>
          </div>

          {
            postsByDate.map(post => {

              let html = post.posts?.post_body_html;
              const imgSrcRex = /(<img[^>]+src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
              html = html?.replaceAll("&lt;", "<");
              let imgSrc = "";
              if (imgSrcRex.exec(html)) {
                imgSrc = RegExp.$2
              } else {
                imgSrc = default_img
              }

              return (
                <Post onClick={() => onClickPost(post.post_id, post.posts?.users?.user_detail.user_unique_id)}>
                  <div className='text-box'>
                    <h1 className="title">{post.posts?.post_title}</h1>
                    <div className='user-info'>
                      <img src={img.getImg(post.posts?.users?.user_detail.user_img)} alt="사용자 이미지" />
                      <span className='user'>{post.posts?.users?.user_detail.user_unique_id}</span>
                    </div>
                  </div>
                  <div className="post-img-wrap">
                    <img src={imgSrc} onError={onErrorImg} alt='썸네일' />
                  </div>
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
    .link{
      cursor: pointer;
      width: 40px;
      height: 40px;
      margin-right: 10px;

      ion-icon{
        width: 100%;
        height: 100%;
      }
    }
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
    width: 50%;
    position: relative;
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

    .user-info{
      position: absolute;
      left: 50%;
      bottom: 15px;
      transform: translateX(-50%);
      display: flex;
      width: 85%;
      img{
        width: 15%;
        height: 15%;
        border-radius: 50%;
      }
      .user{
        font-size: 1.3rem;
        align-items: center;
        margin-left: 10px;
      }
    }
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
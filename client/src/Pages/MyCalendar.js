import React, {useEffect, useState} from 'react';
import SearchProfile from '../components/SearchProfile'
import Calendar from 'react-calendar';
import '../css/Calendar.css'; // css import
import '../css/reset.css'
import styled from 'styled-components';
import moment from 'moment';
import { personal } from '../api';
import axios from 'axios';

const MyCalendar = () => {
  const [value, onChange] = useState(new Date());

  // 받은 날짜에 대한 포스팅 기록 저장해서 표시
  // const [mark, setMark] = useState([]);

  const mark = [
    {
      "post_id": 1,
      "post_title": "test1",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "qwer",
      "created_at": "2022-08-09 12:12",
      "updated_at": "2022-08-15 12:12",
      "posts_update_history": [
          {
              "post_update_history_id": 3,
              "post_id": 1,
              "update_history": "2022-08-15 12:12",
              "created_at": "2022-08-09 18:45",
              "updated_at": "2022-08-16 18:45"
          },
          {
              "post_update_history_id": 2,
              "post_id": 1,
              "update_history": "2022-08-15 12:12",
              "created_at": "2022-08-09 18:45",
              "updated_at": "2022-08-16 18:45"
          },
          {
              "post_update_history_id": 1,
              "post_id": 1,
              "update_history": "2022-08-15 12:12",
              "created_at": "2022-08-09 18:45",
              "updated_at": "2022-08-16 18:45"
          }
      ]
  },
  {
      "post_id": 2,
      "post_title": "test2",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "qwerqwer",
      "created_at": "2022-08-10 12:12",
      "updated_at": "2022-08-18 21:58",
      "posts_update_history": [
          {
              "post_update_history_id": 4,
              "post_id": 2,
              "update_history": "2022-08-15 12:12",
              "created_at": "2022-08-10 18:45",
              "updated_at": "2022-08-16 18:45"
          }
      ]
  },
  {
      "post_id": 3,
      "post_title": "qwer",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "asdf",
      "created_at": "2022-08-11 12:12",
      "updated_at": "2022-08-18 21:44",
      "posts_update_history": []
  },
  {
      "post_id": 4,
      "post_title": "qwerzxcv",
      "post_body_md": null,
      "post_body_html": null,
      "post_txt": "qaz",
      "created_at": "2022-08-12 12:12",
      "updated_at": "2022-08-18 21:59",
      "posts_update_history": []
  }
  ]

  // const [markDate, setMarkDate] = useState([]);

  const [postsByDate, setPostByDate] = useState({});	/**
	 *  사용자 날짜 별 포스트 목록 조회
	 */
	useEffect(() => {
		const getPostsByDateFun = async () => {
			const getPostsByDate = await axios.get(
				personal.getPersonalPostsByDate("test"),
        //TODO: value로 바꿔야하는데 value(날짜) 타입이 YYYY-MM-DD HH:mm:ss가 아님 수정 바람
				{ params: { startdate: "2022-08-01 00:00:00"/** value */, enddate: "2022-08-30 00:00:00"/** value */ } }
			);
			setPostByDate(getPostsByDate.data.result_data);
		};
		getPostsByDateFun();
    //TODO: 변수 이름 변경 바람(value)
	}, [value]);
  // 배열 안에 있는 날짜 뽑아오는 함수 구현해야함.
  const test = mark.map(date => date.created_at);
  console.log(test);
  console.log(value);
  return (
    <Main>
      <SearchProfile/> 

      <Wrap>
        <CalendarWrap>
          <Calendar 
            onChange={onChange}   // useState로 포커스 변경시 현재 날짜 받아오기
            value={value}
            formatDay={(locale, date) => moment(date).format('DD')}   // 1'일'에서 일 제외하고 숫자만 보이게
            formatMonth = {(locale, date) => moment(date).format('MMM')}
            formatMonthYear = {(locale, date) => moment(date).format('MMMM')}
            formatYear = {(locale, date) => moment(date).format('YYYY')}
            formatShortWeekday = {(locale, date) => moment(date).format('ddd')}
            showNeighboringMonth = {false}  // 이전 이후 달의 날짜는 안보이도록 설정
            
            // 날짜 받으면 색 추가해서 넣는 부분 진행해야함
            tileContent = {({date, view}) => {  // 날짜 타일에 갯수만큼 tile추가
              // 현재 날짜가 mark에 있다면 tile div 추가
              if(mark.find((x) => x === moment(date).format('YYYY-MM-DD HH:mm'))){
                return(
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
            <h2>{value.getDate()}일</h2>
            <ion-icon name="library-outline"></ion-icon>
          </div>

          <Post>
            <div className='text-box'>
              <h1 className="title">Lorem Ipsum</h1>
              <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survive</p>
              <p className='user'>user</p>
            </div>
            <ThumbnailIMG img='https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E' alt='썸네일' />
          </Post>
          
          <Post>
          <div className='text-box'>
              <h1 className="title">Lorem Ipsum</h1>
              <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survive</p>
              <p className='user'>user</p>
            </div>
            <ThumbnailIMG img='' alt='썸네일' />
          </Post>
          
          <Post>
          <div className='text-box'>
              <h1 className="title">Lorem Ipsum</h1>
              <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survive</p>
              <p className='user'>user</p>
            </div>
            <ThumbnailIMG img='https://cdn.pixabay.com/photo/2015/10/01/21/39/background-image-967820_960_720.jpg' alt='썸네일' />
          </Post>

          <Post>
            <div className='text-box'>
              <h1 className="title">Lorem Ipsum</h1>
              <p className="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survive</p>
              <p className='user'>user</p>
            </div>
            <ThumbnailIMG img='' alt='썸네일' />
          </Post>
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
width: 1500px;
height: 533px;
top: 50vh;
left: 50%;
transform: translate(-50%, -50%);
/* margin: 160px auto 0 auto; */
margin: auto;
justify-content: space-between;
`

const CalendarWrap = styled.div`
display: flex;
top: 100px;
/* left: 250px; */
/* transform: translateY(-40vh); */
border-radius: 10px;
box-shadow: 0 16px 20px rgba(0, 0, 0, 0.1);
padding: 20px;
`

const PostWrap = styled.div`
width: 35%;
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

const Post  = styled.div`
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
  bottom: 20px;
  left: 20px;
  font-weight: bold;
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
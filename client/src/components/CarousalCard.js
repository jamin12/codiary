import React from "react";
import styled from 'styled-components';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// CSS
  /* 1680기준 */
const MainWrap = styled.div`
  position: absolute;
  width: 1248px;
  height: 65%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1250px) {
    width: 80%;
  }

  .backThree, .forwardThree{
    width: 50px;
    height: 100%;
    cursor: pointer;
    transition: 0.3s;

    :hover{
      background-color: var(--gray200);
    }
  }
`
const CardWrap = styled.div`
  width: 90%;
  height: 100%;
  display: flex;

  
`
// CSS END

function Card({ id,img, title, body, date, user, img_u }) {

  // 서버에서 받아온 게시글 리스트들을 저장
  // const [postList, setList] = useState([]);

  // 뒤로 3개 게시글
  const clickGoBack = (e) => {
    alert('뒤에있는거 3개 주세요')
    // 현재 인덱스가 0이면 뒤로가기 버튼 비활성화
  }
  // 앞으로 3개 게시글 요청
  const clickGoFront = (e) => {
    alert('앞에있는거 3개 주세요')
    // 서버에 게시글 3개 요청
  }


  return (
    <MainWrap>
      {/* 뒤로 3개 */}
      <IoChevronBack className="backThree" onClick={clickGoBack}></IoChevronBack>

      <CardWrap>
        <div className="nonCard"></div>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <div className="nonCard"></div>
      </CardWrap>

      {/* 앞으로 3개 */}
      <IoChevronForward className='forwardThree' onClick={clickGoFront}></IoChevronForward>
    </MainWrap>
  );
}

export default Card;

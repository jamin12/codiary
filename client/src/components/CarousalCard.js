import React, {useState, useRef, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Cell from "./CardCell";

const MainCanvas = styled.div`
  position: relative;
  width: 1248px;
  height: 400px;
  perspective: 1500px;
  margin: 0 auto;
  background-color: black;
`
const test = keyframes`
  from{
      transform: rotateY(0);
  }
  to{
      transform: rotateY(-360deg);
  }
`
const CarouselWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(50%);
  width: 80%;
  height: 100%;
  background-color: red;
  transform-style: preserve-3d;
  animation: ${test} 40s linear infinite;
`
const Face = styled.div`
  position: absolute;
  background-color: pink;
  width: 300px;
  height: 400px;
  top: 0;
  left: 0;
  margin-left: -500px;
  transform-style: preserve-3d;
`
const Buttons = styled.div`

  button{
    position: absolute;
    top: 0;
    width: 50px;
    height: 100%;
  }
  button.prev{
    left: 0;
  }
  button.next{
    right: 0;
  }
`


const TOTAL_SLIDES = 29; // 전체 슬라이드 갯수(index라서 0번째 부터)

const Carousel = (props) => {

  const postlist = props.popularList;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  // Next버튼 클릭
  const NextSlideClick = () => {
    if(currentIndex >= TOTAL_SLIDES){
      // 받아온 리스트의 끝에 다다르면 서버에 post 3개 더 요청
      // 백엔드에 3장의 사진 추가 요청
      // totalIndex이 30을 넘어가면 앞에있는 3개씩 지워야함
    }else {
      setCurrentIndex(currentIndex +1);
    }
  }
  
  // Prev 버튼 클릭
  const PrevSlideClick = () => {
    if(currentIndex === 0){
      setCurrentIndex(TOTAL_SLIDES);  // 마지막 사진으로 넘어감
      // 클릭이 작동하지 않도록
    } else {
      setCurrentIndex( currentIndex -1);
    }
  }

  useEffect(() => {
    slideRef.current.style.trasition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentIndex}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
    }, [currentIndex]
  );


    return (
      // 보이는 영역
      <MainCanvas>  
        {/* // 돌아갈 영역 */}
        <CarouselWrap>
          {/* 요소를 감싸는 영역 */}
          <Face ref={slideRef}>
            {
              postlist.map(({id, user_nickname}) => {
                return(
                  // 요소 컴포넌트 호출
                  <Cell id={id} user_nickname={user_nickname}
                    />
                )
              })
            }
          </Face>
        </CarouselWrap>
        <Buttons>
            {/* <button className="prev" onClick={}>
              <IoChevronBack />
            </button>
            <button className="next" onClick={}>
              <IoChevronForward/>
            </button> */}
          </Buttons>
      </MainCanvas>

    );
  
}

export default Carousel;
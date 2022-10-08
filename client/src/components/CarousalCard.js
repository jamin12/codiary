import React, {useRef} from "react";
// import React, {useState, useRef, useEffect} from "react";
// import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styled from "styled-components";
import Cell from "./CardCell";


const MainCanvas = styled.div`
  position: relative;
  width: 80%;
  height: 400px;
  perspective: 1500px;
  margin: 0 auto;
  background-color: black;
`




const Carousel = (props) => {

  const postlist = props.popularList;
//   const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);


    return (
      // 보이는 영역
      <MainCanvas>  

      </MainCanvas>

    );
  
}

export default Carousel;
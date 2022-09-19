import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import PostCard from "./Cards";

const CarouselWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);  
  width: 1248px;
  height: 400px;
  perspective: 1500px;
`
const StyledSlider = styled(Slider)`
  background-color: pink;
  overflow: visible;
  position: absolute;
  top: 0;
  left: 50%;
  width: 75%;
  height: 100%;
  transform: translateX(-50%);
  transform-style: preserve-3d;

  .slick-prev,
  .slick-next
  {
    visibility: hidden;
  }
`
const Buttons = styled.button`
  position: absolute;
  top: 0;
  width: 50px;
  height: 100%;
`

export default class PreviousNextMethods extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.postlist = props.popularList
  }

  // const [currentIndex, setCurrentIndex] = useState(0);

  next() {
    this.slider.slickNext();
    console.log(this.postlist.length)
    // 받아온 리스트의 끝에 다다르면 서버에 post 3개 더 요청
    // currentIndex+3
  }
  previous() {
    this.slider.slickPrev();
    // currentIndex-3
    // totalIndex이 30을 넘어가면 앞에있는 3개씩 지워야함

  }
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: false,
      centerPadding: '0px'
    };
    return (
      <CarouselWrap>
        <StyledSlider ref={c => (this.slider = c)} {...settings}>
          {
            this.postlist.map(({id, user_nickname}) => {
              return(
                <PostCard id={id} user_nickname={user_nickname}
                  style={{
                    
                  }}/>
              )
            })
          }
        </StyledSlider>

        <div>
          <Buttons style={{left:0}} className="button" onClick={this.previous}>
            <IoChevronBack />
          </Buttons>
          <Buttons style={{right:0}} className="button" onClick={this.next}>
            <IoChevronForward/>
          </Buttons>
        </div>
      </CarouselWrap>
    );
  }
}
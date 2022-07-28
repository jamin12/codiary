import React from "react";
import "../css/Owlcarousel.css";

const Carousel = () => {
  return (
    // 나중에 다시 구현
    // 지금은 간단한 레이아웃만 잡아놨음
    <div className="wrap">
      <button className="btn pre-btn">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>

      <div className="con-wrap">
        <div className="content-box">1234</div>
        <div className="content-box">123</div>
        <div className="content-box">123</div>
      </div>

      <button className="btn next-btn">
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </div>
  );
};

export default Carousel;

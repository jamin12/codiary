import React, { useState } from "react";
import "../css/MypageStyle.css";

import SearchProfile from '../components/SearchProfile';

const Mypage = () => {

  const [Nickname] = useState('Emyo');

  return (
    <div className='Mypage-wrap'>
    <SearchProfile/>

      {/* 가운데 홈 글씨 */}
      <div className='mypage-main-txt'>
        <h3>{Nickname}'s</h3>
        <h1>CODIARY</h1>
      </div>

      <div className='folder-wrap'>
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
        <div className='folder'>
          <h3>전체보기</h3>
          <ion-icon name="chevron-down-outline"></ion-icon>
        </div>
      </div>


    </div>

  );
};

export default Mypage;

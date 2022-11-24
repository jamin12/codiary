import React, { useEffect, useState, } from 'react';
import styled from 'styled-components';
import { IoAdd } from "react-icons/io5";
import $ from 'jquery';
import './Category';
import MainCategory from './Category';
import axios from 'axios';
import { personal } from '../api';

// CSS
const MainWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  float: left;
`
const CategoryBox = styled.div`
  // background-color: var(--gray50);
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 20px 0;

  // 스크롤 스타일
  ::-webkit-scrollbar{
    background-color: transparent;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 50px;
    background-color: var(--gray200);
  }


  >div:nth-child(3n-1){
    margin: 10px 40px;
  }
`

const AddCategory = styled.div`
  width: 30%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content:center;
  border-radius: 20px;
  overflow: hidden;

  .btn-add{
    width: 100%;
    height: 100%;
    background-color: var(--gray100);
    cursor: pointer;
    transition: 0.3s;

    :hover{
      background-color: var(--gray700);
      color: var(--gray50);
    }
  }
`
// CSS END


const MyCategory = ({ categoryList }) => {

  const [categorys, setCategory] = useState([<MainCategory />]);


  // jQuery
  // *** 버튼을 누르면 그 버튼이 있는 폴더만 열도록 수정해야함!! ***
  // 백엔드 데이터 받으면 거기서 중복안되는 데이터? 이름? 을 id에 넣고 id기준으로 실행시켜야할 듯
  useEffect(() => {
    $('.drop-down').off('click').on('click', function (e) {
      // var item = e.target.id;
      // item .category-subfolder 이런식으로 쓰면 될 듯
      $('.category-subfolder').slideToggle();
      if ($('.drop-down').hasClass('off')) {
        $('.drop-down').removeClass('off').addClass('on');
        $('.category-mainfolder').css({
          'border-radius': '20px 20px 0 0'
        });
      } else {
        $('.drop-down').removeClass('on').addClass('off');
        $('.category-mainfolder').css({
          'border-radius': '20px'
        });
      }
    });
  });

  // Add main Category
  const addMainCategory = async () => {
    // 백엔드에 정보 추가한다는 내용 전달
    // TODO: body 데이터 부분 넣어주세요
    // await axios.post(personal.createPersonalCategory(),
    //   {
    //     category_name: "front create test",
    //     sub_category_id: 1
    //   },
    //   {
    //     withCredentials: true,
    //     headers: { "Content-Type": `application/json` },
    //   });
    setCategory(categorys.concat(<MainCategory />));
  }



  return (
    <MainWrap>
      <CategoryBox>

        {categorys}

        <AddCategory className='add-mainfolder' onClick={addMainCategory}>
          <IoAdd className='btn-add' />
        </AddCategory>
      </CategoryBox>
    </MainWrap>
  )
}
export default MyCategory;
import React from "react";
import styled from 'styled-components';
import { IoChevronDown, IoClose, IoRemove, IoAdd } from "react-icons/io5";
import axios from "axios";
import { personal } from "../api";


// CSS
const Category = styled.div`
  position: relative;
  /* z-index: 10; */
  width: 100%;
  flex-basis: 30%;
  margin: 10px 0;

  .category-delete{
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%,-40%);
    font-size: 1.7rem;
    background-color: var(--gray800);
    color: var(--gray50);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    :hover{
      background-color: var(--gray900);
    }
  }

  .category-mainfolder{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 70px;   // 카테고리박스와 같은 높이
    margin: 0 auto;
    background-color: var(--gray100);
    border-radius: 20px;
    overflow: hidden; 
    box-sizing: border-box;
    align-items: center;
    z-index: 10;

    transition: 0.3s;

    .drop-down{
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 13px;
      transition: 0.3s;
    }
    .drop-down.on{
      transform: rotate(180deg);
    }
    .drop-down.off{
      transform: rotate(0deg);
    }

    .maintitle{
      border: none;
      width: 80%;
      height: 60%;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: transparent;
      margin-left: 13px;
      font-weight: 700;
      :focus {
        background-color: var(--gray50);
        font-weight: 300;
      }
    }
  }

  .category-subfolder{
    display: none;
    position: relative;
    z-index: 999;
    background-color: var(--gray200);
    padding: 0px 0 50px 0;
    // margin-top: -50px;
    border-radius: 0 0 50px 50px;
    overflow: hidden;

  .category-subtitle{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray800);
    align-items: center;

    #subtitle{
      border: none;
      width: 80%;
      height: 60%;
      font-size: 1.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: transparent;
      font-weight: 700;
      :focus {
        background-color: var(--gray100);
        font-weight: 300;
      }
    }

    .folder-remove{
      cursor: pointer;
      font-size: 1.3rem;
    }
  }

    .add-subfolder{
      z-index: 999;
      width: 100%;
      height: 50px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      color: var(--gray600);
      cursor: pointer;
      z-index: 999;
      transition: 0.3s;
      :hover{
        background-color: var(--gray700);
        color: var(--gray50);
      }
    }
  }
`
// CSS END

const MainCategory = (category_id, sub_category_id) => {

  // TODO: 카테고리 이름 가져오기
  // Add sub category
  const addSubCategory = async () => {
    await axios.post(personal.createPersonalCategory(),
      {
        category_name: "",
        sub_category_id: sub_category_id
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    )
    alert("서브카테고리 추가")
  }

  // TODO: 삭제 기능을 따로 나눌 필요 없음
  // delete main Category
  const deleteMainCategory = async (category_id) => {
    await axios.delete(personal.deletePersonalCategory(category_id),
      {
        withCredentials: true,
      });
    alert('메인카테고리 삭제')
  }

  // delete sub Category
  const deleteSubCategory = async (sub_category_id) => {
    await axios.delete(personal.deletePersonalCategory(sub_category_id),
      {
        withCredentials: true,
      });
    alert('서브 카테고리 삭제')
  }




  return (
    <Category>
      <IoClose className='category-delete' onClick={deleteMainCategory} />

      <div className='category-mainfolder'>
        <input id='mainT1' className='maintitle' type='text' name='maintitle'></input>
        <IoChevronDown className='drop-down off' />
      </div>

      <div className="category-subfolder">
        <div className="category-subtitle">
          <input id='subtitle' type='text' name='subtitle'></input>
          <IoRemove className='folder-remove' onClick={deleteSubCategory} />
        </div>
        <IoAdd className='add-subfolder' onClick={addSubCategory} />
      </div>
    </Category>
  )
}
export default MainCategory;

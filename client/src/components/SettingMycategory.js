import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IoChevronDown, IoClose, IoRemove } from "react-icons/io5";

const MyCategory = ({categoryList}) => {
  //css
  const MainWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    float: left;
  `

  const CategoryBox = styled.div`
    background-color: var(--gray50);
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 20px 0;

    >div:nth-child(3n-1){
      margin: 0 40px;
    }
  `

  const Category = styled.div`
    position: relative;
    background-color: var(--gray200);
    height: 79px;
    justify-content: space-between;
    flex-basis: 27.5%;
    padding: 0 10px;
    border-radius: 20px;

    .category-header{
      .drop-down{
        // background-color: red;
      }
      .category-delete{
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%,-50%);
        font-size: 1.7rem;
        background-color: var(--gray800);
        color: var(--gray50);
        border-radius: 50%;
      }

      .category-maintitle{
        display: flex;
        justify-content: space-between;
      }
    }

    
  `

  const title = 'hi'

  const changeHandler = useCallback(e => {
    
  })

  return (
    <MainWrap>
      <CategoryBox>
        <Category>
          {/* {categoryList.map((cg) => { */}
            <div className="category-header">
              {/* <h1>{cg.title}</h1> */}
              <IoClose className='category-delete'/>
              <div className='category-maintitle'>
                <input type='text' name='mainTitle' value={title} onChange={changeHandler}></input>
                <IoChevronDown className='drop-down'/>
              </div>
              <div className="category-subfolder">
                <div className="category-subtitle">
                  <p>subfolder</p>
                  <IoRemove/>
                </div>
                <div className="category-subtitle">
                  <p>subfolder</p>
                  <IoRemove/>
                </div>
                <div className="category-subtitle">
                  <p>subfolder</p>
                  <IoRemove/>
                </div>
              </div>

            </div>

          {/* })} */}
        </Category>

        
      </CategoryBox>
    </MainWrap>
  )
}
export default MyCategory;
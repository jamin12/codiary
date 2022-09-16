import React, {useEffect,} from 'react';
import styled from 'styled-components';
import { IoChevronDown, IoClose, IoRemove, IoAdd } from "react-icons/io5";
import $ from 'jquery';

const MyCategory = ({categoryList}) => {
  //css
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

      #maintitle{
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

  // jQuery
  // *** 버튼을 누르면 그 버튼이 있는 폴더만 열도록 수정해야함!! ***
  // 경민오빠한테서 데이터 받으면 거기서 중복안되는 데이터? 이름? 을 id에 넣고 id기준으로 실행시켜야할 듯
  useEffect(() => {
    $('.drop-down').click(function(e) {
      console.log(e.target.id)  // 각각에 맞는 id로 나옴
      // var item = e.target.id;
      // item .category-subfolder 이런식으로 쓰면 될 듯
      $('.category-subfolder').slideToggle();
      if($('.drop-down').hasClass('off')) {
        $('.drop-down').removeClass('off').addClass('on');
        $('.category-mainfolder').css({
          'border-radius': '20px 20px 0 0'
        });
      }else{
        $('.drop-down').removeClass('on').addClass('off');
        $('.category-mainfolder').css({
          'border-radius': '20px'
        });
      }
    });
  });

  return (
    <MainWrap>
      <CategoryBox>
          {/* {categoryList.map((cg) => { */}
            <Category>
              {/* <h1>{cg.title}</h1> */}
              {/* value안에 서버에서 받아온 카테고리들 넣어야함 */}
              <IoClose className='category-delete'/>

              <div className='category-mainfolder'>
                <input id='maintitle' type='text' name='maintitle'></input>
                <IoChevronDown className='drop-down off'/>
                {/* <ion-icon className='drop-down' name="chevron-down-outline"></ion-icon> */}
              </div>

              <div className="category-subfolder">
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>

                <IoAdd className='add-subfolder'/>
              </div>

            </Category>
          {/* })} */}

          {/* 실제 데이터 집어넣을땐 밑에 다른 카테고리는 전부 제거 */}
          <Category>
              {/* <h1>{cg.title}</h1> */}
              {/* value안에 서버에서 받아온 카테고리들 넣어야함 */}
              <IoClose className='category-delete'/>

              <div className='category-mainfolder'>
                <input id='maintitle' type='text' name='maintitle'></input>
                <IoChevronDown className='drop-down off'/>
                {/* <ion-icon className='drop-down' name="chevron-down-outline"></ion-icon> */}
              </div>

              <div className="category-subfolder">
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>

                <IoAdd className='add-subfolder'/>
              </div>

          </Category>

          <Category>
              {/* <h1>{cg.title}</h1> */}
              {/* value안에 서버에서 받아온 카테고리들 넣어야함 */}
              <IoClose className='category-delete'/>

              <div className='category-mainfolder'>
                <input id='maintitle' type='text' name='maintitle'></input>
                <IoChevronDown className='drop-down off'/>
                {/* <ion-icon className='drop-down' name="chevron-down-outline"></ion-icon> */}
              </div>

              <div className="category-subfolder">
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>

                <IoAdd className='add-subfolder'/>
              </div>

          </Category>

          <Category>
              {/* <h1>{cg.title}</h1> */}
              {/* value안에 서버에서 받아온 카테고리들 넣어야함 */}
              <IoClose className='category-delete'/>

              <div className='category-mainfolder'>
                <input id='maintitle' type='text' name='maintitle'></input>
                <IoChevronDown id='test123' className='drop-down off'/>
                {/* <ion-icon className='drop-down' name="chevron-down-outline"></ion-icon> */}
              </div>

              <div className="category-subfolder">
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>

                <IoAdd className='add-subfolder'/>
              </div>

          </Category>

          <Category>
              {/* <h1>{cg.title}</h1> */}
              {/* value안에 서버에서 받아온 카테고리들 넣어야함 */}
              <IoClose className='category-delete'/>

              <div className='category-mainfolder'>
                <input id='maintitle' type='text' name='maintitle'></input>
                <IoChevronDown className='drop-down off'/>
                {/* <ion-icon className='drop-down' name="chevron-down-outline"></ion-icon> */}
              </div>

              <div className="category-subfolder">
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>
                <div className="category-subtitle">
                  <input id='subtitle' type='text' name='subtitle'></input>
                  <IoRemove className='folder-remove'/>
                </div>

                <IoAdd className='add-subfolder'/>
              </div>

          </Category>

        <AddCategory className='add-mainfolder'>
          <IoAdd className='btn-add'/>
        </AddCategory>
      </CategoryBox>
    </MainWrap>
  )
}
export default MyCategory;
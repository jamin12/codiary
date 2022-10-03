import React, { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

//css
const MainWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: rgba(26, 26, 31, 0.7);
  display: ${props => props.modal ? "flex" : "none"};
`
const Modal = styled.div`
  margin: 150px auto;
  width: 600px;
  height: 350px;
  background-color: var(--gray100);
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;

  div{
    width: 100%;
  }

  .title{
    margin-top: 10px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    h2{
      color: var(--gray800);
    }
    .btn-close{
      font-size: 30px;
      color: var(--gray500);
      transition: 0.2s;
      cursor: pointer;
      :hover{
        color: var(--gray800);
      }
    }
  }
`
const TagList = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  margin: 8px 0 0 10px;
  background-color: red;
  overflow-y: scroll;
  .tag-item{
    padding: 3px 7px;
    border: 1px solid var(--gray600);
    background-color: var(--gray200);
    margin-right: 15px;
    border-radius: 50px;
    transition: 0.2s;
    cursor: pointer;
    
    :hover{
      background-color: var(--gray400);
    }
  }
`

const MessageBox = () => {

  const [modal, setModal] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags]= useState([]);

  // 모달 닫히게 하는 함수
  const closeModal = () => {
    setModal(false);
  }

  // tag입력 input onChange 이벤트
  const onChangeTags = (e) => {
    setTagInput(e.target.value);
  }
  
  // 태그를 입력하고 enter를 누르면 배열에 저장되면서 밑에 div가 생기는 이벤트
  const keyEventEnter = (e) => {
    if(e.key === 'Enter'){
      // 배열에 input의 value 저장
      alert(tagInput);
      setTagInput(tagInput);
      setTags(tags => [...tags, tagInput]);
      setTagInput('');
      console.log(tags)
    }
  }

  // 태그를 클릭하면 없어지는 클릭 이벤트
  const deleteList = (e) => {
    // tags 배열에서 클릭한 요소 삭제
    alert('삭제시킵니다.');
  }

  return(
    <MainWrap modal={modal}>
      <Modal>
        <div className="title">
          <h2>저장 옵션</h2>
          <IoClose className="btn-close" onClick={closeModal}/>
        </div>
        <div className="tags">
          <h2>태그</h2>
          <input className="tagbox" type='text' value={tagInput} onChange={onChangeTags} onKeyPress={keyEventEnter}/>
          <TagList>
              {
                tags.map(tag => (<p className="tag-item" onClick={deleteList}>{tag}</p>))
              }
          </TagList>
        </div>
      </Modal>
    </MainWrap>
  )
}
export default MessageBox;
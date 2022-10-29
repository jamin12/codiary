import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { personal } from "../api/index";
import '../css/reset.css';

// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

function OptionModal(props) {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState("");
  const [category, setCategory] = useState({});



  // tag입력 input onChange 이벤트
  const onChangeTags = (e) => {
    setTagInput(e.target.value);
  }

  // 태그를 입력하고 enter를 누르면 배열에 저장되면서 밑에 div가 생기는 이벤트
  const keyEventEnter = (e) => {
    if (e.key === 'Enter') {
      // 배열에 input의 value 저장
      alert(tagInput);
      setTagInput(tagInput);
      setTags(tags => [...tags, tagInput]);
      setTagInput('');
    }
  }

  // 태그를 클릭하면 없어지는 클릭 이벤트
  const deleteList = (e) => {
    // tags 배열에서 클릭한 요소 삭제
    alert('삭제시킵니다.');
  }

  const onChangeSelect = (e) => {
    setSelected(e.target.value);
  }

  const testList = [];

  /**
   * 서버에서 유저의 카테고리들을 받아와야 함
   */
  useEffect(() => {
    const getCategorys = async() => {
      const getCategory = await axios.get(
        personal.getPersonalMyCategory(),
        { withCredentials: true }
      );
      setCategory(getCategory.data.result_data);
      console.log(category);
    }
    getCategorys();
  }, []);


  /**
   * 포스트 저장
   */
  const onClickSave = async () => {
    alert("save")
    // TODO: body부분 값 변경
    // 일단 수정 했는데 확인 바람
    await axios.post(
      personal.createPersonalPost(),
      {
        post: {
          post_title: props.title,
          post_body_md: props.dataMd,
          post_body_html: props.dataHtml,
          post_txt: props.dataTxt,
          category_id: 2,
        },
        tag: {
          tag_name: ["테스트 태그", "리스트 테스트2"],
        },
      },
      {
        withCredentials: true,
        headers: { "Content-Type": `application/json` },
      }
    );
    // 서버에 toHTML과 toMARKDOWN 전송
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          저장옵션
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <TagWrap>
          <h4>태그</h4>
          <input className="tag-input" type='text' value={tagInput} onChange={onChangeTags} onKeyPress={keyEventEnter} />
          <div>
            {
              tags.map(tag => (<p className="tag-item" onClick={deleteList}>{tag}</p>))
            }
          </div>
        </TagWrap>

        <CategoryWrap>
          <h4>카테고리</h4>
          <select className='selectBox' onChange={onChangeSelect} value={selected}>
            {
              // TODO: testList 서버에서 받아온 카테고리 리스트로 변경
              testList.map(list => (
                <option value={list} key={list}>
                  {list}
                </option>
              ))
            }
          </select>

        </CategoryWrap>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClickSave}>SAVE</Button>
      </Modal.Footer>
    </Modal>
  );
}

/**
 * css
 */
// 태그 감싸는 div
const TagWrap = styled.div`
  .tag-input{
    background-color: var(--gray50);
    border: 1px solid var(--gray500);
    width: 100%;
    border-radius: 50px;
    height: 30px;
    box-sizing: border-box;
    padding: 0 10px;
  }

  > div{
    width: 100%;
    margin: 10px auto;
    height: 44px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;

    // 스크롤 바
    ::-webkit-scrollbar{
      width: 100%;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb{
      background-color: var(--gray400);
      border-radius: 50px;
    }
    .tag-item{
      box-sizing: border-box;
      height: 33px;
      padding: 3px 7px;
      border: 1px solid var(--gray400);
      background-color: var(--gray100);
      margin-right: 15px;
      border-radius: 50px;
      transition: 0.2s;
      white-space: nowrap;
      cursor: pointer;

      :last-child{
        margin-right: 0;
      }
      :hover{
        background-color: var(--gray400);
      }
    }
  }
`
// 카테고리 설정 창 감싸는 div
const CategoryWrap = styled.div`
  .selectBox{
    border-radius: 50px;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    background-color: var(--gray50);
  }
`
export default OptionModal;

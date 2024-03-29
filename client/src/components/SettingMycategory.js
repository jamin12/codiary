import React, { useEffect, useState, } from 'react';
import styled from 'styled-components';
import { IoAdd } from "react-icons/io5";
import $ from 'jquery';
import './Category';
import MainCategory from './Category';
import axios from 'axios';
import { personal } from '../api';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const MyCategory = () => {

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [mainValue, setMainValue] = useState("");

  const [checkCategoryChange, setCheckCategoryChange] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  /**
   * 내 카테고리 가져오기
   */
  useEffect(() => {
    const GetCategoryFun = async () => {
      const getCategory = await axios.get(
        personal.getPersonalMyCategory(), {
        withCredentials: true,
      }
      );
      setCategory(getCategory.data.result_data);
    }
    setCheckCategoryChange(0);
    GetCategoryFun()
  }, [checkCategoryChange]);

  /**
   * 서브카테고리 분류
   */
  useEffect(() => {
    const subArr = [];
    category.map(item => {
      if (item.sub_category_id !== null) {
        subArr.push(item)
      }
    })
    setSubCategory(subArr);
  }, [category])

  /**
   * 카테고리 삭제
   * @param {int} category_id 
   */
  const deleteCategory = async (category_id) => {
    const confirmQ = window.confirm("정말로 삭제하시겠습니까? 삭제한 내용은 복구가 불가능합니다.");
    if (confirmQ) {
      await axios.delete(personal.deletePersonalCategory(category_id),
        {
          withCredentials: true,
        });
      setCheckCategoryChange(1);
    }
    else {
      return false;
    }
  }

  /**
   * 카테고리 추가
   */
  const addCategory = async (name, sub_id) => {
    if (sub_id === null) {  // 메인카테고리 추가
      await axios.post(personal.createPersonalCategory(),
        {
          category_name: name,
          // sub_category_id: 
        },
        {
          withCredentials: true,
          headers: { "Content-Type": `application/json` },
        });
    }
    else {  // 서브카테고리 추가
      await axios.post(personal.createPersonalCategory(),
        {
          category_name: name,
          sub_category_id: sub_id
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      )
    }
    // setCategory(category.concat(<MainCategory />));
    setMainValue("")

    handleClose();
    setCheckCategoryChange(1)
  }






  return (
    <MainWrap>
      <CategoryBox>

        <MainCategory
          category={category}
          subCategory={subCategory}
          setCheckCategoryChange={setCheckCategoryChange}
          deleteCategory={deleteCategory}

          addCategory={addCategory} />

        <AddCategory
          className='add-mainfolder'
          onClick={handleShow}
        >
          <IoAdd className='btn-add' />
        </AddCategory>
      </CategoryBox>


      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>메인카테고리 이름을 입력해주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Input
                type={"text"}
                value={mainValue}
                onChange={(e) => setMainValue(e.target.value)}
                autoFocus>
              </Input>
              <input style={{display:"none"}}></input>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addCategory(mainValue, null)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </MainWrap>
  )
}
export default MyCategory;


// CSS
const MainWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  float: left;
`
const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-radius: 10px;
  border: 2px solid var(--gray200);
  :focus{
    outline: none;
  }
`
const CategoryBox = styled.div`
  // background-color: var(--gray50);
  width: 100%;
  height: 100%;
  /* overflow-x: hidden; */
  overflow-y: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  /* background-color: red; */
  box-sizing: border-box;

  // 스크롤 스타일
  ::-webkit-scrollbar{
    background-color: inherit;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 50px;
    background-color: var(--gray200);
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
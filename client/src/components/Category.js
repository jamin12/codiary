import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { IoChevronDown, IoClose, IoRemove, IoAdd } from "react-icons/io5";
import axios from "axios";
import { personal } from "../api";
import InputMain from "./CategoryInput/Main";
import InputSub from "./CategoryInput/Sub";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


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
    background-color: var(--gray700);
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
    border-radius: 20px 20px 0 0;
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
    /* display: none; */
    position: relative;
    z-index: 999;
    background-color: var(--gray200);
    padding: 0px 0 50px 0;
    // margin-top: -50px;
    border-radius: 0 0 20px 20px;
    overflow: hidden;

  .category-subtitle{
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray800);
    align-items: center;

    .input-sub-category{
      border: none;
      width: 80%;
      height: 60%;
      font-size: 1.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: rgba(0,0,0,0);
      font-weight: 600;
      :focus {
        background-color: var(--gray100);
        font-weight: 400;
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

  .btn-save{
    margin: 0 10px;
    border-radius: 10px;
    border: none;
    background-color: var(--gray400);
    color: white;
    width: 3rem;
  }
`
// CSS END


const MainCategory = (props) => {

  const categorys = props.category;
  const subCategorys = props.subCategory;
  const deleteC = props.deleteCategory;

  const [show, setShow] = useState(false);
  const [subValue, setSubValue] = useState("");
  const [wantAddSub, setWantAddSub] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteCategory = (id) => {
    deleteC(id)
  }

  const addCategory = (id) => {
    handleShow();
    setWantAddSub(id);
  }

  /**
 * 수정 버튼 onClick
 * @param {int} id 
 * @param {String} name 
 * @param {int} sub_id 
 */
  const updateCategory = async (id, name, sub_id) => {
    if (sub_id !== null) {
      await axios.patch(
        personal.updatePersonalCategory(id),
        {
          category_name: name,
          sub_category_id: parseInt(sub_id)
        },
        { withCredentials: true }
      );
    }
    else {
    } await axios.patch(
      personal.updatePersonalCategory(id),
      {
        category_name: name,
      },
      { withCredentials: true }
    );
  }

  /**
   * 서브 폴더 추가 onClick
   * @param {String} subValue 
   * @param {int} wantAddSub 
   */
  const onClickAddSubCategory = (subValue, wantAddSub) => {
    props.addCategory(subValue, wantAddSub);
    setSubValue("");
    handleClose();
  }

  /**
   * 서브폴더 추가 취소 onClick
   */
  const onClickCancle = () => {
    setSubValue("");
    handleClose();
  }

  return (
    <>
      {
        categorys.map(category => {
          if (category.sub_category_id === null) {
            return (
              <Category className="category">
                <IoClose className='category-delete' onClick={() => deleteCategory(category.category_id)} />

                <div className='category-mainfolder'>

                  <InputMain
                    id={category.category_id}
                    sub_id={category.sub_category_id}
                    value={category.category_name}
                    updateCategory={updateCategory} />

                </div>


                <div className="category-subfolder">
                  {
                    subCategorys.map(subCategory => {
                      if (category.category_id === subCategory.sub_category_id) {
                        return (
                          <div className="category-subtitle">
                            <InputSub
                              id={subCategory.category_id}
                              sub_id={subCategory.sub_category_id}
                              value={subCategory.category_name}
                              updateCategory={updateCategory}
                              onClickDelete={deleteCategory}
                            />
                          </div>
                        )
                      }
                    })
                  }
                  <IoAdd className='add-subfolder' onClick={() => addCategory(category.category_id)} />
                </div>
              </Category>
            )
          }
        })
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>서브 카테고리 이름을 입력해주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                value={subValue}
                onChange={(e) => setSubValue(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickCancle}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onClickAddSubCategory(subValue, wantAddSub)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MainCategory;



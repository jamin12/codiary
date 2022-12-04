import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoArrowDown } from "react-icons/io5";

const SettingReportModal = (props) => {

  const optionRType = [
    "욕설",
    "음란물",
    "개인정보 노출",
    "불법 정보",
    "기타"
  ]

  const show = props.modalShow;
  const onClickModalClose = props.onClickModalClose;
  const data = props.data;
  
  console.log(data)
  

  return (
    <Modal centered show={show} onHide={onClickModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>신고 상세 정보</Modal.Title>
      </Modal.Header>

      <Modal.Body>


        <Section>
          <p>신고 사유 : {optionRType[data?.report?.report_type]}</p>
        </Section>

        <Section>
          <p className='title'>신고 내용</p>
          <p className='contents'>
            {
              data?.report?.report_body !== null ?
              data?.report?.report_body
              : 
              "-"
            }
          </p>
        </Section>

        <Section>
          <span>{data?.report?.report_user}</span>
          <IoArrowDown/>
          {
            data?.report?.report_target_type === 0 ? 
            //게시글
            <span>{data?.post?.users?.user_detail?.user_unique_id}</span>
            :
            //댓글
            <span>{data?.comment?.users?.user_detail.user_unique_id}</span>
          }
        </Section>

        <Section>
          {
            data?.report?.report_target_type === 0 ? 
            <a href={`/${data?.post?.users?.user_detail?.user_unique_id}/${data?.post?.post_id}`}>해당 포스트로 이동</a>
            :
            <a href={`/${data?.report?.report_user}/${data?.comment?.post_id}`}>해당 댓글이 있는 포스트로 이동</a>
          }
        </Section>

      </Modal.Body>
    </Modal>
  );
}

export default SettingReportModal;

const Section = styled.div`

  :nth-child(2){
    .title{
      margin-bottom: 5px;
    }
    .contents{
      border: 1.5px solid var(--gray300);
      border-radius: 10px;
      padding: 3px 10px;
      margin-top: 0;
    }
  }

  :nth-child(3){
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    font-size: 0.89rem;
    color: var(--gray600)
  }

  :nth-child(4){
    text-align: right;
    a{
      color: var(--blue);
      transition: 0.3s;

      :hover{
        color: var(--hover-blue)
      }
    }
  }
`
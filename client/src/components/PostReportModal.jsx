import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { manage } from '../api';
import styled from 'styled-components';

const SettingReportModal = (props) => {

  const user = props.user;
  const reportType = props.reportType;
  const postId = props.postId;

  // 신고 타입
  const optionRType = [
    "욕설",
    "음란물",
    "개인정보 노출",
    "불법 정보",
    "기타"
  ]
  const [selectValueRtype, setselectValueRtype] = useState("");
  const [reportValue, setReportValue] = useState("");

  const show = props.show;
  const onClickModalClose = props.onClickModalClose;
  const reportCommentId = props.reportCommentId;

  /**
   * 신고버튼 onClick
   */
  const onClickReport = async (reportUserID,) => {
    setReportValue("")
    setselectValueRtype("")
    const reportBody = {
      report_user: reportUserID,
      report_target_type: reportType,
      report_type: optionRType.indexOf(selectValueRtype),
    }
    if(reportType === 0){
      reportBody.report_target_id = postId
      if (reportValue.trim() === "") {
        await axios.post(manage.createReport(), reportBody
        )
      }
      else {
        reportBody.report_body = reportValue;
        await axios.post(manage.createReport(), reportBody
        )
      }
    }
    else{
      reportBody.report_target_id = reportCommentId
      if (reportValue.trim() === "") {
        await axios.post(manage.createReport(), reportBody
        )
      }
      else {
        reportBody.report_body = reportValue;
        await axios.post(manage.createReport(), reportBody
        )
      }
    }
  }

  return (
    <Modal centered show={show} onHide={onClickModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {
            reportType === 0 ? "게시글 " : "댓글 "
          }
          신고하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Report>
          <p>
            신고 이유
          </p>
          <select onChange={(e) => setselectValueRtype(e.target.value)} value={selectValueRtype}>
            {
              optionRType.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              })
            }
          </select>
        </Report>

        <Report>
          <p>
            신고 내용
          </p>
          <input
            value={reportValue}
            onChange={(e) => setReportValue(e.target.value)}
          ></input>
        </Report>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary"
          onClick={() => { onClickReport(user); onClickModalClose(); }}>
          신고
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingReportModal;

const Report = styled.div`
  margin-bottom: 20px;
  &:last-child{
    margin-bottom: 0;
  }

  p{
    margin: 0;
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  select{
    border-radius: 10px;
    border: 2px solid var(--gray400);
  }

  input{
    border-radius: 10px;
    border: 2px solid var(--gray400);
    width: 100%;
    padding: 3px 10px;

    :focus{
      outline: none;
    }
  }

`
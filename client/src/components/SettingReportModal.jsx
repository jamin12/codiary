import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SettingReportModal = (props) => {

  const show = props.modalShow;
  const onClickModalClose = props.onClickModalClose;
  const data = props.data;
  
  console.log(data)

  return (
    <Modal show={show} onHide={onClickModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>신고 상세 정보</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Section>
          <p>신고한 회원</p>
        </Section>

        <Section>
          <p>신고 내용</p>
        </Section>

      </Modal.Body>
    </Modal>
  );
}

export default SettingReportModal;

const Section = styled.div`

`
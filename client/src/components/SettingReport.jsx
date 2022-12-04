import React, { useState, useEffect } from 'react';
import { manage } from '../api';
import axios from 'axios';
import Datepicker from './DatePicker';
import { addDays } from "date-fns"
import styled from 'styled-components';
import { IoCalendarOutline, IoGitMerge } from 'react-icons/io5';
import { Table } from 'react-bootstrap';
import SettingReportModal from './SettingReportModal';

const SettingReport = () => {

  const [reportList, serReportList] = useState([]);
  const [reportType, setReportType] = useState(-1);
  const [reportTargetType, setReportTargetType] = useState(-1);
  const [render, setRender] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const newdate = new Date();
  const [state, setState] = useState([
    {
      startDate: newdate,
      endDate: addDays(newdate, 1),
      key: 'selection'
    }
  ]);

  const [Sdate, setSdate] = useState("");
  const [Edate, setEdate] = useState("");
  const [showCalender, setShowCalender] = useState(false);  // 캘린더 여는 토글

  // 신고 타입
  const optionRType = [
    "전체보기",
    "욕설",
    "음란물",
    "개인정보 노출",
    "불법 정보",
    "기타"
  ]
  const [selectValueRtype, setselectValueRtype] = useState("");

  // 신고 타겟 타입
  const optionRTType = [
    "전체보기",
    "게시글",
    "댓글"
  ]
  const [selectValueRTType, setselectValueRTType] = useState("");



  /**
   * 신고 리스트를 받아오는 함수
   */
  useEffect(() => {
    const getReportListFun = async () => {
      const getReportList = await axios.get(manage.getReports(reportType, reportTargetType), {
        params: {
          startDate: Sdate,
          endDate: Edate,
          offset: 0,
        },
        withCredentials: true
      })
      serReportList(getReportList.data.result_data)
      setRender(false)
    }
    getReportListFun();
  }, [Edate, Sdate, reportTargetType, reportType, render]);
  console.log(reportList)


  /**
 * 선택 날짜가 바뀔 때마다 실행되는 함수
 */
  useEffect(() => {
    setSdate(addDays(state[0].startDate, 1).toISOString().split("T")[0] + " 00:00:00");
    setEdate(addDays(state[0].endDate, 1).toISOString().split("T")[0] + " 23:59:59");
  }, [state])


  /**
   * select 박스 onChange 함수
   * @param {*} e 
   * @param {int} type  // 0: 신고타입, 1: 신고타겟타입
   */
  const onChangeSelect = (e, type) => {
    if (type === 1) {
      setselectValueRtype(e.target.value);
      setReportType(optionRType.indexOf(e.target.value) - 1)
    }
    else {
      setselectValueRTType(e.target.value);
      setReportTargetType(optionRTType.indexOf(e.target.value) - 1)
    }
  }

  /**
   * 신고 삭제버튼 onClick 함수
   */
  const onClickReportDelete = (rid) => {
    if (window.confirm("목록에서 정말로 제거하시겠습니까?")){
      axios.delete(manage.deleteReport(rid),
      {
        withCredentials: true
      })
      setRender(true);
    }
  }

  /**
   * 신고 삭제 게시글 & 댓글 삭제 onClick 함수
   */
  const onClickReport_PC_Delete = (rtid, rtype) => {
    if (window.confirm("해당 게시글(또는 댓글)을 정말로 삭제하시겠습니까?")){
      axios.delete(manage.deleteReportTarget(rtype, rtid),
      {
        withCredentials: true
      })
      setRender(true);
    }
  }

  const onClickModalClose = () => {
    setModalShow(false)
  }



  return (
    <Main>

      <SettingReportModal
        modalShow={modalShow}
        onClickModalClose={onClickModalClose}
        data={modalData}
      />

      <Option>
        <select onChange={(e) => onChangeSelect(e, 1)} value={selectValueRtype}>
          {
            optionRType.map((item, index) =>
              <option key={index} value={item}>{item}</option>
            )
          }
        </select>
        <select onChange={(e) => onChangeSelect(e, 2)} value={selectValueRTType}>
          {
            optionRTType.map((item, index) =>
              <option key={index} value={item}>{item}</option>
            )
          }
        </select>
        <div className='calender-select-box'
          onClick={() => setShowCalender(true)}>
          <IoCalendarOutline className='icon-calender' />
          {addDays(state[0].startDate, 1).toISOString().split("T")[0]} ~ {addDays(state[0].endDate, 1).toISOString().split("T")[0]}
        </div>
      </Option>
      {
        showCalender
        &&
        <CalenderToggle>
          <Datepicker
            state={state}
            setState={setState}
            setShowCalender={setShowCalender}
          />
        </CalenderToggle>
      }

      <Table hover className='table'>
        <Thead>
          <tr>
            <th>회원번호</th>
            <th className='center'>신고종류</th>
            <th className='center'>신고유형</th>
            <th className='center'>신고날짜</th>
            <th className='right'>신고 삭제</th>
            <th className='right'>신고 대상 삭제</th>
          </tr>
        </Thead>

        <Tbody>
          {
            reportList.map(item => {
              return (
                <>
                  <tr key={item.report_id} onClick={() => {setModalShow(true); setModalData(item);}}>
                    <td>{item.report_user}</td>
                    <td className='center'>{optionRType[item.report_type + 1]}</td>
                    <td className='center'>{optionRTType[item.report_target_type + 1]}</td>
                    <td className='center'>{item.report_date}</td>
                    <td>
                      <button className='btn-report-delete' style={{float: 'right'}}
                        onClick={() => onClickReportDelete(item.report_id)}>
                        삭제
                      </button>
                    </td>
                    <td>
                      <button className='btn-report-delete btn-post-delete' style={{float: 'right'}}
                        onClick={() => onClickReport_PC_Delete(item.report_target_id, item.report_target_type)}>
                        삭제
                      </button>
                    </td>
                  </tr>
                </>
              )
            })
          }
        </Tbody>
      </Table>
    </Main>
  );
};
export default SettingReport;

const Main = styled.div`
  .table{
    margin-top: 20px;
  }
`

const CalenderToggle = styled.div`
  width: 100%;
  position: relative;
`
const Option = styled.div`
  display: flex;
  justify-content: end;

  select{
    margin-right: 20px;
  }

  .calender-select-box{
    /* background-color: red; */
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--gray700);
    transition: 0.3s;
    :hover{
      color: var(--gray900);
    }

    .icon-calender{
      margin-right: 5px;
      font-size: 1.2rem;
    }
  }
`

const Thead = styled.thead`
  .right{
    text-align: right;
  }
  .center{
    text-align: center;
  }
`

const Tbody = styled.tbody`

  overflow-y: scroll;

  .center{
    text-align: center;
  }
  .right{
    display: flex;
    justify-content: right;
  }

  .btn-report-delete{
    padding: 3px 10%;
    border: 2px solid var(--gray500);
    display: flex;
    transition: 0.2s;
    border-radius: 10px;

    :hover{
      background-color: var(--gray600);
      color: var(--gray50);
    }
    :active{
      background-color: var(--gray900);
    }
  }
  
  .btn-post-delete{
    color: var(--red);

    :hover{
      background-color: var(--red);
      border: 2px solid var(--hover-red);
      color: var(--gray50);
    }
    :active{
      background-color: var(--hover-red);
    }
  }
`
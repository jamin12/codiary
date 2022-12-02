import React, { useState, useEffect } from 'react';
import { manage } from '../api';
import axios from 'axios';

const SettingReport = () => {

  const [reportList, serReportList] = useState([]);
  const [reportType, setReportType] = useState(-1);
  const [reportTargetType, setReportTargetType] = useState(-1);
  const [date, setDate] = useState("2022-01-01 00:00:00");

  const dates = new Date().toISOString();
  const dates_day = dates.split("T")
  console.log(dates_day[0] + " " + dates_day[1].split(".")[0])

  useEffect(() => {
    const getReportListFun = async () => {
      const getReportList = await axios.get(manage.getReports(reportType, reportTargetType), {
        params: {
          startDate: date,
          endDate: "2030-01-01 00:00:00",
          offset: 1,
        },
        withCredentials: true
      })
    serReportList(getReportList.data.result_data)
    }
    getReportListFun();
  }, []);
  console.log(reportList)

  return (
    <div>
      신고목록 관리
    </div>
  );
};

export default SettingReport;
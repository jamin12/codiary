import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';


const BasicLineChart = (props) => {
    const { 
            graphInfo,    // 데이터 배열
            graphtype,    // 일, 주, 달 구분
        } = props;

    const [basicData, setBasicData] = useState([])
    const [seriesData, setSeriesData] = useState([]);   // 데이터 배열
    const [category, setCategory] = useState([]);       // 날짜데이터 배열
    //TODO(이묘): 초기 데이터 입력 안되어있음.

    /**
     * 받아온 데이터를 정렬하고 전처리
     */
    useEffect(() => {
        //TODO(이묘): 주차별 그래프 반대로 나오는데 reverse()해도 안고쳐짐
        if(graphtype===1){
            setBasicData(graphInfo.reverse().created_at)            
        }else{
            setBasicData(graphInfo.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))            
        }
        setSeriesData(basicData.map(item => (
            item.sum_visit_count
        )));
        setCategory(basicData.map(date => (
            date.created_at
        )));
    }, [graphInfo, graphtype, basicData]);


    const options = {
        chart: {
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            //TODO(이묘): 일, 주, 월에 따라 파라미터 바꿔줘야함
            categories: category
        },
    };
    const series = [
        {
            data: seriesData
        }
    ];

    return (
        <div className="linechart">
            <Chart
                options={options}
                series={series} 
                type='line'
                width='100%'
                height='400px'
            />
        </div>
    );
};

export default BasicLineChart;
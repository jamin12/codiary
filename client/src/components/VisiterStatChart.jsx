import { Component } from 'react'
import ApexCharts from 'react-apexcharts'

export default class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                // TODO(이묘): props로 받아온 데이터에 따라 이름, 데이터 바꿔줘야함
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 100]
            },
        ],

            options: {
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
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    //TODO(이묘): 일, 주, 월에 따라 파라미터 바꿔줘야함
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                }
            }
        }
    }
    render() {
        return (
            <ApexCharts
                options={this.state.options}
                series={this.state.series}
                typs='line'
                width='100%'
                height='90%'
            />
        );
    }
}
import { Component } from 'react'
import ApexCharts from 'react-apexcharts'

export default class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            },
            {
                name: "Data2",
                data: [1, 4, 15, 41, 69, 32, 39, 31, 48]
            }],

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
import { React, Component } from 'react'
import { Card, CardHeader } from '@mui/material';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import { styled } from '@mui/material/styles';

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Male',
                data: [492263,
                    335842,
                    181735,
                    166555,
                    143727,
                    174278,
                    183154,
                    251743,
                    273984,
                    343764,
                    383278,
                    455479,
                    515658,
                    454214,
                    426446,
                    367966,
                    225996,
                    102768
                    ]
            }, {
                name: 'Female',
                data: [439115,
                    301519,
                    155265,
                    152776,
                    167525,
                    203833,
                    220401,
                    306471,
                    310190,
                    401571,
                    503916,
                    618544,
                    680448,
                    596296,
                    550279,
                    525351,
                    361769,
                    198736
                    ]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'String',
                    categories: ['0~4세','5~9세','10~14세','15~19세','20~24세','25~29세','30~34세','35~39세','40~44세','45~49세','50~54세','55~59세','60~64세','65~69세','70~74세','75~79세','80~84세','85세+']
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },


        };
    }
    
    render() {
        return (
            <div id="chart">
                <Card>
            <CardHeader title= "각 나이별 진료 횟수 통계"/>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
                </Card>
            </div>
        )
    }
 }

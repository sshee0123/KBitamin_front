import { React, Component } from 'react'
import { Card, CardHeader } from '@mui/material';
import ReactApexChart from 'react-apexcharts'

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
          series: [
            {
              name: "위험 점수",
              data: [46, 44, 44, 40, 40, 40, 40]
            }
          ],
          
          options: {
            chart: {
              height: 400,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#fa2f36', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },// 
            // title: {
            //   text: '내가 피해야할 약',
            //   align: 'left'
            // },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: ['나인나인정', '비백큐골드정', '미네큐비타정', '파워에이정', '리드테라비액티브정', '빅코민백골드정', '멀티브큐골드정'],
              title: {
                text: '약 이름'
              }
            },
            yaxis: {
              title: {
                text: '위험 점수'
              },
              min: 38,
              max: 48
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
        
        
        };
      }

      render() {
        return (
          <Card>
              <CardHeader title="내가 피해야 할 약"/>
              <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </Card>
        );

      }
    }



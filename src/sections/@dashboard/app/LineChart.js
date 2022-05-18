import { React, Component } from 'react'
import { Card } from '@mui/material';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts'
import { styled } from '@mui/material/styles';

export default class Products extends Component {
    constructor(props) {
        super(props);
        console.log("Linechart     ",props.avoidMedicines.data)
        this.state = {
        
          series: [
            {
              name: "High - 2013",
              data: [28, 29, 33, 36, 32, 32, 33]
            }
          ],
          
          options: {
            chart: {
              height: 350,
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
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Average High & Low Temperature',
              align: 'left'
            },
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
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              title: {
                text: '약 이름'
              }
            },
            yaxis: {
              title: {
                text: 'score'
              },
              min: 5,
              max: 40
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
              <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </Card>
        );

      }
    }




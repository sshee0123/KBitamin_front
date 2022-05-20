import {React, Component} from 'react'
import {Card, CardHeader} from '@mui/material';
import ReactApexChart from 'react-apexcharts'
import { styled } from '@mui/material/styles';

const CHART_HEIGHT = 360;

const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default class Products extends Component {
    constructor(props) {
      super(props);

      this.state = {
        series: [{
          name: '노년',
          data: [190257,
            382188,
            13573,
            33230,
            120737,
            33428,
            65018,
            186932,
            152342,
            184171
            ]
        }, {
          name: '장년',
          data: [42125,
            66963,
            32484,
            40844,
            161979,
            52311,
            40682,
            9896,
            6784,
            65417
            ]
        }, {
          name: '중년',
          data: [152348,
            271934,
            21213,
            39020,
            141987,
            42638,
            67274,
            90483,
            43972,
            110205
            ]
        }, {
          name: '청년',
          data: [4234,
            3843,
            21389,
            28943,
            102718,
            35973,
            19973,
            1656,
            986,
            31093
            ]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 10
            },
          },
          xaxis: {
            type: 'String',
            categories: ['당뇨병', '본태성고혈압','급성 굴염','급성 상기도 감염', '급성기관지염', '혈관운동성 및 알레르기성 비염', '위-식도 역류질환', '무릎관절증','기타 척추병증', '복통'
            ],
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        },
      
      };
    }

  render(){
      return (
        <div id="chart">
          <Card>
          <CardHeader title= "연령층 별 질병 보유 통계"/>
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={520} />
          </Card>
          </div>  
        );
      }
}

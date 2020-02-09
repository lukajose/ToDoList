import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';
//{Bar,Line,Pie}

class Chart extends Component {

    render() {
        return (
            <div className = "BarChart">
                <Bar data={
                    {
                        labels: this.props.ChartData.labels,
                        datasets:[{
                            label:'Total Hours',
                            data:this.props.ChartData.data,
                            backgroundColor:'#ccffcc',
                        }],
                    }
                
                } 
                    width={50}
                    height={30}
                    options={
                        {
                            legend: {
                              display: false
                            },
                            scales: {
                              yAxes: [{
                                ticks: {
                                   beginAtZero:true,
                                   stepSize:1,
                                 }
                               }]
                              }
                        }
                    }
                />
            </div>
        );

    }
}

export default Chart;



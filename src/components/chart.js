import React, {Component} from "react";
import {Bar,Line,Pie} from 'react-chartjs-2';
import { green } from "@material-ui/core/colors";


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            chartData: {
                labels: ['T1','T2','T3','T4'],
                datasets:[{
                    label:'Total Hours',
                    data:[2,4,3,1],
                    backgroundColor:'#ccffcc',
                }],
            }
        }

    }

    formatData() {
        //TODO
        return;
    }


    render() {
        return (
            <div className = "BarChart">
                <Bar data={this.state.chartData} 
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



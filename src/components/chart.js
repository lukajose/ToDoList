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
                    data:[2,2,2,2],
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
                    height={400}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        );

    }
}

export default Chart;



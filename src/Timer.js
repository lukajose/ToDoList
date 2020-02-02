import React, {Component} from "react";
import "./Timer.css"
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours:'1',
            minutes:'00',
            seconds:'00'
        }
        this._inputHours= null;
        this._inputMinutes = null;
        this._inputSeconds = null;
    }

    //Given any input from the input boxes transform seconds to minutes and minutes to hours
    transformTime() {
        let {hours, minutes,seconds} = this.state;
        while (seconds > 60 || minutes > 60) {
            if (seconds > 60) {
                seconds -= 60
                // Convert string to int to calculate proper conversion
                minutes = parseInt(minutes) + 1
            }
            if (minutes > 60) {
                minutes -= 60
                // same as above
                hours = parseInt(this.state.hours) + 1
            }
        }
        this.setState({
                    hours:hours,
                    minutes:minutes,
                    seconds:seconds
                });
    }

    componentDidUpdate(prevProps) {

        this.myInterval = setInterval(() => {
            const { hours,minutes, seconds } = this.state;

            // if seconds are greater than 0 keep decrementing
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            // check if minutes still need to decrement
            else if (seconds === 0) {
                if (minutes === 0) {
                    if(hours === 0) {
                        clearInterval(this.myInterval);
                    } else {
                        this.setState(({hours}) => ({
                            minutes:59,
                            seconds:59,
                            hours:hours-1
                        }))

                    }
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }


    checkTimer() {
        console.log('check timer: ',this.props.starter);
        return this.props.starter;
    }

    updateTime() {
        if (this._inputHours !== null  && this._inputHours.value !== "" ) {
            //this.state.hours = this._inputHours.value;
            this.setState({hours:this._inputHours.value});
        }        

        if(this._inputMinutes !== null && this._inputMinutes.value !== "" ){
            //this.state.minutes = this._inputMinutes.value; 
            this.setState({minutes:this._inputMinutes.value});
        }
                        
        if(this._inputSeconds !== null  && this._inputSeconds.value !== "" ){
            //this.state.seconds = this._inputSeconds.value;
            this.setState({seconds:this._inputSeconds.value})
        }
    }

    changeTimer() {

        setTimeout(this.props.changeTimer(),10000);
    }

    timeFormat(time) {
        if(time < 10 && time > 0) {
            time = '0' + time;
        }
        return time;
    }
    
    render () {
        
        // if TodoList indicates not to start keep displaying the edit timer.
        if (this.checkTimer() === false) {
            return (
                <div className="timer-editor">
                    <table>
                        <tbody>
                            <tr className = "text-timer">
                                <th>Hours</th>
                                <th>Minutes</th>
                                <th>Seconds</th>
                            </tr>
                        </tbody>
                        <tbody>
                        <tr className="input-timer">
                                <td>
                                    <input
                                    ref={ (a) => this._inputHours = a} 
                                    placeholder={this.state.hours}
                                    >
                                    </input>
                                </td>
                                <td>
                                    <input 
                                        ref={ (a) => this._inputMinutes = a}
                                        placeholder={this.state.minutes}></input>
                                </td>
                                <td>
                                    <input
                                    ref= { (a) => this._inputSeconds = a}
                                    placeholder={this.state.seconds}></input>
                                </td>
                                <td><AccessAlarmIcon/></td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                
            );
        } else { // display timer countdown
            let {hours, minutes,seconds} = this.state;
            hours = this.timeFormat(hours);
            minutes = this.timeFormat(minutes);
            seconds = this.timeFormat(seconds);
            //this.changeTimer(); 
            return ( 
                    <p className="timer-countdown">{hours+ ':'+minutes + ':' + seconds} <AccessAlarmIcon/></p>
            );
        }
    }
}
export default Timer;
import React, {Component} from "react";
import "./Timer.css"
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours:1,
            minutes:0,
            seconds:0
        }
        this.changeTimer = this.changeTimer.bind(this);
        this._inputHours= null;
        this._inputMinutes = null;
        this._inputSeconds = null;
    }

    //Given any input from the input boxes transform seconds to minutes and minutes to hours
    transformTime() {
        let {hours, minutes,seconds} = this.state;
        while (seconds > 60 || minutes > 60) {
            if (seconds > 60) {
                seconds -= 60;
                // Convert string to int to calculate proper conversion
                minutes = parseInt(minutes) + 1;
            }
            if (minutes > 60) {
                minutes -= 60;
                // same as above
                hours = parseInt(this.state.hours) + 1;
            }
        }
        this.setState({
                    hours:hours,
                    minutes:minutes,
                    seconds:seconds
                });
    }

    checkTimer() {
        console.log('check timer: ',this.props.starter);
        return this.props.starter;
    }



    componentDidUpdate(prevProps) {
        
        if((prevProps.starter !== this.props.starter) && (this.checkTimer() === true)) {
            //this.updateTime();
            //this.transformTime();
            this.myInterval = setInterval(
                () => {
                const { hours,minutes, seconds } = this.state;
                //console.log('sec:',seconds,'minutes:',minutes,'hours:',hours);
                // if seconds are greater than 0 keep decrementing
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                // check if minutes still need to decrement
                else {
                    if (minutes == 0) {
                        if(hours == 0) {
                            clearInterval(this.myInterval);
                            this.changeTimer();
                            
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
            }, 1000);
    
        }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
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
        this.props.changeTimer();
    }

    timeFormat(time) {
        time = parseInt(time)
        if(time < 10) {
            time = '0' + time;
        }
        return time;
    }
    
    render () {
        this.updateTime();
        //this.transformTime();
        
        const hours = this.timeFormat(this.state.hours);
        const minutes = this.timeFormat(this.state.minutes);
        const seconds = this.timeFormat(this.state.seconds);
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
                                    placeholder={hours}
                                    >
                                    </input>
                                </td>
                                <td>
                                    <input 
                                        ref={ (a) => this._inputMinutes = a}
                                        placeholder={minutes}></input>
                                </td>
                                <td>
                                    <input
                                    ref= { (a) => this._inputSeconds = a}
                                    placeholder={seconds}></input>
                                </td>
                                <td><AccessAlarmIcon/></td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
                
            );
        } else { // display timer countdown
            
            return ( 
                    <p className="timer-countdown">{hours+ ':'+minutes + ':' + seconds} <AccessAlarmIcon/></p>
            );
        }
    }
}
export default Timer;
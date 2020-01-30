import React, {Component} from "react";
import "./Timer.css"
class Timer extends Component {
    constructor(props) {
        super(props);
        this.timer = {
            hours:'01',
            minutes:'00',
            seconds:'00'
        }
    }
    
    render () {
        return (
            <div className="timer-editor">
                hours
                <input
                    onChange={ (a) => this.timer.hours = a} 
                    placeholder={this.timer.hours}
                >
                </input>
                minutes
                <input 
                    onChange={ (a) => this.timer.minutes = a}
                    placeholder={this.timer.minutes}></input>
                seconds
                <input
                    onChange =  { (a) => this.timer.seconds = a}
                    placeholder={this.timer.seconds}></input>

            </div>
        );
    }
}

export default Timer;
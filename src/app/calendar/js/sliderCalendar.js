import Slider from './slider';
import Calendar from './calendar';
import React, {
    Component
}
from 'react';

let slideConfig = {
    transition: 0.5,
    delay: 4000,
    isAuto: false,
    isDot: false,
    width: window.innerWidth
}


export default class SliderCalendar extends Component {
    constructor(props){
        super(props)
    }
    
    state = {
        index: 0
    }
    
    onSlide(direction){
        let {index} = this.state;
        index = direction === 'prev' ? index - 1 : index + 1;
        this.setState({
            index
        })
    }
    
    render() {
        let {index} = this.state;
        
        let curDate = function(){
            let _date = new Date();
            let _month = _date.getMonth();
            _date.setMonth(_month + index);
            return _date;
        }
        
        let preDate = function(){
            let _date = new Date();
            let _month = _date.getMonth();
            _date.setMonth(_month + index - 1);
            return _date;
        }
        
        let nextDate = function(){
            let _date = new Date();
            let _month = _date.getMonth();
            _date.setMonth(_month + index + 1);
            return _date;
        }
        console.log(preDate().getMonth(),curDate().getMonth(),nextDate().getMonth())
        
        return (
            <Slider {...slideConfig} onSlide={this.onSlide.bind(this)}>
            <Calendar date={preDate()} />
            <Calendar date={curDate()} />
            <Calendar date={nextDate()} />
                </Slider>)
        }
}

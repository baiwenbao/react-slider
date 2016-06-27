import React, {
    Component
}
from 'react';
import styles from '../sass/index.scss';
import getMonth from './getMonth';

//let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

export default class Calendar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {
            date
        } = this.props;
        let _month = getMonth(date);
        return (
            <div className={styles.root}>
            <div>{date.getFullYear()+ '/' +(date.getMonth()+1)}</div> 
            {
                _month.map((v, i) => {
                    if(!v){
                        return <div className={styles.inActiveDay} key={i}></div>
                    }
                    let {date, day, yy} = v;
                    return <div className={styles.activeDay} key={i}>{date}</div>
                })
            }
            </div>
        );
    }
}

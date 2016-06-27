import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from './index.scss';

export default class Scroller extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let {root, box} = this.refs;
        this.boxHeight = box.offsetHeight;
        this.rootHeight = root.offsetHeight;
    }

    handleScroll(e) {
        let {scrollFn} = this.props;
        let {scrollTop} = e.target;
        let {boxHeight, rootHeight} = this;
        if(scrollTop + rootHeight >= boxHeight) {
            scrollFn();
        }
    }

    render() {
        return (
            <div ref="root" className={styles.root} onScroll={e=>this.handleScroll(e)}>
                <div ref="box">
                {this.props.children}
                </div>
            </div>
        );
    }
}

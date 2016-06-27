import React, {Component} from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import {connect} from 'react-redux';
import {toAdd, calc} from '../js';
import {
	bindActionCreators
}
from 'redux';
class App1 extends Component {
    componentDidMount(){
        let {toAdd} = this.props;
        toAdd(10);
    }
    render(){
        let {age, dispatch} = this.props;
        console.log(this.props);
        return (
            <div>
            {age}app1
                <Link to="/src/app/redux/app2/">app2</Link>    
                </div>);
    }
}
let maptoprops = function(state){
    console.log(state)
    let {calc} = state;
    return {
        age: calc.n
    }
}

let maptodispatch = function(dispatch){
    return bindActionCreators({toAdd}, dispatch)
}
export default connect(maptoprops, maptodispatch)(App1);
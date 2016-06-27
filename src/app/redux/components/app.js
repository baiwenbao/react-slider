import React, {Component} from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import {connect} from 'react-redux';
//import App1 from './app1';
import App2 from './app2';
export default class App extends Component {
    render(){
        console.log(this.props)
        return (          
            <Router history={browserHistory}>
                <Route path='/src/app/redux/'>
                    <IndexRoute component={App2}></IndexRoute>
                </Route>
            </Router>
        )
    }
}

//let mapState = function(){
//    return {
//        name: 'd'
//    }
//}

//export default connect(mapState)(App); 
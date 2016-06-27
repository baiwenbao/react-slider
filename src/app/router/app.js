// import reactMixin from 'react-mixin';
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {Lifecycle, Router, Route, Link, IndexRoute, browserHistory, withRouter} from 'react-router';
import App1 from './components/app1';
import App2 from './components/app2';

let o = {
    say() {
        console.log(1);
    }
}

export default class App extends Component {

    componentDidMount(){
        // this.routerWillLeave();
    }

    // routerWillLeave(){
    //     return false;
    // }

    render() {
        return (
            <div className="class-name">
                {this.props.children}
            </div>
        );
    }
}

const App3 = withRouter(React.createClass({

    componentDidMount() {
        console.log(this.props.router);
      this.props.router.setRouteLeaveHook(
        this.props.route,
        this.routerWillLeave
      )
    },

    routerWillLeave(nextLocation) {
      // 返回 false 会继续停留当前页面，
      // 否则，返回一个字符串，会显示给用户，让其自己决定
        return false;
    },

    render(){
        return <div><Link to="/app2">App3</Link></div>
    }
}))



ReactDom.render(
    <Router history={browserHistory} >
    <Route path="/src/app/router/" component={App}>
      <IndexRoute component={App3} />
      <Route path="/app2" component={App2} />
    </Route>
  </Router>,
    document.getElementById('root'));

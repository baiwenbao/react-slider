import React,{Component} from 'react';
import {Lifecycle, Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

export default class App1 extends Component {

    componentDidMount() {
        console.log(this.props.router);
    //   this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    }
    routerWillLeave(nextLocation) {
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      if (!this.state.isSaved)
        return 'Your work is not saved! Are you sure you want to leave?'
    }
    render() {
        return (
            <div className="class-name">
                <Link to="app2">content1</Link>
            </div>
        );
    }
}

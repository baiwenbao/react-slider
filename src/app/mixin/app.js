import React,{Component} from 'react';
import ReactDom from 'react-dom';
let o = {
    say(){
        console.log('say');
    }
}


class Say0 extends Component {
    constructor(props){
        super(props);
    }
    say(){
        console.log('obj');
    }
}

export default class Say1 extends Say0 {

    constructor(props){
        super(props);
    }

    render() {
        this.say();

        return (
            <div className="class-name">
                content
            </div>
        );
    }
}

ReactDom.render(<Say1 />, document.getElementById('root'));

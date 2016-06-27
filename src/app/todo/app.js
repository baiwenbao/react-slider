import React,{Component} from 'react';
import ReactDom from 'react-dom';

export default class Todo extends Component {
    state = {
        list: []
    }

    componentDidMount(){
        let {inp} = this.refs;
        let {list} = this.state;
        inp.addEventListener('blur', (e) => {
            if(!e.currentTarget.value) return;
            list.push(e.currentTarget.value);
            e.currentTarget.value = '';
            this.setState({
                list
            })
        }, false)
    }
    render() {
        let {list} = this.state;
        return (
            <div className="class-name" style={{'height': '400px'}}>
                <input ref="inp" />
                <List list={list} />
            </div>
        );
    }
}

class List extends Component {
    state = {
        list: this.props.list
    }

    handleClick(i){
        // let {list} = this.state;
        // this.state.list.splice(i, 1);
        let next = this.state.list;
        next.push(Math.random())
        this.setState({
            list: next
        })
    }

    render(){
        let {list} = this.state;
        return (
            <div>
                {
                    list.map((v, i) => <div key={v} onClick={()=>this.handleClick(i)}>{v}</div>)
                }
            </div>
        )

    }
}

ReactDom.render(
    <Todo />,
    document.getElementById('root')
)

let sum = function(a, b){
    return a + b;
}
let chen = function(a, b){
    return a() * b;
}
let jian = function(a, b){
    return a() - b;
}

let f = x => console.log(1);;
let g = x => console.log(2);;
let c = x => console.log(3);;

// jian(chen(sum, 1), 1);
// c(g(f()))
let arr = [f, g, c];
let arr1 = [1,2,3,4]
// ()=>{}
// c(()=>{})
// g(c(()=>{}))
// f(g(c(()=>{})))
let reduce = arr.reduceRight((prev, next) => {
    return next(prev);
}, ()=>{})

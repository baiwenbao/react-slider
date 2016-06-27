import {combineReducers, createStore} from 'redux';
let toAdd = function(num) {
    return {type: 'Add', num}
}

let calc = function(state = {n: 1}, action) {
    switch (action.type) {
        case 'Add':
            return {
                ...state,
                n: action.num
            }
        default:
            return state;
    }
}

let rootReduce = combineReducers({calc});

let store = createStore(rootReduce);

function compose(...funcs) {
    return arg => funcs.reduceRight((prev, next) => next(prev), arg)
}
// function compose(...funcs) {
//   return arg => funcs.reduceRight((composed, f) => f(composed), arg);
// }


let fn1 = () => console.log('fn1');
let fn2 = () => console.log('fn2');
//fn1(fn2)
//fn1(fn2(arg))

// let newDispatch = compose(fn1, fn2)(store.dispatch);
// newDispatch(toAdd(3))

let fn = [fn1, fn2].reduceRight((p, n) => n(p), store.dispatch)
fn(toAdd(2))

// store.dispatch(toAdd(2))
console.log(store.getState());
export {store, toAdd, calc};

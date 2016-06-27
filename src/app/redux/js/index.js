import {
    combineReducers, createStore
}
from 'redux';
let toAdd = function (num) {
    return {
        type: 'Add',
        num
    }
}

let calc = function (state = {
    n: 1
}, action) {
    switch (action.type) {
        case 'Add':
            return {
                ...state,
                n: action.num
            }
        default:
            return state
    }
}

let rootReduce = combineReducers({calc});

let store = createStore(rootReduce);
export {store, toAdd, calc};
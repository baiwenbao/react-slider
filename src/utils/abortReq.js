// import $ from 'jquery';
//
// function getData(data) {
//     return $.getJSON('//localhost:8181/src/app/scroller/js/1.json', data);
// }

let abortReq = function(fn){
    let arr = [];
    return function(data){
        arr.push(fn(data));
        if(arr.length > 1){
            arr[0].abort();
            arr.shift();
        }
        return arr[0];
    }
}

export default abortReq;


// let request = function(path, data){
//     let arr = [];
//     return function(subData){
//         arr.push($.getJSON(path, {...data, ...subData}));
//         if(arr.length > 1){
//             arr[0].abort && arr[0].abort();
//             arr.shift();
//         }
//         return arr[0];
//     }
// }

// let a = abortReq(getData);
//
// a({name: 1})
// a({name: 2})
// a({name: 3})

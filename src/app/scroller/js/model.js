import $ from 'jquery';


let request = function(path, data){
    let arr = [];
    return function(subData){
        arr.push($.getJSON(path, {...data, ...subData}));
        if(arr.length > 1){
            arr[0].abort && arr[0].abort();
            arr.shift();
        }
        return arr[0];
    }
}
let getData = request('//localhost:8181/src/app/scroller/js/1.json');
export default getData;

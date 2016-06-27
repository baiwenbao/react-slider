export default function(fn){
    let bol = true;
    return function(){
        if(!bol) return;
        bol = false;
        fn.apply(null, arguments);
    }
}

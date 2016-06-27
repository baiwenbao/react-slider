export default function (param) {
    let y = param.getFullYear();
    let m = param.getMonth();
    //六行七列
    let _m = new Array(42);
    let days;
    let firstDay = new Date(y, m, 1).getDay();
    let date = new Date();
    date.setFullYear(y);
    date.setMonth(m + 1);
    date.setDate(0);
    days = date.getDate();

    for (let i = 0; i < _m.length; i++) {
        if (i < firstDay || i >= (firstDay + days)) {
            _m[i] = null;
        } else {
            _m[i] = {
                date: i - firstDay + 1,
                day: i % 7
            }
        }
    }

    return _m;
}

const AsyncParamsKeys = {
    LoginUserObj: "userDataObject",
    isUserLoggin: "isUserLogin",
    userName: "username",
    Language: "language"
}

var month_names = ["Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"];

export const getDateTime = (date) => {
    var time = date.split(" ");
    var newDate = new Date(time[0]);
    var day = newDate.getDate();
    var month_index = newDate.getMonth();
    var year = newDate.getFullYear();
    //return "" + day + "-" + month_names[month_index] + "-" + year + "\n" + tConv24(time[1]);
    return "" + day + "-" + month_names[month_index] + "-" + year;
}

function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

export { AsyncParamsKeys }
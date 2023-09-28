export const dateAnd12HoursTime = (givenDate) => {
    const date = new Date(givenDate);
    var month = "" + (date.getMonth() + 1),
        day = "" + date.getDate(),
        year = date.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const newDate = [year, month, day].join("/");

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return newDate + " " + strTime;
};

export const noteDateFromString = (date) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);

    let hour = parseInt(date.slice(8, 10));
    let mintutes = date.slice(14, 16);
    let AMPM = hour > 12 ? "PM" : "AM";
    if (hour > 12) hour = hour - 12;

    let temp = "";
    if (hour < 10) temp = "0";

    return `${year}/${month}/${day} ${temp}${hour}:${mintutes} ${AMPM}`;
};

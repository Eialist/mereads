const monthsOfTheYear = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];


const getTime = () => {
    let currentDay = new Date();
    let date = currentDay.getDate();
    let month = monthsOfTheYear[currentDay.getMonth()];
    // let hour = currentDay.getHours();
    let year = currentDay.getFullYear();
    // let minutes = currentDay.getMinutes();
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    let todaysDate =
        date + " " + month + " " + year
    return todaysDate;
};

export default getTime;
export const getFromSessionStorage = (key, defaultValue) => {
    const infoFromStorage = sessionStorage.getItem(key);
    if (!infoFromStorage) {
        return defaultValue;
    } else {
        return (infoFromStorage);
    }
}


export const getFromLocalStorage = (key, defaultValue) => {
    const infoFromStorage = localStorage.getItem(key);
    if (!infoFromStorage) {
        return defaultValue;
    } else {
        return (infoFromStorage);
    }
}

export const getFullName = (person) => {
    return `${person.name} ${person.surname}`;
}

export const getMonthName = (number) => {
    const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
        "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
    ];

    return monthNames[number - 1];
}

export const downloadFile = (file, fileName) => {
    let anchor = document.createElement("a");

    anchor.href = file;
    anchor.download = "image.jpg";
    document.body.append(anchor);
    anchor.style = "display: none;";
    anchor.click();
    anchor.remove();
}

export const getFormattedDate = (date, isFullDate) => {
    let result = "";
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const letterYear = +(date[0] + date[1] + date[2] + date[3]);
    const letterMonth = +(date[5] + date[6]);
    const letterDay = +(date[8] + date[9]);
    let letterTime = "";
    for (let i = 11; i < 16; ++i) {
        letterTime += date[i];
    }

    if (letterYear === year && (letterMonth - 1) === month && letterDay === day) {
        result = letterTime;
    } else if (letterYear === year) {
        if (isFullDate) {
            result += "Сегодня,";
        }

        result = `${letterDay} ${getMonthName(letterMonth)}`;
    } else {
        result = `${getMonthName(letterMonth)} ${letterYear}`;
    }



    return result;
}

// const compareTwoTimes = (time1, time2) => {
//     debugger;
//     let key;

//     for (key in time1) {
//         if (time1[key] > time2[key]) {
//             return 1;
//         } else if (time1[key] < time2[key]) {
//             return 2;
//         }
//     }

//     return 0;
// }


// export const sortMessages = (messages) => {
//     let letterYear;
//     let letterMonth;
//     let letterDay;
//     let letterHours;
//     let letterMinutes;
//     let letterSeconds;
//     let time = {};
//     let times = [];

//     messages.forEach(mess => {
//         letterYear = +(mess.date[0] + mess.date[1] + mess.date[2] + mess.date[3]);
//         letterMonth = +(mess.date[5] + mess.date[6]);
//         letterDay = +(mess.date[8] + mess.date[9]);
//         letterHours = +(mess.date[11] + mess.date[12]);
//         letterMinutes = +(mess.date[14] + mess.date[15]);
//         letterSeconds = +(mess.date[17] + mess.date[18]);


//         time = { letterYear, letterMonth, letterDay, letterHours, letterMinutes, letterSeconds };
//         times.push(time);
//     })

//     quicksort(times, messages, 0, times.length - 1);
// }


// const quicksort = (times, messages, start, end) => {
//     debugger;
//     let left = start, right = end, current;
//     let middle = Math.floor((left + right) / 2);

//     if (compareTwoTimes(times[left], times[right]) == 1) {
//         if (compareTwoTimes(times[middle], times[left]) == 2) {
//             current = middle;

//         } else {
//             current = left;
//         }

//     } else if (compareTwoTimes(times[middle], times[right]) == 1) {
//         current = right;
//     }
//     else {
//         current = middle;
//     }

//     let average = times[current];
//     while (left <= right) {
//         while (compareTwoTimes(average, times[left]) == 2) {
//             left++;
//         }

//         while (compareTwoTimes(average, times[right]) == 1) {
//             right--;
//         }

//         if (left <= right) {
//             let temp = times[left];
//             times[left] = times[right];
//             times[right] = temp;
//             temp = messages[left];
//             messages[left] = messages[right];
//             messages[right] = temp;
//             left++;
//             right--;
//         }
//     }


//     if (start < right) {
//         quicksort(times, messages, start, right);
//     }
//     if (end > left) {
//         quicksort(times, messages, left, end);
//     }
// }

export const getImageSize = (image) => {
    let stringLength = image.length;
    let y = image[stringLength - 1] === '=' && image[stringLength - 2] === '=' ? 2 : 1;
    let size = stringLength * 3 / 4 - y;
    size /= 1024 * 1024;
    size = Math.round(size * 10) / 10;

    return size;
}
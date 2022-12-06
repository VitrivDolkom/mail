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

export const getMonthName = (number) => {
    const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
        "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
    ];


    return monthNames[number - 1];
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

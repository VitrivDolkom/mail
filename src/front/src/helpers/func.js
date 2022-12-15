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
        if (typeof infoFromStorage === "object" || typeof infoFromStorage === "array") {
            return JSON.parse(infoFromStorage);
        }
        return infoFromStorage;
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

export const getImageSize = (image) => {
    let stringLength = image.length;
    let y = image[stringLength - 1] === '=' && image[stringLength - 2] === '=' ? 2 : 1;
    let size = stringLength * 3 / 4 - y;
    size /= 1024 * 1024;
    size = Math.round(size * 10) / 10;

    return size;
}


export const getPath = () => {
    let href = window.location.href.split("/");
    return href[href.length - 1];
}
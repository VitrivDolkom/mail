const getFromSessionStorage = (key, defaultValue) => {
    const infoFromStorage = sessionStorage.getItem(key);
    if (!infoFromStorage) {
        return defaultValue;
    } else {
        return (infoFromStorage);
    }
}


export default getFromSessionStorage;
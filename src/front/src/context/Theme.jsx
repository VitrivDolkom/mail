import { createContext, useEffect, useState } from "react"
import { getFromLocalStorage } from "../helpers/func";


const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const currentTheme = getFromLocalStorage("theme", "light");
    const [theme, setTheme] = useState(currentTheme);

    useEffect(() => {
        if (currentTheme === "light") {
            document.body.classList.remove("darkTheme");
        } else {
            document.body.classList.add("darkTheme");

        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
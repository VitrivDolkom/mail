import "./style.css";
import darkIcon from "../../img/dark/theme.svg";
import lightIcon from "../../img/theme.svg";
import darkAdd from "../../img/dark/add.svg";
import lightAdd from "../../img/add.svg";
import ListPages from "../ListPages/ListPages";
import { useContext, useEffect } from "react";
import ThemeContext from "../../context/Theme";




const Sidebar = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const changeTheme = () => {

        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
        document.body.classList.toggle("darkTheme");
    }

    return (
        <div className="sidebar">
            <div className="top">
                <a href="#">Написать письмо</a>
            </div>
            <div className="mid">
                <ListPages />
                <hr />
                <div className="addFolder">
                    {theme === "light" ? <img id="addFolder" src={lightAdd} alt="" /> : <img id="addFolder" src={darkAdd} alt="" />}
                    <span>Новая папка</span>
                </div>
            </div>
            <div className="bottom" onClick={() => changeTheme()}>

                {theme === "light" ? <img
                    id="theme"
                    src={lightIcon}
                    alt=""
                /> : <img
                    id="theme"
                    src={darkIcon}
                    alt=""
                />}

                <span id="themeName">{theme === "light" ? "Тема: светлая" : "Тема: тёмная"}</span>
            </div>
        </div>
    );
}

export default Sidebar;
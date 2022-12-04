import "./style.css";
import darkIcon from "../../img/dark/theme.svg";
import lightIcon from "../../img/theme.svg";
import darkAdd from "../../img/dark/add.svg";
import lightAdd from "../../img/add.svg";
import ListPages from "../ListPages/ListPages";
import { useContext } from "react";
import ThemeContext from "../../context/Theme";




const Sidebar = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const changeTheme = () => {
        setTheme(prev => !prev);

        document.body.classList.toggle("darkTheme");
        const themeBtn = document.querySelector("#theme");
        const addFolder = document.querySelector("#addFolder");
        const themeSpan = document.querySelector("#themeName");

        if (document.body.classList.contains("darkTheme")) {
            themeBtn.src = darkIcon;
            addFolder.src = darkAdd;
            themeSpan.innerHTML = 'Тема: тёмная';
        } else {
            themeBtn.src = lightIcon;
            addFolder.src = lightAdd;
            themeSpan.innerHTML = 'Тема: светлая';

        }
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
                    <img id="addFolder" src={lightAdd} alt="" />
                    <span>Новая папка</span>
                </div>
            </div>
            <div className="bottom" onClick={() => changeTheme()}>
                <img
                    id="theme"
                    src={lightIcon}
                    alt=""
                />
                <span id="themeName">Тема: Светлая</span>
            </div>
        </div>
    );
}

export default Sidebar;
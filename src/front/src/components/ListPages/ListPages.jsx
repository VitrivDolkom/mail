import "./style.css";
import { useContext, useEffect, useState } from "react";
import ToPage from "../ToPage/ToPage";

import state from "../../data/data";
import ThemeContext from "../../context/Theme";
import { getFromLocalStorage } from "../../helpers/func";

import { useLocation } from 'react-router-dom'

const listPages = state.sidebar.listPages;

const ListPages = () => {
    const { theme } = useContext(ThemeContext);
    const [curPage, setCurPage] = useState(getFromLocalStorage("currentPage", "Входящие"));

    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        let currentNamePage = "";
        switch (currentPath) {
            case "/in":
                currentNamePage = "Входящие";

                break;
            case "/out":
                currentNamePage = "Отправленные";

                break;
            case "/imp":
                currentNamePage = "Важное";

                break;
            case "/draft":
                currentNamePage = "Черновики";

                break;
            case "/arc":
                currentNamePage = "Архив";

                break;
            case "/spam":
                currentNamePage = "Спам";

                break;
            case "/trash":
                currentNamePage = "Корзина";

                break;

            default:
                currentNamePage = curPage;
                break;
        }

        setCurPage(currentNamePage);
        localStorage.setItem("currentPage", currentNamePage);
    }, [location]);

    return (
        <ul className="listPages">
            {
                listPages.map(page => {
                    return (
                        <ToPage
                            key={page.title}
                            title={page.title}
                            link={page.to}
                            imageSrc={theme === "light" ? page.img : page.imgDark}
                            changePage={(title) => { setCurPage(title); localStorage.setItem("currentPage", title) }}
                            currentPage={curPage}
                        />
                    );
                })
            }
        </ul>
    );
}

export default ListPages;
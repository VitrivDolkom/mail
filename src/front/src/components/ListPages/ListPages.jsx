import "./style.css";
import { useContext, useState } from "react";
import ToPage from "../ToPage/ToPage";

import state from "../../data/data";
import ThemeContext from "../../context/Theme";
import { getFromLocalStorage } from "../../helpers/func";

const listPages = state.sidebar.listPages;

const ListPages = () => {
    const { theme } = useContext(ThemeContext);
    const [curPage, setCurPage] = useState(getFromLocalStorage("currentPage", "Входящие"));


    const navToPage = () => {

    }

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
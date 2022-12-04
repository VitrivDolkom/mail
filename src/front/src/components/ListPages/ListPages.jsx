import "./style.css";
import { useContext } from "react";
import ToPage from "../ToPage/ToPage";

import state from "../../data/data";
import ThemeContext from "../../context/Theme";

const listPages = state.sidebar.listPages;

const ListPages = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <ul className="listPages">
            {
                listPages.map(page => {
                    return (
                        <ToPage key={page.title}
                            title={page.title}
                            link={page.to}
                            imageSrc={theme === "light" ? page.img : page.imgDark}
                        />
                    );
                })
            }
        </ul>
    );
}

export default ListPages;
import "./style.css";
import preloader from "../../img/preloader.gif";
import preloaderD from "../../img/dark/preloader.gif";
import { useContext } from "react";
import ThemeContext from "../../context/Theme";
import { useEffect } from "react";

const Preloader = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (theme === "light") {
            document.querySelector(".content").style.backcroundColor = "#FFFFFF";

        } else {

            document.querySelector(".content").style.backcroundColor = "#000000";

        }

    }, []);


    return (
        <div className="preloader">
            <img src={theme === "light" ? preloader : preloaderD}
                alt="загрузка" />
        </div>
    );
}

export default Preloader;
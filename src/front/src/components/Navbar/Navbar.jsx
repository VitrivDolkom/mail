import "./style.css";
import dog from "../../img/dog.svg";
import dogD from "../../img/dark/dog.svg";
import mail from "../../img/mail.svg";
import mailD from "../../img/dark/mail.svg";
import { useContext } from "react";
import ThemeContext from "../../context/Theme";

const Navbar = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <nav className="navbar">
            {theme === "light" ?
                <>
                    <img className="logo" src={dog} alt="" />
                    <img className="mail" src={mail} alt="" />
                </>
                :
                <>
                    <img className="logo" src={dogD} alt="" />
                    <img className="mail" src={mailD} alt="" />
                </>}


        </nav >
    );
}

export default Navbar;
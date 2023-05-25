import { Link } from "react-router-dom";
import "./style.css";



const ToPage = ({ title, imageSrc, link, currentPage, changePage }) => {
    return (
        <Link to={link}>
            <li className={currentPage === title ? "linkToPage currentPage" : "linkToPage"}

                onClick={() => changePage(title)}
            >
                <img src={imageSrc} alt="" />
                <span>{title}</span>

            </li>
        </Link>
    );
}

export default ToPage;
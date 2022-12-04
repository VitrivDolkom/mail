import { Link } from "react-router-dom";
import "./style.css";



const ToPage = ({ title, imageSrc, link }) => {
    return (
        <Link to={link}>
            <li className="linkToPage">
                <img src={imageSrc} alt="" />
                <span>{title}</span>
            </li>
        </Link>
    );
}

export default ToPage;
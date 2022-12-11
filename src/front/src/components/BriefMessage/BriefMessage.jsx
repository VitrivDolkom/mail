import "./style.css";
import ava from "../../img/ava.svg"
import { useContext } from "react";
import MessagesContext from "../../context/MessagesContext";
import { useNavigate } from "react-router-dom";
import Dot from "../../atom/Dot/Dot";
import { getFormattedDate, getFullName } from "../../helpers/func";

const BriefMessage = ({ mess }) => {
    const { currentLetter, setCurrentLetter } = useContext(MessagesContext);
    const navigate = useNavigate();

    const changeCurrentLetter = () => {
        navigate("/letter");
        setCurrentLetter(mess);
        localStorage.setItem("currentLetter", JSON.stringify(mess));
    }

    return (
        <div className="brief"
            onClick={() => changeCurrentLetter()}>
            <div className="left">
                <div className="ava">
                    <Dot isReaded={mess.read} />
                    <img src="" alt="ава" />
                </div>
                <div className={`name ${mess.read ? "readed" : ""}`}>{getFullName(mess.author)}</div>
            </div>
            <div className={`t1 ${mess.read ? "readed" : ""}`}>{mess.title}</div>
            <div className="t2">{mess.text}</div>
            <div className="right">
                <div className="date">{getFormattedDate(mess.date, false)}</div>
            </div>


        </div>
    );
}

export default BriefMessage;
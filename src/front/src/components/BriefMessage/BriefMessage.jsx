import "./style.css";
import ava from "../../img/ava.svg"
import { useContext } from "react";
import MessagesContext from "../../context/MessagesContext";
import { useNavigate } from "react-router-dom";
import Dot from "../../atom/Dot/Dot";
import { getFormattedDate } from "../../helpers/func";

const BriefMessage = ({ mess }) => {
    const { currentLetter, setCurrentLetter } = useContext(MessagesContext);
    const navigate = useNavigate();

    const changeCurrentPage = () => {
        navigate("/letter");
        setCurrentLetter(mess);
        localStorage.setItem("currentLetter", JSON.stringify(mess));
    }

    return (
        <div className="brief"
            onClick={() => changeCurrentPage()}>
            <div className="left">
                <div className="ava">
                    <Dot isReaded={mess.read} />
                    <img src={mess.to[0].avatar} alt="" />
                </div>
                <div className={`name ${mess.read ? "readed" : ""}`}>{`${mess.author.name} ${mess.author.surname}`}</div>
            </div>
            <div className={`t1 ${mess.read ? "readed" : ""}`}>{mess.title}</div>
            <div className="t2">{mess.text}</div>
            <div className="right">
                <ul>
                    {/* categories */}
                </ul>
                <div className="date">{getFormattedDate(mess.date, false)}</div>
            </div>


        </div>
    );
}

export default BriefMessage;
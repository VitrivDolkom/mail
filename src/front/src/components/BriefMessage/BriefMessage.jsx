import "./style.css";
import ava from "../../img/ava.svg"
import { useContext, useState } from "react";
import MessagesContext from "../../context/MessagesContext";
import { useNavigate } from "react-router-dom";
import Dot from "../../atom/Dot/Dot";
import { getFormattedDate, getFullName } from "../../helpers/func";
import noAva from "../../img/noAva.webp";
import ImpBook from "../../atom/ImpBook/ImpBook";
import attach from "../../img/attach.svg";
import attachD from "../../img/dark/attach.svg";
import ThemeContext from "../../context/Theme";
import Modal from "../../atom/Modal/Modal";



const BriefMessage = ({ mess }) => {
    const { theme } = useContext(ThemeContext);
    const { currentLetter, setCurrentLetter } = useContext(MessagesContext);
    const [showAttach, setShowAttach] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const changeCurrentLetter = () => {
        navigate("/letter");
        setCurrentLetter(mess);
        localStorage.setItem("currentLetter", JSON.stringify(mess));
    }


    return (
        <div className="brief"
            onClick={() => changeCurrentLetter()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                if (!isChecked) setIsHovered(false)
            }}>
            <div className="left">
                <div className="ava">
                    <Dot isReaded={mess.read} />

                    {isHovered ?
                        <input
                            className="checkbox"
                            type="checkbox"
                            onClick={(e) => {
                                setIsChecked(prev => !prev);
                                e.stopPropagation();
                            }} />
                        :
                        <img src={mess.author.avatar !== undefined ? mess.author.avatar : noAva} alt="ава" />
                    }

                </div>
                <div className={`name ${mess.read ? "readed" : ""}`}>{getFullName(mess.author)}</div>
                <ImpBook imp={mess.important} book={mess.bookmark} />
            </div>
            <div className="mid">
                <div className={`short ${mess.read ? "readed" : ""}`}>{mess.title}</div>
                <div className="text">{mess.text}</div>
            </div>
            <div className="right">
                <div
                    className="show-doc"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowAttach(prev => !prev);
                    }}>
                    {mess.doc !== undefined ?
                        <>
                            <img
                                src={theme === "light" ? attach : attachD}
                                alt="документы"
                            />
                            <Modal active={showAttach} doc={mess.doc.img} />
                        </>
                        : ""}
                </div>
                <div className="date">{getFormattedDate(mess.date, false)}</div>
            </div>
        </div>
    );
}

export default BriefMessage;
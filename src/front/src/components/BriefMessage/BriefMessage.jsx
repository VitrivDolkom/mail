import "./style.css";
import { useContext, useState } from "react";
import Dot from "../../atom/Dot/Dot";
import { getFormattedDate, getFullName } from "../../helpers/func";
import ImpBook from "../../atom/ImpBook/ImpBook";
import attach from "../../img/attach.svg";
import attachD from "../../img/dark/attach.svg";
import ThemeContext from "../../context/Theme";
import Modal from "../../atom/Modal/Modal";
import Avatar from "../../atom/Avatar/Avatar";
import Category from "../../atom/Category/Category";

const BriefMessage = ({ changeCurrentLetter, mess }) => {
    const { theme } = useContext(ThemeContext);
    const [showAttach, setShowAttach] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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
                        <Avatar ava={mess.author.avatar} />
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
                <Category category={mess.flag} showName={false} />

                {mess.doc !== undefined ?
                    <div
                        className="show-doc"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowAttach(prev => !prev);
                        }}>
                        <img
                            src={theme === "light" ? attach : attachD}
                            alt="документы"
                        />
                        <Modal active={showAttach} doc={mess.doc.img} />
                    </div>
                    : ""}

                <div className="date">{getFormattedDate(mess.date, false)}</div>
            </div>
        </div >
    );
}

export default BriefMessage;
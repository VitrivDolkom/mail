import "./style.css";
import { useContext } from "react";
import MessagesContext from "../../context/MessagesContext";
import Dot from "../../atom/Dot/Dot";
import { downloadFile, getFormattedDate, getFullName, getImageSize } from "../../helpers/func";
import blur from "../../img/blur.webp";
import LoadingImage from "../../atom/LoadingImage/LoadingImage";
import { Link } from "react-router-dom";
import { websiteURL } from "../../helpers/constants";
import noAva from "../../img/noAva.webp";
import ImpBook from "../../atom/ImpBook/ImpBook";


const Letter = () => {
    const { currentLetter } = useContext(MessagesContext);

    const showRecieverList = (persons) => {
        let list = "";
        if (persons.length > 0) {
            list += ` ${getFullName(persons[0])}`;
        }
        if (persons.length > 1) {
            list += ` ${getFullName(persons[1])} `;
        }
        return list;
    }

    const showOtherReciever = (persons) => {
        let list = "";
        for (let i = 3; i < persons.length; ++i) {
            list += ` ${persons[i].name} ${persons[i].surname}`;
        }

        return list;
    }

    const countOtherReciever = (persons) => {
        let quantity = persons.length - 2;
        let result = "ещё ";
        if (quantity <= 0) {
            return "";
        }

        if (quantity == 1) {
            result += "1 получатель";
        } else if (quantity > 1 && quantity < 5) {
            result += `${quantity} получателя`;
        } else {
            result += `${quantity} получателей`;
        }


        return result;
    }


    return (
        <>
            {
                currentLetter ? (<div className="letter" >
                    < div className="top" >
                        <h2>{currentLetter.title}</h2>
                    </ div>
                    <div className="info">
                        <div className="left">
                            <div className="ava">
                                <Dot isReaded={currentLetter.read} />

                                <img src={currentLetter.author.avatar !== undefined ? currentLetter.author.avatar : noAva} alt="ава" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="who">
                                <div className="person">{currentLetter.author.name} {currentLetter.author.surname}</div>
                                <div className="date">{getFormattedDate(currentLetter.date, true)}</div>
                                <ImpBook imp={currentLetter.important} book={currentLetter.bookmark} />
                            </div>
                            <div className="whom">
                                Кому: Вы,{showRecieverList(currentLetter.to)}
                                <a titl="Посмотреть всех получателей">{countOtherReciever(currentLetter.to)}</a>
                            </div>
                        </div>
                    </div>
                    {
                        currentLetter.doc ? (
                            <div className="files">
                                <div className="image">
                                    <LoadingImage
                                        src={currentLetter.doc.img}
                                        placeholderSrc={blur}
                                        alt="image"
                                    />
                                </div>
                                <div className="info">
                                    <div className="file-quant">1 файл</div>
                                    <a
                                        onClick={() => downloadFile(currentLetter.doc.img, "image.jpg")}
                                        className="download-files"
                                        title="Скачать файл">Скачать </a>
                                    <div className="files-weight">({getImageSize(currentLetter.doc.img)}Mb)</div>
                                </div>
                            </div>
                        ) : " "
                    }

                    <div className="content">
                        {currentLetter.text}
                    </div>
                </div >) : ""
            }
        </>

    );
}

export default Letter;
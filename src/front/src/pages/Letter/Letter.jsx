import "./style.css";
import { useContext, useState } from "react";
import Dot from "../../atom/Dot/Dot";
import { downloadFile, getFormattedDate, getFromLocalStorage, getFullName, getImageSize } from "../../helpers/func";
import blur from "../../img/blur.webp";
import LoadingImage from "../../atom/LoadingImage/LoadingImage";

import ImpBook from "../../atom/ImpBook/ImpBook";
import Category from "../../atom/Category/Category";
import Avatar from "../../atom/Avatar/Avatar";
import { useEffect } from "react";


const Letter = () => {
    const [letter, setLetter] = useState(JSON.parse(localStorage.getItem("letter")));

    useEffect(() => {
        const contentWrapper = document.querySelector(".wrapper");
        const content = document.querySelector(".content");
        let contentHeight = contentWrapper.clientHeight - 89;
        content.style.height = `${contentHeight}px`;

        window.addEventListener("resize", () => {
            contentHeight = contentWrapper.clientHeight - 89;
            content.style.height = `${contentHeight}px`;
        });
    }, []);


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
                letter.author !== undefined ?
                    <div className="letter" >
                        < div className="top" >
                            <h2>{letter.title}</h2>
                            <Category category={letter.flag} showName={true} />
                        </ div>
                        <div className="info">
                            <div className="left">
                                <div className="ava">
                                    <Dot isReaded={letter.read} />
                                    <Avatar ava={letter.author.avatar} />
                                </div>
                            </div>
                            <div className="right">
                                <div className="who">
                                    <div className="person">{letter.author.name} {letter.author.surname}</div>
                                    <div className="date">{getFormattedDate(letter.date, true)}</div>
                                    <ImpBook imp={letter.important} book={letter.bookmark} />
                                </div>
                                <div className="whom">
                                    Кому: Вы,{showRecieverList(letter.to)}
                                    <a title="Посмотреть всех получателей">{countOtherReciever(letter.to)}</a>
                                </div>
                            </div>
                        </div>
                        {
                            letter.doc !== undefined ?
                                <div className="files">
                                    <div className="image">
                                        <LoadingImage
                                            src={letter.doc.img}
                                            placeholderSrc={blur}
                                            alt="image"
                                        />
                                    </div>
                                    <div className="info">
                                        <div className="file-quant">1 файл</div>
                                        <a
                                            onClick={() => downloadFile(letter.doc.img, "image.jpg")}
                                            className="download-files"
                                            title="Скачать файл">Скачать </a>
                                        <div className="files-weight">({getImageSize(letter.doc.img)}Mb)</div>
                                    </div>
                                </div>
                                : " "
                        }

                        <div className="content">
                            {letter.text}
                        </div>
                    </div >
                    :
                    ""
            }
        </>

    );
}

export default Letter;
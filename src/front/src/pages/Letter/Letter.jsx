import "./style.css";
import { useState, useEffect, useContext } from "react";
import Dot from "../../atom/Dot/Dot";
import { downloadFile, getFormattedDate, getFullName, getImageSize, getImagesSize } from "../../helpers/func";
import blur from "../../img/blur.webp";
import LoadingImage from "../../atom/LoadingImage/LoadingImage";
import ImpBook from "../../atom/ImpBook/ImpBook";
import Category from "../../atom/Category/Category";
import Avatar from "../../atom/Avatar/Avatar";
import download from "../../img/download.svg";
import downloadD from "../../img/dark/download.svg";
import ThemeContext from "../../context/Theme";


const Letter = () => {
    const [letter] = useState(JSON.parse(localStorage.getItem("letter")));
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        // console.log(letter.doc);
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
                                <>
                                    <div className="files">
                                        {typeof letter.doc.img === "string" ?
                                            <div className="image">
                                                <LoadingImage
                                                    src={letter.doc.img}
                                                    placeholderSrc={blur}
                                                    alt="картинка"
                                                />
                                            </div>
                                            :
                                            letter.doc.img.map((img, index) => {
                                                if (index < 2) {


                                                    return (
                                                        <div
                                                            key={index}
                                                            className="image">
                                                            <LoadingImage
                                                                src={img}
                                                                placeholderSrc={blur}
                                                                alt="картинка"
                                                            />
                                                            <div
                                                                className="image-download"
                                                                onClick={() => downloadFile(img, index)}>
                                                                <img
                                                                    src={theme === "light" ? download : downloadD}
                                                                    alt="скачать" />
                                                                Скачать
                                                            </div>
                                                        </div>
                                                    );
                                                } else if (index === 2) {
                                                    return <span key={index}>...</span>;
                                                } else {
                                                    return "";
                                                }
                                            })
                                        }

                                    </div>
                                    <div className="info">
                                        <div className="file-quant">
                                            {typeof letter.doc.img === "string" ? "1 файл" : `${letter.doc.img.length} файлов`}
                                        </div>
                                        <a
                                            onClick={() => downloadFile(letter.doc.img, 0)}
                                            className="download-files"
                                            title="Скачать файл">Скачать все файлы </a>
                                        <div className="files-weight">({
                                            typeof letter.doc.img === "string" ?
                                                getImageSize(letter.doc.img)
                                                :
                                                getImagesSize(letter.doc.img)

                                        }
                                            Mb)</div>
                                    </div>
                                </>
                                : ""
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
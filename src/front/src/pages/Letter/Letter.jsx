import "./style.css";
import { useContext } from "react";
import MessagesContext from "../../context/MessagesContext";
import Dot from "../../atom/Dot/Dot";
import { getFormattedDate, getFullName } from "../../helpers/func";


const Letter = () => {
    const { currentLetter } = useContext(MessagesContext);

    const showRecieverList = (persons) => {
        let list = ` ${getFullName(persons[0])}, ${getFullName(persons[1])} `;

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
                        <ul>categories</ul>
                    </ div>
                    <div className="info">
                        <div className="left">
                            <div className="ava">
                                <Dot isReaded={currentLetter.read} />

                                <img src={currentLetter.to[0].avatar} alt="avatar" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="who">
                                <div className="person">{currentLetter.author.name} {currentLetter.author.surname}</div>
                                <div className="date">{getFormattedDate(currentLetter.date, true)}</div>
                            </div>
                            <div className="whom">
                                Кому: Вы,{showRecieverList(currentLetter.to)}
                                <a>{countOtherReciever(currentLetter.to)}</a>
                            </div>
                        </div>
                    </div>
                    <div className="files">
                        <ul>
                            <li><img src="" alt="" /></li>
                        </ul>
                        <div className="info">
                            <div className="file-quant"></div>
                            <a className="downloadFiles"></a>
                            <div className="files-weight"></div>
                        </div>

                    </div>
                    <div className="content">
                        {currentLetter.text}
                    </div>
                </div >) : ""}
        </>

    );
}

export default Letter;
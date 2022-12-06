import "./style.css";
import { useContext } from "react";
import MessagesContext from "../../context/MessagesContext";
import Dot from "../../atom/Dot/Dot";
import { getFormattedDate } from "../../helpers/func";


const Letter = () => {
    const { currentLetter } = useContext(MessagesContext);

    const showRecieverList = (persons) => {
        let list = "";
        let personQuantity = 0;
        persons.forEach((person) => {
            personQuantity++;
        });

        persons.forEach((person, index) => {
            list += ` ${person.name} ${person.surname}`;
            if (personQuantity > 1 && index !== personQuantity - 1) {
                list += ",";
            }
        });
        return list;
    }

    return (
        <>
            {
                currentLetter ? (<div className="letter" >
                    < div className="b1" >
                        <h2>{currentLetter.title}</h2>
                        <ul>categories</ul>
                    </ div>
                    <div className="info">

                        <div className="b2">
                            <div className="left">
                                <div className="ava">
                                    <Dot isReaded={currentLetter.read} />

                                    <img src={currentLetter.to[0].avatar} alt="avatar" />
                                </div>
                            </div>
                            <div className="right">
                                <div className="who">
                                    <div className="t1">{currentLetter.author.name} {currentLetter.author.surname}</div>
                                    <div className="date">{getFormattedDate(currentLetter.date, true)}</div>
                                </div>
                                <div className="whom">Кому: Вы,{showRecieverList(currentLetter.to)}</div>
                            </div>
                        </div>
                    </div>
                </div >) : ""}
        </>

    );
}

export default Letter;
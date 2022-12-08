import { useContext } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Important = () => {
    const { important } = useContext(MessagesContext);

    return (
        <div className="important">
            {important.length ? important.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </div>
    );
}

export default Important;
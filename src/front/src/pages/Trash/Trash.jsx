import { useContext } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Trash = () => {
    const { trash } = useContext(MessagesContext);

    return (
        <div className="trash">
            {trash.length ? trash.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </div>
    );
}

export default Trash;
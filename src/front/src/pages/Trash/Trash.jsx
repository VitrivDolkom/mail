import { useContext } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Trash = () => {
    const { trash } = useContext(MessagesContext);

    return (
        <div className="trash">
            {trash.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            })}
        </div>
    );
}

export default Trash;
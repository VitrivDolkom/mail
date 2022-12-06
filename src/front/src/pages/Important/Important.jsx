import { useContext } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Important = () => {
    const { important } = useContext(MessagesContext);

    return (
        <div className="important">
            {
                important.map(mess => {
                    return (
                        <BriefMessage
                            key={mess.title}
                            mess={mess}
                        />);

                })
            }
        </div>
    );
}

export default Important;
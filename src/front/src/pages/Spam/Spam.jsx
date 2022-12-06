import { useContext } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Spam = () => {
    const { spam } = useContext(MessagesContext);

    return (
        <div className="spam">
            {
                spam.map(mess => {
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

export default Spam;
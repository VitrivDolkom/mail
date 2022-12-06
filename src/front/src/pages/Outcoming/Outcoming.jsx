import { useContext } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Outcoming = () => {
    const { outcoming } = useContext(MessagesContext);

    return (
        <div className="outcoming">
            {
                outcoming.map(mess => {
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

export default Outcoming;
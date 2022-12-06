import { useContext } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Drafts = () => {
    const { drafts } = useContext(MessagesContext);

    return (
        <div className="drafts">
            {
                drafts.map(mess => {
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

export default Drafts;
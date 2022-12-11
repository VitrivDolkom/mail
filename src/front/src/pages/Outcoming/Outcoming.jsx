import { useContext } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Outcoming = () => {
    const { outcoming } = useContext(MessagesContext);
    // const [messagesLoaded, setMessagesLoaded] = useContext(false);

    return (
        <section className="outcoming">
            {
                outcoming.length ?
                    outcoming.map(mess => {
                        return (
                            <BriefMessage
                                key={mess.title}
                                mess={mess}
                            />);

                    }) : <Preloader />
            }
        </section>
    );
}

export default Outcoming;
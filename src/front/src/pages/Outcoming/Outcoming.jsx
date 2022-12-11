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
                    outcoming.map((mess, index) => {
                        return (
                            <BriefMessage
                                key={index}
                                mess={mess}
                            />);

                    }) : <Preloader />
            }
        </section>
    );
}

export default Outcoming;
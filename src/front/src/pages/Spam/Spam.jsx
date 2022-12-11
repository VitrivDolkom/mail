import { useContext } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Spam = () => {
    const { spam } = useContext(MessagesContext);

    return (
        <section className="spam">
            {spam.length ? spam.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </section>
    );
}

export default Spam;
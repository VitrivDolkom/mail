import { useContext } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Drafts = () => {
    const { drafts } = useContext(MessagesContext);

    return (
        <section className="drafts">
            {drafts.length ? drafts.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </section>
    );
}

export default Drafts;